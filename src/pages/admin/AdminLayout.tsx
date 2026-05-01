import { NavLink, Outlet, Navigate, Link } from "react-router-dom";
import { LayoutDashboard, Users, Package, ShoppingBag, Tags, ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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

  const items = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/categories", label: "Categories", icon: Tags },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur p-4 flex flex-col gap-1 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2 px-3 py-2 mb-4 text-muted-foreground hover:text-primary text-xs font-heading uppercase">
          <ArrowLeft size={14} /> Back to Site
        </Link>
        <h2 className="font-heading text-lg text-primary uppercase font-bold mb-4 px-3">Admin Panel</h2>
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md font-body text-sm font-semibold transition-colors ${
                isActive ? "bg-primary text-primary-foreground" : "text-secondary-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            <item.icon size={16} />
            {item.label}
          </NavLink>
        ))}
      </aside>
      <main className="flex-1 p-6 md:p-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}
