import { useState } from "react";
import { createPortal } from "react-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

function AuthModal({ open, onClose }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login } = useAuth();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email: "demo@demo.com", password: "demo" });
    onClose();
  };

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 bg-background/70 backdrop-blur-lg flex items-center justify-center z-[9999]" onClick={onClose}>
      <div className="bg-card p-8 rounded-lg w-[400px] max-w-[90vw] border border-primary shadow-[var(--glow-primary)] animate-modal-pop" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-border pb-3 mb-5">
          <h2 className="font-heading font-bold text-foreground uppercase text-lg">{isSignUp ? "Sign Up" : "Log In"}</h2>
          <button className="bg-transparent border-none text-muted-foreground text-3xl cursor-pointer hover:text-primary transition-colors leading-none" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="animate-fade-in-up">
          {isSignUp ? (
            <>
              <p className="text-muted-foreground font-body mb-4">Create your account to join the elite.</p>
              <form className="flex flex-col gap-4" onSubmit={handleAuth}>
                <input type="text" placeholder="Full Name" required className="px-3 py-2.5 border border-border rounded-md bg-card text-foreground font-body outline-none focus:border-primary transition-colors" />
                <input type="email" placeholder="Email Address" required className="px-3 py-2.5 border border-border rounded-md bg-card text-foreground font-body outline-none focus:border-primary transition-colors" />
                <div className="flex items-center border border-border rounded-md">
                  <input type={showPassword ? "text" : "password"} placeholder="Password" required className="flex-1 px-3 py-2.5 bg-transparent text-foreground font-body border-none outline-none" />
                  <button type="button" className="px-3 bg-transparent border-none text-foreground cursor-pointer hover:scale-110 transition-transform" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                  </button>
                </div>
                <div className="flex items-center border border-border rounded-md">
                  <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required className="flex-1 px-3 py-2.5 bg-transparent text-foreground font-body border-none outline-none" />
                  <button type="button" className="px-3 bg-transparent border-none text-foreground cursor-pointer hover:scale-110 transition-transform" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                  </button>
                </div>
                <p className="text-muted-foreground text-sm font-body">
                  Already have an account?{" "}
                  <span onClick={() => setIsSignUp(false)} className="text-primary cursor-pointer font-bold hover:underline">Log In</span>
                </p>
                <button type="submit" className="py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground border-none font-heading font-bold text-sm uppercase cursor-pointer transition-all hover:shadow-[var(--glow-primary)] rounded-md">
                  Sign Up
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="text-muted-foreground font-body mb-1">Welcome back, Gamer!</p>
              <p className="text-muted-foreground font-body mb-1 text-sm">Enter your credentials to access your account.</p>
              <p className="text-primary text-xs font-body mb-4">Demo credentials will be automatically simulated.</p>
              <form className="flex flex-col gap-4" onSubmit={handleAuth}>
                <input type="text" placeholder="Email/Mobile Number" required className="px-3 py-2.5 border border-border rounded-md bg-card text-foreground font-body outline-none focus:border-primary transition-colors" />
                <div className="flex items-center border border-border rounded-md">
                  <input type={showPassword ? "text" : "password"} placeholder="Password" required className="flex-1 px-3 py-2.5 bg-transparent text-foreground font-body border-none outline-none" />
                  <button type="button" className="px-3 bg-transparent border-none text-foreground cursor-pointer hover:scale-110 transition-transform" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
                  </button>
                </div>
                <p className="text-muted-foreground text-sm font-body">
                  Don't Have Account?{" "}
                  <span onClick={() => setIsSignUp(true)} className="text-primary cursor-pointer font-bold hover:underline">Sign Up</span>
                </p>
                <button type="submit" className="py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground border-none font-heading font-bold text-sm uppercase cursor-pointer transition-all hover:shadow-[var(--glow-primary)] rounded-md">
                  Log In
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default AuthModal;
