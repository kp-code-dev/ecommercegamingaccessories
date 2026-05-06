import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Heading from "@/components/ui/Heading";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price_at_purchase: number;
  products?: { name: string; image_url: string | null } | null;
}
interface Order {
  id: string;
  total_amount: number;
  status: string;
  shipping_address: string | null;
  created_at: string;
  order_items: OrderItem[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "text-yellow-400",
  processing: "text-blue-400",
  shipped: "text-purple-400",
  delivered: "text-green-400",
  cancelled: "text-destructive",
};

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("orders")
      .select("id,total_amount,status,shipping_address,created_at,order_items(id,product_id,quantity,price_at_purchase,products(name,image_url))")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setOrders((data as unknown as Order[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    if (!user) return;
    const ch = supabase
      .channel("my-orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  if (!user) {
    return (
      <>
        <Header />
        <main className="pt-24 pb-16 min-h-screen">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Heading title="My Orders" />
            <p className="text-muted-foreground font-body">Please log in to view your orders.</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4">
          <Heading title="My Orders" />
          {loading ? (
            <p className="text-muted-foreground text-center py-8">Loading orders...</p>
          ) : orders.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground font-body">No orders yet.</p>
              <Link to="/store" className="text-primary font-heading uppercase text-sm mt-3 inline-block">Start Shopping →</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.id} className="bg-card border border-border rounded-lg p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-border">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground">#{o.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-heading uppercase text-xs tracking-wider ${STATUS_COLORS[o.status] ?? "text-foreground"}`}>{o.status}</p>
                      <p className="font-heading font-bold text-primary text-lg">₹{Number(o.total_amount).toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {o.order_items?.map((it) => (
                      <div key={it.id} className="flex items-center gap-3 text-sm">
                        {it.products?.image_url && (
                          <img src={it.products.image_url} alt="" className="w-12 h-12 object-contain bg-secondary rounded" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-foreground truncate">{it.products?.name ?? "Product"}</p>
                          <p className="text-xs text-muted-foreground">Qty: {it.quantity} × ₹{Number(it.price_at_purchase).toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {o.shipping_address && (
                    <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border">📍 {o.shipping_address}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MyOrders;
