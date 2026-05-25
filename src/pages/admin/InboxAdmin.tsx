import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const csvDownload = (rows: any[], filename: string) => {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map(r => keys.map(k => JSON.stringify(r[k] ?? "")).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
};

const InboxAdmin = () => {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["contact_requests"],
    queryFn: async () => (await supabase.from("contact_requests").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  const update = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await supabase.from("contact_requests").update({ status }).eq("id", id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contact_requests"] }),
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl">Inbox</h1>
        <Button variant="outline" onClick={() => csvDownload(data ?? [], "contact-requests.csv")}>Export CSV</Button>
      </div>
      <div className="border bg-card divide-y">
        {data?.map((r: any) => (
          <div key={r.id} className="p-4 space-y-2">
            <div className="flex justify-between items-start gap-4">
              <div>
                <div className="font-medium">{r.name} <span className="text-muted-foreground">· {r.email}</span> {r.phone && <span className="text-muted-foreground">· {r.phone}</span>}</div>
                <div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()} · {r.locale}</div>
              </div>
              <Select value={r.status} onValueChange={(v) => update.mutate({ id: r.id, status: v })}>
                <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm whitespace-pre-wrap">{r.message}</p>
          </div>
        ))}
        {!data?.length && <div className="p-6 text-muted-foreground text-sm">No requests yet.</div>}
      </div>
    </div>
  );
};
export default InboxAdmin;
