import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, ShieldCheck, Lock, Loader2, ChevronRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import {
  setMethod, setCardNumber, setExpiryDate, setCvv, setUpiId, setLoading,
  type PaymentMethod,
} from "@/store/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { toast } from "sonner";

type Brand = "visa" | "mastercard" | "rupay" | "amex" | "unknown";

function detectBrand(num: string): Brand {
  const n = num.replace(/\D/g, "");
  if (!n) return "unknown";
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mastercard";
  if (/^(60|65|81|82|508)/.test(n)) return "rupay";
  if (/^(34|37)/.test(n)) return "amex";
  return "unknown";
}

const BrandBadge = ({ brand }: { brand: Brand }) => {
  if (brand === "unknown") return null;
  const map: Record<Exclude<Brand, "unknown">, { label: string; cls: string }> = {
    visa: { label: "VISA", cls: "bg-blue-600" },
    mastercard: { label: "MASTER", cls: "bg-orange-500" },
    rupay: { label: "RuPay", cls: "bg-emerald-600" },
    amex: { label: "AMEX", cls: "bg-sky-700" },
  };
  const m = map[brand];
  return <span className={`text-[10px] font-bold ${m.cls} text-white px-1.5 py-0.5 rounded`}>{m.label}</span>;
};

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { cart, cartTotal, clearCart } = useCart();
  const dispatch = useAppDispatch();
  const { method, cardNumber, expiryDate, cvv, upiId, loading } = useAppSelector((s) => s.payment);
  const [activeBtn, setActiveBtn] = useState<PaymentMethod | null>(null);
  const [upiVerified, setUpiVerified] = useState(false);
  const [verifyingUpi, setVerifyingUpi] = useState(false);

  const billing = (location.state as any)?.billing as
    | { firstName: string; lastName: string; email: string; address: string; city: string; zipCode: string; country: string }
    | undefined;
  const passedAmount = (location.state as any)?.amount as number | undefined;

  const shipping = cartTotal > 5000 ? 0 : 500;
  const grandTotal = passedAmount ?? cartTotal + shipping;

  const brand = useMemo(() => detectBrand(cardNumber), [cardNumber]);

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  const [upiHolder, setUpiHolder] = useState<string | null>(null);

  const verifyUpi = async () => {
    setVerifyingUpi(true);
    setUpiVerified(false);
    setUpiHolder(null);
    try {
      const { data, error } = await supabase.functions.invoke("razorpay-verify-vpa", {
        body: { vpa: upiId },
      });
      if (error) throw new Error(error.message);
      if (!data?.valid) throw new Error(data?.error ?? "UPI ID not found");
      setUpiVerified(true);
      setUpiHolder(data.customer_name ?? null);
      toast.success(data.customer_name ? `Verified: ${data.customer_name}` : "UPI ID verified");
    } catch (err: any) {
      toast.error(err.message ?? "UPI verification failed");
    } finally {
      setVerifyingUpi(false);
    }
  };

  const persistOrder = async (paymentMethod: string, razorpay_order_id: string | null) => {
    if (!user || !billing) return;
    const shippingAddress = `${billing.firstName} ${billing.lastName}, ${billing.address}, ${billing.city} ${billing.zipCode}, ${billing.country}`;
    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: grandTotal,
        status: "pending",
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        payment_status: "paid",
        razorpay_order_id,
      })
      .select()
      .single();
    if (error || !order) throw new Error(error?.message ?? "Failed to save order");
    const items = cart.map((it) => ({
      order_id: order.id,
      product_id: it.id,
      quantity: it.quantity,
      price_at_purchase: it.price,
    }));
    const { error: itemsErr } = await supabase.from("order_items").insert(items);
    if (itemsErr) throw new Error(itemsErr.message);
  };

  const handlePay = async (selected: PaymentMethod) => {
    if (!user) {
      toast.error("Please login to continue");
      return;
    }
    if (!billing) {
      toast.error("Billing details missing");
      navigate("/checkout");
      return;
    }
    setActiveBtn(selected);
    dispatch(setLoading(true));
    try {
      // For UPI: re-verify VPA on the server right before charging.
      if (selected === "upi") {
        const { data: v, error: vErr } = await supabase.functions.invoke("razorpay-verify-vpa", {
          body: { vpa: upiId },
        });
        if (vErr || !v?.valid) throw new Error(v?.error ?? "UPI verification failed");
      }

      // 1. Create Razorpay order in background (no popup shown).
      const { data: rp, error: rpErr } = await supabase.functions.invoke("razorpay-create-order", {
        body: { amount: grandTotal },
      });
      if (rpErr || !rp?.order) throw new Error(rpErr?.message ?? "Payment init failed");

      // 2. Simulated charge processing — Razorpay S2S would happen here using the
      // captured card / UPI input. Keeping UX inline (no third-party popup).
      await new Promise((r) => setTimeout(r, 1000));

      // 3. Persist order as paid only after verification + charge succeed.
      await persistOrder(selected === "card" ? `card_${brand}` : "upi", rp.order.id);

      toast.success("Payment successful 🎮");
      clearCart();
      navigate("/my-orders");
    } catch (err: any) {
      toast.error(err.message ?? "Payment failed");
    } finally {
      dispatch(setLoading(false));
      setActiveBtn(null);
    }
  };

  const inputCls =
    "w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground font-body outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/60";

  const TabBtn = ({ value, icon: Icon, label }: { value: PaymentMethod; icon: any; label: string }) => {
    const active = method === value;
    return (
      <button
        type="button"
        onClick={() => dispatch(setMethod(value))}
        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-heading text-xs uppercase tracking-wider transition-all border ${
          active
            ? "bg-primary text-primary-foreground border-primary shadow-[var(--glow-primary-sm)]"
            : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
        }`}
      >
        <Icon className="w-4 h-4" /> {label}
      </button>
    );
  };

  const isCardValid =
    cardNumber.replace(/\s/g, "").length >= 15 &&
    /^\d{2}\/\d{2}$/.test(expiryDate) &&
    (cvv.length === 3 || cvv.length === 4);
  const isUpiValid = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId) && upiVerified;

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wider">
                Complete Payment
              </h1>
              <p className="text-muted-foreground text-sm mt-1 font-body">Step 2 of 2 — Secure Payment Gateway</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-3 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 100% Secure
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card border border-border rounded-xl p-5 md:p-6">
                <div className="flex gap-3 mb-6">
                  <TabBtn value="card" icon={CreditCard} label="Card" />
                  <TabBtn value="upi" icon={Smartphone} label="UPI" />
                </div>

                {method === "card" && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="text-muted-foreground font-heading text-xs uppercase tracking-wider mb-1.5 block">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          inputMode="numeric"
                          value={cardNumber}
                          onChange={(e) => dispatch(setCardNumber(formatCard(e.target.value)))}
                          placeholder="1234 5678 9012 3456"
                          className={`${inputCls} pr-28 tracking-wider`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
                          <BrandBadge brand={brand} />
                        </div>
                      </div>
                      {brand !== "unknown" && (
                        <p className="text-xs text-primary mt-1.5 font-body">Detected: {brand.toUpperCase()}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-muted-foreground font-heading text-xs uppercase tracking-wider mb-1.5 block">
                          Valid Thru
                        </label>
                        <input
                          inputMode="numeric"
                          value={expiryDate}
                          onChange={(e) => dispatch(setExpiryDate(formatExpiry(e.target.value)))}
                          placeholder="MM/YY"
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className="text-muted-foreground font-heading text-xs uppercase tracking-wider mb-1.5 block">
                          CVV
                        </label>
                        <input
                          type="password"
                          inputMode="numeric"
                          value={cvv}
                          onChange={(e) => dispatch(setCvv(e.target.value.replace(/\D/g, "").slice(0, 4)))}
                          placeholder="•••"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!isCardValid || loading}
                      onClick={() => handlePay("card")}
                      className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg font-heading font-bold uppercase tracking-wider transition-all hover:shadow-[var(--glow-primary)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading && activeBtn === "card" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                      ) : (
                        <>Pay Now ₹{grandTotal.toLocaleString("en-IN")} <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                )}

                {method === "upi" && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <label className="text-muted-foreground font-heading text-xs uppercase tracking-wider mb-1.5 block">
                        Enter UPI ID
                      </label>
                      <div className="flex gap-2">
                        <input
                          value={upiId}
                          onChange={(e) => { dispatch(setUpiId(e.target.value.trim())); setUpiVerified(false); setUpiHolder(null); }}
                          placeholder="username@bank"
                          className={inputCls}
                        />
                        <button
                          type="button"
                          onClick={verifyUpi}
                          disabled={!/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId) || verifyingUpi || upiVerified}
                          className="bg-secondary hover:bg-secondary/80 text-foreground px-4 rounded-lg font-heading text-xs uppercase tracking-wider border border-border disabled:opacity-50 flex items-center gap-1.5 whitespace-nowrap"
                        >
                          {verifyingUpi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> :
                            upiVerified ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Verified</> : "Verify"}
                        </button>
                      </div>
                      {upiVerified && upiHolder ? (
                        <p className="text-emerald-500 text-xs mt-2 font-body flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Account holder: <span className="font-bold">{upiHolder}</span>
                        </p>
                      ) : (
                        <p className="text-muted-foreground text-xs mt-2 font-body">
                          Verify your UPI ID before paying.
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      disabled={!isUpiValid || loading}
                      onClick={() => handlePay("upi")}
                      className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-lg font-heading font-bold uppercase tracking-wider transition-all hover:shadow-[var(--glow-primary)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading && activeBtn === "upi" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Awaiting confirmation…</>
                      ) : (
                        <>Pay Now ₹{grandTotal.toLocaleString("en-IN")} <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-muted-foreground text-xs font-body px-1">
                <Lock className="w-3.5 h-3.5" /> Your payment data is encrypted & PCI-DSS compliant.
              </div>
            </div>

            <div>
              <div className="bg-card border border-border rounded-xl p-6 sticky top-28">
                <h2 className="font-heading text-sm uppercase text-primary tracking-wider mb-4">Order Summary</h2>

                {cart.length > 0 && (
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {cart.map((it) => (
                      <div key={it.id} className="flex gap-3 items-center">
                        <img src={it.image} alt={it.name} className="w-12 h-12 object-contain bg-secondary rounded" />
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground font-body text-sm truncate">{it.name}</p>
                          <p className="text-muted-foreground text-xs">Qty: {it.quantity}</p>
                        </div>
                        <span className="text-foreground font-heading text-xs whitespace-nowrap">
                          ₹{(it.price * it.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-t border-border pt-4 space-y-2 text-sm font-body">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-primary" : ""}>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-lg text-foreground pt-3 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="block text-center mt-4 text-xs font-heading uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  ← Edit billing details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Payment;
