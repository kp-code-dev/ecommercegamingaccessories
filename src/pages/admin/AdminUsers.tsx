import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Shield, ShieldOff } from "lucide-react";
import { toast } from "sonner";

interface Profile {
  id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  created_at: string;
}

export default function AdminUsers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [adminIds, setAdminIds] = useState<Set<string>>(new Set());

  const load = async () => {
    const [p, r] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at", { ascending: false }),
      supabase.from("user_roles").select("user_id").eq("role", "admin"),
    ]);
    setProfiles((p.data as Profile[]) ?? []);
    setAdminIds(new Set((r.data ?? []).map((x: any) => x.user_id)));
  };

  useEffect(() => { load(); }, []);

  const toggleAdmin = async (userId: string, isAdmin: boolean) => {
    if (isAdmin) {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", "admin");
      if (error) toast.error(error.message);
      else { toast.success("Admin removed"); load(); }
    } else {
      const { error } = await supabase.from("user_roles").insert({ user_id: userId, role: "admin" });
      if (error) toast.error(error.message);
      else { toast.success("Admin granted"); load(); }
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl text-foreground uppercase font-bold mb-6">Users</h1>
      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-40">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.map((p) => {
              const isAdmin = adminIds.has(p.id);
              return (
                <TableRow key={p.id}>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{[p.first_name, p.last_name].filter(Boolean).join(" ") || "—"}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${isAdmin ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {isAdmin ? "Admin" : "User"}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-xs">{new Date(p.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button size="sm" variant={isAdmin ? "outline" : "default"} onClick={() => toggleAdmin(p.id, isAdmin)}>
                      {isAdmin ? <><ShieldOff size={14} /> Revoke</> : <><Shield size={14} /> Make Admin</>}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {profiles.length === 0 && (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No users yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
