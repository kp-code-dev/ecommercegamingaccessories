import { NavLink, Outlet, Navigate, Link } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingBag, Package, Settings, Tags } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-foreground">Loading...</div>;
  }
  if (!user) return <Navigate to="/" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="font-heading text-2xl text-foreground uppercase">Access Denied</h1>
        <p className="text-muted-foreground font-body">You don't have permission to view the admin panel.</p>
        <Link to="/" className="text-primary hover:underline font-heading uppercase text-sm">Back to Home</Link>
      </div>
    );
  }

  const tabs = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/orders", label: "Manage Orders", icon: ShoppingBag },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/products", label: "Products & Selling", icon: Package },
    { to: "/admin/categories", label: "Categories", icon: Tags },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/40 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground uppercase tracking-wider">
              Admin <span className="text-primary">Portal</span>
            </h1>
            <p className="text-muted-foreground text-xs md:text-sm font-body mt-1">Manage everything from one place</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border text-xs font-body">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> System Online
            </span>
            <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10">
              <Settings size={14} /> Settings
            </Button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-3 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md font-body text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`
              }
            >
              <t.icon size={14} /> {t.label}
            </NavLink>
          ))}
        </div>
      </div>
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
}
