import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const csvDownload = (rows: any[], filename: string) => {
  if (!rows.length) return;
  const keys = Object.keys(rows[0]);
  const csv = [keys.join(","), ...rows.map(r => keys.map(k => JSON.stringify(r[k] ?? "")).join(","))].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
};

const NewsletterAdmin = () => {
  const { data } = useQuery({
    queryKey: ["newsletter_subscribers"],
    queryFn: async () => (await supabase.from("newsletter_subscribers").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-4xl">Newsletter</h1>
        <Button variant="outline" onClick={() => csvDownload(data ?? [], "subscribers.csv")}>Export CSV</Button>
      </div>
      <div className="border bg-card divide-y">
        {data?.map((r: any) => (
          <div key={r.id} className="p-4 flex justify-between">
            <div>
              <div className="font-medium">{r.email}</div>
              <div className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()} · {r.locale}</div>
            </div>
          </div>
        ))}
        {!data?.length && <div className="p-6 text-muted-foreground text-sm">No subscribers yet.</div>}
      </div>
    </div>
  );
};
export default NewsletterAdmin;
