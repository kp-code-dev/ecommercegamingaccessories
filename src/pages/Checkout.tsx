import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ChevronRight } from "lucide-react";

function Checkout() {
  const { cart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const shipping = cartTotal > 5000 ? 0 : 500;
  const grandTotal = cartTotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/payment", { state: { billing: formData, amount: grandTotal } });
  };

  if (!user) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-heading text-xl text-foreground mb-4">Please login to checkout</h2>
            <button onClick={() => navigate("/store")} className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-heading font-bold uppercase border-none cursor-pointer">
              Back to Store
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Heading title="Your Cart is Empty" />
            <p className="text-muted-foreground font-body mb-6">Looks like you haven't added any gear yet.</p>
            <Link to="/store" className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 rounded-md font-heading font-bold uppercase no-underline inline-block hover:shadow-[var(--glow-primary)] transition-all">
              Return to Store
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const inputClass = "w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body outline-none focus:border-primary transition-colors";
  const labelClass = "text-muted-foreground font-heading text-xs uppercase tracking-wider mb-1 block";

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <Heading title="Checkout" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleContinue} className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="font-heading text-sm uppercase text-primary tracking-wider mb-4">Billing Details</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className={inputClass} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className={labelClass}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className={inputClass} />
                  </div>
                  <div className="mt-4">
                    <label className={labelClass}>Street Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className={labelClass}>City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} required className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Zip Code</label>
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required className={inputClass} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className={labelClass}>Country</label>
                    <select name="country" value={formData.country} onChange={handleInputChange} required className={inputClass}>
                      <option value="">Select Country</option>
                      <option value="IN">India</option>
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-4 rounded-md font-heading font-bold uppercase tracking-wider border-none cursor-pointer hover:shadow-[var(--glow-primary)] transition-all text-sm flex items-center justify-center gap-2"
                >
                  Continue to Payment <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div>
              <div className="bg-card border border-border rounded-lg p-6 sticky top-28">
                <h2 className="font-heading text-sm uppercase text-primary tracking-wider mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 items-center">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-contain bg-secondary rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground font-body text-sm truncate">{item.name}</p>
                        <p className="text-muted-foreground text-xs">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-foreground font-heading text-sm whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  <div className="flex justify-between font-heading font-bold text-lg text-foreground pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">₹{grandTotal.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Checkout;
