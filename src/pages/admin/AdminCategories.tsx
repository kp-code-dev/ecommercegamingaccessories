import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({ name: z.string().trim().min(1).max(100) });
type FormData = z.infer<typeof schema>;

export default function AdminCategories() {
  const [items, setItems] = useState<{ id: string; name: string }[]>([]);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const load = async () => {
    const { data } = await supabase.from("categories").select("*").order("name");
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const onSubmit = async (data: FormData) => {
    const { error } = await supabase.from("categories").insert({ name: data.name });
    if (error) toast.error(error.message);
    else { toast.success("Category added"); reset(); load(); }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete category?")) return;
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground uppercase font-bold mb-6">Categories</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-6 max-w-md">
        <div className="flex-1">
          <Input placeholder="New category name" {...register("name")} />
          {errors.name && <p className="text-destructive text-xs mt-1">{errors.name.message}</p>}
        </div>
        <Button type="submit" disabled={isSubmitting}>Add</Button>
      </form>
      <div className="rounded-md border border-border bg-card max-w-md">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Name</TableHead><TableHead className="w-20">Actions</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {items.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>
                  <Button size="icon" variant="ghost" onClick={() => remove(c.id)}><Trash2 size={14} className="text-destructive" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && <TableRow><TableCell colSpan={2} className="text-center text-muted-foreground py-6">No categories</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
