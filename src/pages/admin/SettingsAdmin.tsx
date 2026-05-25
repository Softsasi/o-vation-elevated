import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const SettingsAdmin = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const { data } = useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const { data: roles } = await supabase.from("user_roles").select("*").eq("role", "admin");
      if (!roles?.length) return [];
      const ids = roles.map(r => r.user_id);
      const { data: profiles } = await supabase.from("profiles").select("*").in("id", ids);
      return roles.map(r => ({ ...r, profile: profiles?.find(p => p.id === r.user_id) }));
    },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("user_roles").delete().eq("id", id);
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admins"] }); toast({ title: "Removed" }); },
  });

  const promote = useMutation({
    mutationFn: async (email: string) => {
      const { data: profile } = await supabase.from("profiles").select("id").ilike("full_name", `%${email}%`).maybeSingle();
      if (!profile) throw new Error("User not found. Ask them to sign up first, then enter their exact name.");
      await supabase.from("user_roles").insert({ user_id: profile.id, role: "admin" });
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admins"] }); toast({ title: "Promoted" }); setNewAdminEmail(""); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  return (
    <div>
      <h1 className="font-display text-4xl mb-8">Settings</h1>
      <h2 className="font-display text-2xl mb-4">Administrators</h2>
      <div className="border bg-card divide-y mb-8">
        {data?.map((r: any) => (
          <div key={r.id} className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{r.profile?.full_name || r.user_id}</div>
              <div className="text-xs text-muted-foreground">Admin since {new Date(r.created_at).toLocaleDateString()}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { if (confirm("Remove admin?")) remove.mutate(r.id); }}>Remove</Button>
          </div>
        ))}
      </div>
      <h3 className="font-display text-xl mb-3">Promote a user</h3>
      <p className="text-sm text-muted-foreground mb-3">User must have signed up first. Type their full name and click promote.</p>
      <div className="flex gap-2 max-w-md">
        <Input placeholder="Full name (as on signup)" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} />
        <Button onClick={() => promote.mutate(newAdminEmail)} disabled={!newAdminEmail || promote.isPending}>Promote</Button>
      </div>
    </div>
  );
};
export default SettingsAdmin;
