import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Trash2 } from "lucide-react";

const MediaAdmin = () => {
  const { toast } = useToast();
  const [files, setFiles] = useState<any[]>([]);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data } = await supabase.storage.from("media").list("", { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    setFiles(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const upload = async (file: File) => {
    setBusy(true);
    const path = `uploads/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const { error } = await supabase.storage.from("media").upload(path, file);
    setBusy(false);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Uploaded" }); load(); }
  };

  return (
    <div>
      <h1 className="font-display text-4xl mb-8">Media</h1>
      <Input type="file" disabled={busy} onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} className="mb-6" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {files.map((f) => {
          const url = supabase.storage.from("media").getPublicUrl(f.name).data.publicUrl;
          return (
            <div key={f.name} className="border bg-card p-2 space-y-2">
              <img src={url} alt={f.name} className="w-full h-32 object-cover" />
              <div className="text-xs truncate">{f.name}</div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => { navigator.clipboard.writeText(url); toast({ title: "URL copied" }); }}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" onClick={async () => {
                  if (!confirm("Delete?")) return;
                  await supabase.storage.from("media").remove([f.name]);
                  load();
                }}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MediaAdmin;
