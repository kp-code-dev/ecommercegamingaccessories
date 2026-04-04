import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ name: "", street: "", city: "", pin: "", phone: "" });

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
            <h2 className="font-heading text-xl text-foreground mb-4">Your cart is empty</h2>
            <button onClick={() => navigate("/store")} className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-heading font-bold uppercase border-none cursor-pointer">
              Browse Store
            </button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully! 🎮");
    clearCart();
    navigate("/my-orders");
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Heading title="Checkout" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <h3 className="font-heading text-sm uppercase text-primary tracking-wider">Shipping Address</h3>
              {(["name", "street", "city", "pin", "phone"] as const).map(field => (
                <input
                  key={field}
                  type="text"
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={address[field]}
                  onChange={e => setAddress({ ...address, [field]: e.target.value })}
                  required
                  className="w-full bg-card border border-border rounded-md px-4 py-3 text-foreground font-body outline-none focus:border-primary transition-colors"
                />
              ))}
              <button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground py-3 rounded-md font-heading font-bold uppercase tracking-wider border-none cursor-pointer hover:shadow-[var(--glow-primary)] transition-all">
                Place Order — ₹{cartTotal.toLocaleString("en-IN")}
              </button>
            </form>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-sm uppercase text-primary tracking-wider mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <span className="text-foreground font-body truncate mr-2">{item.name} × {item.quantity}</span>
                    <span className="text-muted-foreground font-heading whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-heading font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">₹{cartTotal.toLocaleString("en-IN")}</span>
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
