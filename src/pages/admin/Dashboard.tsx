import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Stat = ({ label, value }: { label: string; value: number | string }) => (
  <div className="border bg-card p-6">
    <div className="text-label text-muted-foreground mb-2">{label}</div>
    <div className="font-display text-4xl">{value}</div>
  </div>
);

const AdminDashboard = () => {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [s, e, t, m, c, n, recent] = await Promise.all([
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("experiences").select("id", { count: "exact", head: true }),
        supabase.from("team_members").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("contact_requests").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("newsletter_subscribers").select("id", { count: "exact", head: true }),
        supabase.from("contact_requests").select("*").order("created_at", { ascending: false }).limit(5),
      ]);
      return {
        services: s.count ?? 0,
        experiences: e.count ?? 0,
        team: t.count ?? 0,
        testimonials: m.count ?? 0,
        newRequests: c.count ?? 0,
        subscribers: n.count ?? 0,
        recent: recent.data ?? [],
      };
    },
  });

  return (
    <div>
      <h1 className="font-display text-4xl mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        <Stat label="Services" value={data?.services ?? "—"} />
        <Stat label="Experiences" value={data?.experiences ?? "—"} />
        <Stat label="Team" value={data?.team ?? "—"} />
        <Stat label="Testimonials" value={data?.testimonials ?? "—"} />
        <Stat label="New requests" value={data?.newRequests ?? "—"} />
        <Stat label="Subscribers" value={data?.subscribers ?? "—"} />
      </div>
      <h2 className="font-display text-2xl mb-4">Recent contact requests</h2>
      <div className="border bg-card divide-y">
        {(data?.recent ?? []).map((r: any) => (
          <div key={r.id} className="p-4 flex justify-between gap-4">
            <div>
              <div className="font-medium">{r.name} <span className="text-muted-foreground">· {r.email}</span></div>
              <div className="text-sm text-muted-foreground truncate max-w-2xl">{r.message}</div>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</div>
          </div>
        ))}
        {!data?.recent?.length && <div className="p-6 text-muted-foreground text-sm">No requests yet.</div>}
      </div>
    </div>
  );
};

export default AdminDashboard;
