import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Package, ShoppingBag, Users, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0, revenue: 0 });

  useEffect(() => {
    (async () => {
      const [p, o, u, rev] = await Promise.all([
        supabase.from("products").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("total_amount"),
      ]);
      const revenue = (rev.data ?? []).reduce((s, r: any) => s + Number(r.total_amount || 0), 0);
      setStats({
        products: p.count ?? 0,
        orders: o.count ?? 0,
        users: u.count ?? 0,
        revenue,
      });
    })();
  }, []);

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag },
    { label: "Total Users", value: stats.users, icon: Users },
    { label: "Revenue", value: `₹${stats.revenue.toLocaleString()}`, icon: DollarSign },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground uppercase font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5 bg-card border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-xs font-body uppercase tracking-wider">{c.label}</p>
                <p className="font-heading text-2xl font-bold text-foreground mt-2">{c.value}</p>
              </div>
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <c.icon size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
