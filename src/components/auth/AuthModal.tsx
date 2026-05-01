import { useState } from "react";
import { createPortal } from "react-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

function AuthModal({ open, onClose }: AuthModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const { login, signUp } = useAuth();

  const update = (k: string, v: string) => setForm({ ...form, [k]: v });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (isSignUp) {
      if (form.password !== form.confirm) {
        toast.error("Passwords do not match");
        setBusy(false);
        return;
      }
      const { error } = await signUp({ email: form.email, password: form.password, name: form.name });
      if (error) toast.error(error);
      else setIsSignUp(false);
    } else {
      const { error } = await login({ email: form.email, password: form.password });
      if (error) toast.error(error);
    }
    setBusy(false);
  };

  if (!open) return null;

  const inputCls = "px-3 py-2.5 border border-border rounded-md bg-card text-foreground font-body outline-none focus:border-primary transition-colors";

  return createPortal(
    <div className="fixed inset-0 bg-background/70 backdrop-blur-lg flex items-center justify-center z-[9999]" onClick={onClose}>
      <div className="bg-card p-8 rounded-lg w-[400px] max-w-[90vw] border border-primary shadow-[var(--glow-primary)] animate-modal-pop" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center border-b border-border pb-3 mb-5">
          <h2 className="font-heading font-bold text-foreground uppercase text-lg">{isSignUp ? "Sign Up" : "Log In"}</h2>
          <button className="bg-transparent border-none text-muted-foreground text-3xl cursor-pointer hover:text-primary transition-colors leading-none" onClick={onClose}>&times;</button>
        </div>
        <form className="flex flex-col gap-4 animate-fade-in-up" onSubmit={handleAuth}>
          {isSignUp && (
            <input type="text" placeholder="Full Name" required className={inputCls} value={form.name} onChange={(e) => update("name", e.target.value)} />
          )}
          <input type="email" placeholder="Email Address" required className={inputCls} value={form.email} onChange={(e) => update("email", e.target.value)} />
          <div className="flex items-center border border-border rounded-md">
            <input type={showPassword ? "text" : "password"} placeholder="Password" required minLength={6} className="flex-1 px-3 py-2.5 bg-transparent text-foreground font-body border-none outline-none" value={form.password} onChange={(e) => update("password", e.target.value)} />
            <button type="button" className="px-3 bg-transparent border-none text-foreground cursor-pointer hover:scale-110 transition-transform" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
            </button>
          </div>
          {isSignUp && (
            <div className="flex items-center border border-border rounded-md">
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" required minLength={6} className="flex-1 px-3 py-2.5 bg-transparent text-foreground font-body border-none outline-none" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} />
              <button type="button" className="px-3 bg-transparent border-none text-foreground cursor-pointer hover:scale-110 transition-transform" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </button>
            </div>
          )}
          <p className="text-muted-foreground text-sm font-body">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span onClick={() => setIsSignUp(!isSignUp)} className="text-primary cursor-pointer font-bold hover:underline">{isSignUp ? "Log In" : "Sign Up"}</span>
          </p>
          <button type="submit" disabled={busy} className="py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground border-none font-heading font-bold text-sm uppercase cursor-pointer transition-all hover:shadow-[var(--glow-primary)] rounded-md disabled:opacity-50">
            {busy ? "Please wait..." : isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default AuthModal;
