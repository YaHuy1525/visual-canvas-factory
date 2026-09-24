import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Dashboard — GopherConnect" },
    { name: "description", content: "Unified product health, users, and AI insights for Gopher Industries." },
    { property: "og:title", content: "Dashboard — GopherConnect" },
    { property: "og:description", content: "Unified product health, users, and AI insights for Gopher Industries." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

function Index() {
  const stats = [["2", "Products Connected", "of 4 registered"], ["847", "Unified Users", "+32 this month"], ["14", "AI Insights Today", "3 require review"]];
  const products = [
    ["NutriHelp", "React · Node.js · PostgreSQL", "Active"],
    ["Guardian Monitor", "React Native · Python · PostgreSQL", "Active"],
    ["BirdMark", "Vue · Django · MySQL", "Pending"],
    ["Feed Formulation", "Angular · Java · Oracle", "Pending"],
  ];
  return (
    <AppShell>
      <PageHeader eyebrow="Overview" title="Good afternoon, Huy" description="Monitor connected products, unified users, and cross-product intelligence from one place." />
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map(([value,label,note]) => <article key={label} className="rounded-lg border border-border bg-card p-6 shadow-sm"><p className="text-4xl font-bold">{value}</p><h2 className="mt-3 text-sm font-bold">{label}</h2><p className="mt-1 text-xs text-muted-foreground">{note}</p></article>)}
      </section>
      <section className="mt-10"><div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase text-primary">Platform</p><h2 className="mt-2 text-xl font-bold">Connected Products</h2></div><span className="text-xs text-muted-foreground">4 registered</span></div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{products.map(([name,stack,status]) => <article key={name} className="rounded-lg border border-border bg-card p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><h3 className="font-bold">{name}</h3><StatusBadge tone={status === "Active" ? "active" : "pending"}>{status}</StatusBadge></div><p className="mt-8 text-xs leading-5 text-muted-foreground">{stack}</p></article>)}</div>
      </section>
      <section className="mt-10"><p className="text-xs font-bold uppercase text-primary">Intelligence</p><h2 className="mt-2 text-xl font-bold">Recent AI Insights</h2><div className="mt-5 grid gap-4 lg:grid-cols-2">
        <article className="rounded-lg border border-nav-border bg-nav p-6 text-nav-foreground shadow-sm"><StatusBadge tone="high">High severity</StatusBadge><h3 className="mt-6 text-lg font-bold">Compounding Risk Detected</h3><p className="mt-2 text-sm leading-6 text-nav-muted">Dietary decline and reduced mobility flagged together for 1 user. Caregiver notified.</p></article>
        <article className="rounded-lg border border-border bg-card p-6 shadow-sm"><StatusBadge tone="info">Positive signal</StatusBadge><h3 className="mt-6 text-lg font-bold">Positive correlation</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Improved diet linked to improved sleep quality across 3 users.</p></article>
      </div></section>
    </AppShell>
  );
}
