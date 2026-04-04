import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { PiEmpty } from "react-icons/pi";

interface CartDropdownProps {
  onClose: () => void;
}

function CartDropdown({ onClose }: CartDropdownProps) {
  const { cart, removeFromCart, addToCart, decreaseQuantity, cartTotal } = useCart();
  const { user, openLoginModal } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleCheckout = () => {
    onClose();
    if (!user) {
      openLoginModal();
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full right-0 w-80 mt-4 bg-card/95 backdrop-blur-xl border border-border border-t-2 border-t-primary rounded-lg p-5 shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-[1001] animate-in slide-in-from-top-2 duration-300 flex flex-col gap-4"
    >
      <div className="flex justify-between items-center border-b border-border pb-3">
        <h3 className="font-heading text-base text-primary uppercase tracking-wider m-0">Your Cart</h3>
        <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-xl text-xs font-bold">
          {cart.length} Items
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground flex flex-col items-center gap-3">
          <PiEmpty className="text-3xl text-muted" />
          <p className="font-body text-sm">Your cart feels light...</p>
        </div>
      ) : (
        <>
          <div className="max-h-[300px] overflow-y-auto flex flex-col gap-3 pr-1 scrollbar-thin scrollbar-thumb-primary">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center bg-secondary/30 p-2.5 rounded-md hover:bg-secondary/50 transition-colors">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded border border-primary/30"
                />
                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-semibold text-foreground truncate">{item.name}</span>
                  <span className="text-xs text-muted-foreground">₹{item.price.toLocaleString("en-IN")}</span>
                  <div className="flex items-center gap-2 bg-background/50 w-fit px-1.5 py-0.5 rounded border border-border">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity <= 1}
                      className="bg-transparent border-none text-muted-foreground hover:text-primary transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed p-0.5"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="text-sm font-bold text-foreground min-w-[15px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-transparent border-none text-muted-foreground hover:text-primary transition-colors cursor-pointer p-0.5"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-transparent border-none text-muted hover:text-primary transition-colors cursor-pointer p-1"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 flex flex-col gap-3">
            <div className="flex justify-between items-center font-heading font-bold text-lg">
              <span>Total:</span>
              <span>₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-primary to-[hsl(14,100%,45%)] text-primary-foreground border-none py-3 rounded-md font-heading font-bold uppercase tracking-wider cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[var(--glow-primary)]"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartDropdown;
