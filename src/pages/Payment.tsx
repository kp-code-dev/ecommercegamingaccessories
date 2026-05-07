import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, Smartphone, ShieldCheck, Lock, Loader2, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import {
  setMethod, setCardNumber, setExpiryDate, setCvv, setUpiId, setLoading,
  type PaymentMethod,
} from "@/store/paymentSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { toast } from "sonner";

function Payment() {
  const navigate = useNavigate();
  const { cart, cartTotal } = useCart();
  const dispatch = useAppDispatch();
  const { method, cardNumber, expiryDate, cvv, upiId, loading } = useAppSelector((s) => s.payment);
  const [activeBtn, setActiveBtn] = useState<PaymentMethod | null>(null);

  const shipping = 0;
  const grandTotal = cartTotal + shipping || 20049;

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  /**
   * Mock Razorpay Custom Checkout (S2S) — no popup, no redirect.
   * In production: backend creates an order and returns order_id.
   */
  const handleCustomRazorpayPayment = async (selected: PaymentMethod) => {
    setActiveBtn(selected);
    dispatch(setLoading(true));
    try {
      // 1. Backend call: POST /create-order -> { order_id, key_id }
      // const { order_id, key_id } = await fetch("/api/create-order", { ... }).then(r => r.json());
      const order_id = "order_MOCK_xxxxxxxx"; // <-- replace with real backend order_id
      const key_id = "rzp_test_xxxxxxxx";     // <-- publishable Razorpay key from backend

      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) throw new Error("Razorpay SDK not loaded");

      const baseOptions: any = {
        key: key_id,
        amount: grandTotal * 100,
        currency: "INR",
        order_id, // <-- server-generated order id goes here
        name: "WORLD OF MSD",
        description: "Gaming Accessories",
      };

      // Method-specific payload for rzp.createPayment(options)
      const methodPayload =
        selected === "card"
          ? {
              method: "card",
              card: {
                number: cardNumber.replace(/\s/g, ""),
                expiry_month: expiryDate.split("/")[0],
                expiry_year: expiryDate.split("/")[1],
                cvv,
                name: "Cardholder",
              },
            }
          : {
              method: "upi",
              vpa: upiId, // user@bank
              upi: { flow: "collect" },
            };

      const options = { ...baseOptions, ...methodPayload };

      // 2. Custom Checkout — no popup. Razorpay handles S2S charge.
      const rzp = new Razorpay(baseOptions);
      // rzp.createPayment(options);
      // rzp.on("payment.success", (resp) => { ... verify on backend ... });
      // rzp.on("payment.error", (err) => { ... });

      // ---- Simulated success for skeleton ----
      await new Promise((r) => setTimeout(r, 1500));
      console.log("Mock Razorpay createPayment options:", options, rzp);
      toast.success("Payment successful 🎮");
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

  const isCardValid = cardNumber.replace(/\s/g, "").length === 16 && /^\d{2}\/\d{2}$/.test(expiryDate) && cvv.length === 3;
  const isUpiValid = /^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
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
            {/* LEFT: Payment Options */}
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
                          className={`${inputCls} pr-24 tracking-wider`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
                          <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">VISA</span>
                          <span className="text-[10px] font-bold bg-orange-500 text-white px-1.5 py-0.5 rounded">MC</span>
                        </div>
                      </div>
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
                          onChange={(e) => dispatch(setCvv(e.target.value.replace(/\D/g, "").slice(0, 3)))}
                          placeholder="•••"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!isCardValid || loading}
                      onClick={() => handleCustomRazorpayPayment("card")}
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
                      <input
                        value={upiId}
                        onChange={(e) => dispatch(setUpiId(e.target.value.trim()))}
                        placeholder="username@bank"
                        className={inputCls}
                      />
                      <p className="text-muted-foreground text-xs mt-2 font-body">
                        We'll send a payment request to your UPI app.
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={!isUpiValid || loading}
                      onClick={() => handleCustomRazorpayPayment("upi")}
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
                <Lock className="w-3.5 h-3.5" /> Your card data is encrypted & PCI-DSS compliant.
              </div>
            </div>

            {/* RIGHT: Order Summary */}
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
                    <span>₹{(cartTotal || grandTotal).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-primary">Free</span>
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
