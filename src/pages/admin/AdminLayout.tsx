import { useState } from "react";
import { NavLink, Outlet, Navigate, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Package,
  Tags,
  BarChart3,
  Menu,
  X,
  LogOut,
  Home,
  Bell,
  Search,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function AdminLayout() {
  const { user, isAdmin, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { pathname } = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-foreground">Loading...</div>;
  }
  if (!user) return <Navigate to="/" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center bg-background">
        <h1 className="font-heading text-2xl text-foreground uppercase">Access Denied</h1>
        <p className="text-muted-foreground font-body">You don't have permission to view the admin panel.</p>
        <Link to="/" className="text-primary hover:underline font-heading uppercase text-sm">Back to Home</Link>
      </div>
    );
  }

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
    { to: "/admin/products", label: "Products", icon: Package },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/categories", label: "Categories", icon: Tags },
  ];

  const activeLabel = navItems.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)))?.label ?? "Admin";

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      {/* Topbar */}
      <header className="h-16 shrink-0 border-b border-border bg-card/60 backdrop-blur-xl flex items-center justify-between px-3 md:px-6 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-muted text-foreground"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link to="/admin" className="flex flex-col leading-tight no-underline">
            <span className="font-heading text-base md:text-lg font-extrabold text-foreground uppercase tracking-wider">
              MSD <span className="text-primary">Admin</span>
            </span>
            <span className="font-body text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-[2px]">
              Control Panel
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-md mx-4 bg-muted/40 border border-border rounded-md px-3 h-9">
          <Search size={14} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search admin..."
            className="bg-transparent outline-none text-sm text-foreground flex-1 font-body"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-card border border-border text-xs font-body">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
          </span>
          <Button variant="ghost" size="icon" className="text-foreground">
            <Bell size={18} />
          </Button>
          <Link to="/">
            <Button variant="outline" size="sm" className="border-border">
              <Home size={14} /> <span className="hidden sm:inline">Site</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => logout()} className="text-destructive hover:text-destructive">
            <LogOut size={18} />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex min-h-0">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-60" : "w-0 md:w-16"
          } shrink-0 border-r border-border bg-card/40 backdrop-blur-xl transition-all duration-300 overflow-hidden`}
        >
          <nav className="flex flex-col gap-1 p-2 pt-4">
            {navItems.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.end}
                onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md font-body text-sm font-semibold uppercase tracking-wide transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`
                }
              >
                <n.icon size={18} className="shrink-0" />
                <span className={`${sidebarOpen ? "inline" : "hidden"} truncate`}>{n.label}</span>
              </NavLink>
            ))}
          </nav>

          {sidebarOpen && (
            <div className="px-3 mt-6">
              <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <BarChart3 size={14} className="text-primary" />
                  <p className="font-heading text-xs font-bold text-foreground uppercase">Pro Tip</p>
                </div>
                <p className="text-xs text-muted-foreground font-body leading-snug">
                  Keep stock above 10 units to avoid running out of bestsellers.
                </p>
              </div>
            </div>
          )}
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 md:px-8 py-4 border-b border-border bg-background/60">
            <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">Admin / {activeLabel}</p>
            <h1 className="font-heading text-xl md:text-2xl font-bold text-foreground uppercase tracking-wider mt-0.5">
              {activeLabel}
            </h1>
          </div>
          <div className="p-4 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
