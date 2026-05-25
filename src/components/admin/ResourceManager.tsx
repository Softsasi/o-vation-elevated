import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

type Field = { name: string; label: string; type?: "text" | "textarea" | "number" | "image"; required?: boolean };

interface Props {
  title: string;
  table: "services" | "experiences" | "team_members" | "testimonials";
  fields: Field[];
  displayField: string;
  newDefaults?: Record<string, any>;
}

const ResourceManager = ({ title, table, fields, displayField, newDefaults = {} }: Props) => {
  const { toast } = useToast();
  const qc = useQueryClient();
  const [editing, setEditing] = useState<any | null>(null);

  const { data } = useQuery({
    queryKey: [table],
    queryFn: async () => {
      const { data, error } = await supabase.from(table).select("*").order("order_index", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const save = useMutation({
    mutationFn: async (row: any) => {
      const payload = { ...row };
      delete payload.created_at;
      delete payload.updated_at;
      if (payload.id) {
        const { error } = await supabase.from(table).update(payload).eq("id", payload.id);
        if (error) throw error;
      } else {
        delete payload.id;
        const { error } = await supabase.from(table).insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [table] });
      setEditing(null);
      toast({ title: "Saved" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: [table] }); toast({ title: "Deleted" }); },
  });

  const uploadImage = async (file: File): Promise<string> => {
    const path = `${table}/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    if (error) throw error;
    return supabase.storage.from("media").getPublicUrl(path).data.publicUrl;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl">{title}</h1>
        <Button onClick={() => setEditing({ published: true, order_index: (data?.length ?? 0) + 1, translations: {}, ...newDefaults })}>
          <Plus className="h-4 w-4 mr-2" /> New
        </Button>
      </div>

      <div className="border bg-card divide-y">
        {data?.map((row: any) => (
          <div key={row.id} className="p-4 flex justify-between items-center gap-4">
            <div className="flex items-center gap-4 min-w-0">
              {row.image_url || row.photo_url ? (
                <img src={row.image_url || row.photo_url} alt="" className="w-12 h-12 object-cover rounded" />
              ) : null}
              <div className="min-w-0">
                <div className="font-medium truncate">{row[displayField]}</div>
                <div className="text-xs text-muted-foreground">
                  #{row.order_index} {row.published === false && "· hidden"}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="ghost" onClick={() => setEditing(row)}><Pencil className="h-4 w-4" /></Button>
              <Button size="icon" variant="ghost" onClick={() => { if (confirm("Delete?")) del.mutate(row.id); }}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
        {!data?.length && <div className="p-6 text-muted-foreground text-sm">Nothing yet.</div>}
      </div>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit" : "New"} {title}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.name}>
                  <label className="text-label text-muted-foreground mb-1 block">{f.label}</label>
                  {f.type === "textarea" ? (
                    <Textarea value={editing[f.name] ?? ""} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} rows={4} />
                  ) : f.type === "image" ? (
                    <div className="space-y-2">
                      {editing[f.name] && <img src={editing[f.name]} alt="" className="w-32 h-32 object-cover rounded" />}
                      <Input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const url = await uploadImage(file);
                          setEditing({ ...editing, [f.name]: url });
                        } catch (err: any) {
                          toast({ title: "Upload failed", description: err.message, variant: "destructive" });
                        }
                      }} />
                      <Input placeholder="Or paste URL" value={editing[f.name] ?? ""} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} />
                    </div>
                  ) : f.type === "number" ? (
                    <Input type="number" value={editing[f.name] ?? 0} onChange={(e) => setEditing({ ...editing, [f.name]: Number(e.target.value) })} />
                  ) : (
                    <Input value={editing[f.name] ?? ""} onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })} />
                  )}
                </div>
              ))}

              <div className="flex items-center gap-3">
                <Switch checked={editing.published !== false} onCheckedChange={(v) => setEditing({ ...editing, published: v })} />
                <span className="text-sm">Published</span>
              </div>

              <details className="border rounded p-3">
                <summary className="cursor-pointer text-label text-muted-foreground">Translations (FR / BN)</summary>
                <div className="mt-3 space-y-3">
                  {(["fr", "bn"] as const).map((lng) => (
                    <div key={lng} className="border-l-2 pl-3 space-y-2">
                      <div className="text-xs uppercase text-muted-foreground">{lng}</div>
                      {fields.filter(f => f.type !== "image" && f.type !== "number").map((f) => (
                        <Input
                          key={f.name}
                          placeholder={f.label}
                          value={(editing.translations?.[lng]?.[f.name]) ?? ""}
                          onChange={(e) => setEditing({
                            ...editing,
                            translations: {
                              ...editing.translations,
                              [lng]: { ...(editing.translations?.[lng] ?? {}), [f.name]: e.target.value },
                            },
                          })}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </details>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={() => save.mutate(editing)} disabled={save.isPending}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResourceManager;
