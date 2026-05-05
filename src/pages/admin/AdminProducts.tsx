import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().trim().min(1).max(200),
  description: z.string().max(2000).optional(),
  price: z.coerce.number().nonnegative(),
  original_price: z.coerce.number().nonnegative().optional(),
  image_url: z.string().url().or(z.literal("")).optional(),
  images: z.string().optional(),
  category_id: z.string().uuid().optional().or(z.literal("")),
  stock_quantity: z.coerce.number().int().nonnegative(),
  sku: z.string().max(100).optional(),
  in_stock: z.boolean().optional(),
  best_seller: z.boolean().optional(),
});
type FormData = z.infer<typeof schema>;

interface Product {
  id: string; name: string; price: number; original_price: number | null;
  image_url: string | null; images: string[] | null; stock_quantity: number; sku: string | null;
  category_id: string | null; in_stock: boolean | null; best_seller: boolean | null;
  description: string | null;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const load = async () => {
    const [p, c] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("categories").select("*").order("name"),
    ]);
    setProducts((p.data as Product[]) ?? []);
    setCategories(c.data ?? []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    reset({ name: "", description: "", price: 0, original_price: 0, image_url: "", images: "", category_id: "", stock_quantity: 0, sku: "", in_stock: true, best_seller: false });
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    reset({
      name: p.name,
      description: p.description ?? "",
      price: Number(p.price),
      original_price: p.original_price ? Number(p.original_price) : 0,
      image_url: p.image_url ?? "",
      images: (p.images ?? []).join("\n"),
      category_id: p.category_id ?? "",
      stock_quantity: p.stock_quantity,
      sku: p.sku ?? "",
      in_stock: p.in_stock ?? true,
      best_seller: p.best_seller ?? false,
    });
    setOpen(true);
  };

  const onSubmit = async (data: FormData) => {
    const extraImages = (data.images ?? "")
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    const payload = {
      name: data.name,
      description: data.description || null,
      price: data.price,
      original_price: data.original_price || null,
      image_url: data.image_url || null,
      images: extraImages,
      category_id: data.category_id || null,
      stock_quantity: data.stock_quantity,
      sku: data.sku || null,
      in_stock: data.in_stock ?? true,
      best_seller: data.best_seller ?? false,
    };
    const res = editing
      ? await supabase.from("products").update(payload).eq("id", editing.id)
      : await supabase.from("products").insert(payload);
    if (res.error) {
      toast.error(res.error.message);
      return;
    }
    toast.success(editing ? "Product updated" : "Product created");
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-3xl text-foreground uppercase font-bold">Products</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}><Plus size={16} /> New Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Product" : "New Product"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Name</Label>
                  <Input {...register("name")} />
                  {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div className="col-span-2">
                  <Label>Description</Label>
                  <textarea {...register("description")} className="w-full min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm" />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input type="number" step="0.01" {...register("price")} />
                </div>
                <div>
                  <Label>Original Price</Label>
                  <Input type="number" step="0.01" {...register("original_price")} />
                </div>
                <div>
                  <Label>Stock Quantity</Label>
                  <Input type="number" {...register("stock_quantity")} />
                </div>
                <div>
                  <Label>SKU</Label>
                  <Input {...register("sku")} />
                </div>
                <div className="col-span-2">
                  <Label>Main Image URL</Label>
                  <Input {...register("image_url")} placeholder="https://..." />
                </div>
                <div className="col-span-2">
                  <Label>Additional Image URLs</Label>
                  <textarea
                    {...register("images")}
                    className="w-full min-h-24 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="One URL per line (or comma-separated)"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Add multiple image URLs — one per line.</p>
                </div>
                <div className="col-span-2">
                  <Label>Category</Label>
                  <select {...register("category_id")} className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                    <option value="">None</option>
                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("in_stock")} /> In Stock
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" {...register("best_seller")} /> Best Seller
                </label>
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Saving..." : editing ? "Update" : "Create"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>₹{Number(p.price).toLocaleString()}</TableCell>
                <TableCell>{p.stock_quantity}</TableCell>
                <TableCell className="text-muted-foreground">{p.sku ?? "—"}</TableCell>
                <TableCell className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil size={14} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => remove(p.id)}><Trash2 size={14} className="text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No products yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
