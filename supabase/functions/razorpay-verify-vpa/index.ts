import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { vpa } = await req.json();
    if (!vpa || typeof vpa !== "string" || !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(vpa)) {
      return new Response(JSON.stringify({ valid: false, error: "Invalid UPI ID format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const keyId = Deno.env.get("RAZORPAY_KEY_ID")!;
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET")!;
    const auth = btoa(`${keyId}:${keySecret}`);

    const res = await fetch("https://api.razorpay.com/v1/payments/validate/vpa", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${auth}` },
      body: JSON.stringify({ vpa }),
    });
    const data = await res.json();

    // Razorpay returns { vpa, success: true, customer_name } when valid.
    if (res.ok && data?.success) {
      return new Response(
        JSON.stringify({ valid: true, vpa: data.vpa, customer_name: data.customer_name ?? null }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    return new Response(
      JSON.stringify({ valid: false, error: data?.error?.description ?? "UPI ID not found" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(JSON.stringify({ valid: false, error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
