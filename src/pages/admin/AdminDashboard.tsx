import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Users, ShoppingCart, Package, TrendingUp, TrendingDown, Box } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

interface Stat {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: any;
  iconBg: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, users: 0, orders: 0, products: 0 });
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [p, o, u, rev, top] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("total_amount"),
        supabase.from("products").select("id,name,price,stock_quantity").order("created_at", { ascending: false }).limit: undefined as any,
      ]);
      const revenue = (rev.data ?? []).reduce((s, r: any) => s + Number(r.total_amount || 0), 0);
      setStats({
        revenue,
        users: u.count ?? 0,
        orders: o.count ?? 0,
        products: p.count ?? 0,
      });
      const list = (top.data as any[]) ?? [];
      setTopProducts(list.slice(0, 4));
      setAllProducts(list.slice(0, 5));
    })();
  }, []);

  // Revenue mock-trend (real revenue distributed across months for visual)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
  const base = stats.revenue || 8000;
  const revenueData = months.map((m, i) => ({
    month: m,
    value: Math.round((base / 7) * (0.4 + i * 0.18 + (i % 2 ? 0.1 : 0))),
  }));

  const categoryData = [
    { cat: "GPU", v: 4000 },
    { cat: "CPU", v: 3000 },
    { cat: "RAM", v: 2000 },
    { cat: "Storage", v: 2700 },
    { cat: "Cases", v: 1800 },
  ];

  const cards: Stat[] = [
    { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}`, delta: "+20.1% from last month", trend: "up", icon: DollarSign, iconBg: "bg-primary/20 text-primary" },
    { label: "Active Users", value: `+${stats.users}`, delta: "+12.5% from last month", trend: "up", icon: Users, iconBg: "bg-rose-500/20 text-rose-400" },
    { label: "Sales (Orders)", value: stats.orders.toLocaleString(), delta: "-2.4% from last month", trend: "down", icon: ShoppingCart, iconBg: "bg-purple-500/20 text-purple-400" },
    { label: "Active Products", value: stats.products.toLocaleString(), delta: "+8.0% since yesterday", trend: "up", icon: Package, iconBg: "bg-amber-500/20 text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5 bg-card border-border">
            <div className="flex items-start justify-between mb-3">
              <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">{c.label}</p>
              <div className={`p-2 rounded-md ${c.iconBg}`}><c.icon size={18} /></div>
            </div>
            <p className="font-heading text-2xl md:text-3xl font-bold text-foreground">{c.value}</p>
            <p className={`text-xs font-body mt-2 flex items-center gap-1 ${c.trend === "up" ? "text-green-500" : "text-rose-500"}`}>
              {c.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {c.delta}
            </p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5 bg-card border-border">
          <h2 className="font-heading text-xl font-bold text-foreground uppercase">Revenue Overview</h2>
          <p className="text-muted-foreground text-xs font-body mb-4">Monthly performance analytics</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6 }} />
                <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <h2 className="font-heading text-xl font-bold text-foreground uppercase">High Demand</h2>
          <p className="text-muted-foreground text-xs font-body mb-4">Trending product sales</p>
          <div className="space-y-3">
            {topProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-muted/40">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0"><Box size={16} /></div>
                  <div className="min-w-0">
                    <p className="text-sm font-body font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">SKU sold</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-heading font-bold text-foreground">${Number(p.price).toLocaleString()}</p>
                  <p className="text-xs text-primary">{p.stock_quantity} in stock</p>
                </div>
              </div>
            ))}
            {topProducts.length === 0 && <p className="text-muted-foreground text-sm py-6 text-center">No products yet</p>}
          </div>
          <Button variant="outline" className="w-full mt-4 border-border">View All Performance</Button>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-5 bg-card border-border">
          <h2 className="font-heading text-xl font-bold text-foreground uppercase">Selling List Breakdown</h2>
          <p className="text-muted-foreground text-xs font-body mb-4">Product sales by category</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="cat" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6 }} />
                <Bar dataKey="v" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 bg-card border-border">
          <h2 className="font-heading text-xl font-bold text-foreground uppercase">More Product Selling List</h2>
          <p className="text-muted-foreground text-xs font-body mb-4">All catalog items</p>
          <div className="space-y-3">
            {allProducts.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-muted/40">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-md bg-primary/15 text-primary flex items-center justify-center shrink-0"><Box size={16} /></div>
                  <div className="min-w-0">
                    <p className="text-sm font-body font-semibold text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">Category: Peripherals</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-heading font-bold text-primary">${Number(p.price).toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">In Stock</p>
                </div>
              </div>
            ))}
            {allProducts.length === 0 && <p className="text-muted-foreground text-sm py-6 text-center">No products yet</p>}
          </div>
          <Button variant="default" className="w-full mt-4">Manage All Products</Button>
        </Card>
      </div>
    </div>
  );
}
