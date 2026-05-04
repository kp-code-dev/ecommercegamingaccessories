import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Mail, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [denied, setDenied] = useState(false);

  // If already logged in as admin, go to dashboard
  useEffect(() => {
    if (!loading && user && isAdmin) navigate("/admin", { replace: true });
    if (!loading && user && !isAdmin) setDenied(true);
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setDenied(false);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setSubmitting(false);
      return;
    }

    // Verify admin role
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user!.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleRow) {
      await supabase.auth.signOut();
      setDenied(true);
      toast.error("Access denied: this account is not an admin.");
      setSubmitting(false);
      return;
    }

    toast.success("Welcome, Admin");
    navigate("/admin", { replace: true });
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-foreground bg-background">Loading...</div>;
  }
  if (user && isAdmin) return <Navigate to="/admin" replace />;

  return (
    <div className="fixed inset-0 z-[100] min-h-screen w-full bg-background flex items-center justify-center p-4 overflow-auto">
      {/* Glow background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      <Link
        to="/"
        className="absolute top-4 left-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-body uppercase tracking-wider z-10"
      >
        <ArrowLeft size={16} /> Back to Site
      </Link>

      <Card className="w-full max-w-md p-6 md:p-8 bg-card/80 backdrop-blur-xl border-border relative z-10 shadow-[0_0_60px_hsl(var(--primary)/0.15)]">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mb-3 shadow-[0_0_30px_hsl(var(--primary)/0.4)]">
            <Shield className="text-primary" size={28} />
          </div>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wider">
            Admin <span className="text-primary">Portal</span>
          </h1>
          <p className="text-muted-foreground text-xs md:text-sm font-body mt-1">
            Restricted access — authorized personnel only
          </p>
        </div>

        {denied && (
          <div className="mb-4 p-3 rounded-md border border-destructive/40 bg-destructive/10 text-destructive text-xs font-body">
            Access denied. Your account does not have admin privileges.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="font-body uppercase text-xs tracking-wider">Email</Label>
            <div className="relative mt-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@worldofmsd.com"
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="password" className="font-body uppercase text-xs tracking-wider">Password</Label>
            <div className="relative mt-1">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type={showPwd ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9 pr-9"
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button type="submit" disabled={submitting} className="w-full font-heading uppercase tracking-wider">
            {submitting ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground font-body mt-6">
          Secured by role-based access control
        </p>
      </Card>
    </div>
  );
}
