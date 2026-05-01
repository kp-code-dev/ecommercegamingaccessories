import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User as SupaUser } from "@supabase/supabase-js";
import { toast } from "sonner";

interface AuthContextType {
  user: SupaUser | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<{ error?: string }>;
  signUp: (data: { email: string; password: string; name: string }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupaUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        setTimeout(() => checkAdmin(newSession.user.id), 0);
      } else {
        setIsAdmin(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) checkAdmin(s.user.id);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    setIsAdmin(!!data);
  };

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    setIsLoginModalOpen(false);
    toast.success("Welcome back!");
    return {};
  };

  const signUp = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: name },
      },
    });
    if (error) return { error: error.message };
    toast.success("Account created! You can now log in.");
    return {};
  };

  const logout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, loading, login, signUp, logout, isLoginModalOpen, openLoginModal: () => setIsLoginModalOpen(true), closeLoginModal: () => setIsLoginModalOpen(false) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
