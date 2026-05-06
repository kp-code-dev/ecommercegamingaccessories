import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/components/product/ProductCard";

interface DBProduct {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  images: string[] | null;
  rating: number | null;
  in_stock: boolean | null;
  best_seller: boolean | null;
  category_id: string | null;
  stock_quantity: number;
  description: string | null;
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop";

const mapProduct = (p: DBProduct, categoryMap: Record<string, string>): Product => ({
  id: p.id,
  name: p.name,
  price: Number(p.price),
  originalPrice: p.original_price ? Number(p.original_price) : undefined,
  image: p.image_url || FALLBACK_IMG,
  images: p.images ?? [],
  rating: p.rating ?? 0,
  reviews: 0,
  inStock: (p.in_stock ?? true) && p.stock_quantity > 0,
  bestSeller: p.best_seller ?? false,
  category: p.category_id ? categoryMap[p.category_id] ?? "Other" : "Other",
});

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [pRes, cRes] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("id,name"),
    ]);
    const cMap: Record<string, string> = {};
    (cRes.data ?? []).forEach((c: { id: string; name: string }) => { cMap[c.id] = c.name; });
    setProducts(((pRes.data as DBProduct[]) ?? []).map((p) => mapProduct(p, cMap)));
    setLoading(false);
  };

  useEffect(() => {
    load();
    const channel = supabase
      .channel("products-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => load())
      .on("postgres_changes", { event: "*", schema: "public", table: "categories" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return { products, loading, reload: load };
}
