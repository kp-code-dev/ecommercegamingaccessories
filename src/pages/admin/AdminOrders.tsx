import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  shipping_address: string | null;
  created_at: string;
  payment_method: string | null;
  payment_status: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
}

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const load = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders((data as Order[]) ?? []);
  };

  useEffect(() => {
    load();
    const ch = supabase
      .channel("admin-orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Status updated"); load(); }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground uppercase font-bold mb-6">Orders</h1>
      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>RZP Order</TableHead>
              <TableHead>RZP Payment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => {
              const ps = (o.payment_status ?? "pending").toLowerCase();
              const pColor = ps === "paid" ? "text-green-500" : ps === "failed" ? "text-red-500" : "text-yellow-500";
              return (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id.slice(0, 8)}</TableCell>
                  <TableCell className="font-mono text-xs">{o.user_id.slice(0, 8)}</TableCell>
                  <TableCell>₹{Number(o.total_amount).toLocaleString()}</TableCell>
                  <TableCell className="text-xs uppercase">{o.payment_method ?? "—"}</TableCell>
                  <TableCell className={`text-xs uppercase font-bold ${pColor}`}>{ps}</TableCell>
                  <TableCell className="font-mono text-xs">{o.razorpay_order_id ?? "—"}</TableCell>
                  <TableCell className="font-mono text-xs">{o.razorpay_payment_id ?? "—"}</TableCell>
                  <TableCell>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                    >
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{new Date(o.created_at).toLocaleDateString()}</TableCell>
                </TableRow>
              );
            })}
            {orders.length === 0 && (
              <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">No orders yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
