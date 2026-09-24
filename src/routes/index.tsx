import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader, StatusBadge } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "My Products — GopherConnect" },
    { name: "description", content: "Access NutriHelp, Food Remedy API, and Guardian Monitor from one account." },
    { property: "og:title", content: "My Products — GopherConnect" },
    { property: "og:description", content: "Access NutriHelp, Food Remedy API, and Guardian Monitor from one account." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const products = [
  {
    name: "NutriHelp",
    tagline: "Personalised nutrition for elderly Australians",
    description: "Personalised recipes, meal planning, AI nutrient suggestions, barcode scanning, and allergy detection — built for elderly Australians at risk of malnutrition.",
    features: ["Personalised recipes & meal plans", "AI nutrient suggestions", "Barcode scanning", "Allergy detection"],
    status: "Active",
  },
  {
    name: "Food Remedy API",
    tagline: "Smarter food choices at the supermarket",
    description: "Scan any product barcode for nutrition summaries, Nutri-score, allergen warnings, dietary suitability, and personalised food alternatives.",
    features: ["Barcode scanning", "Nutri-score & nutrition summaries", "Allergen warnings", "Personalised alternatives"],
    status: "Active",
  },
  {
    name: "Guardian Monitor",
    tagline: "Health monitoring for aged care",
    description: "Fall prediction, behavioural pattern analysis, medication reminders, and caregiver coordination for elderly patients, nurses, and doctors.",
    features: ["Fall prediction", "Behavioural pattern analysis", "Medication reminders", "Caregiver coordination"],
    status: "Active",
  },
];

function Index() {
  return (
    <AppShell>
      <PageHeader eyebrow="Welcome" title="Good afternoon, Huy" description="All your GopherConnect products in one place. Sign in once and access everything with your unified account." />
      <section className="grid gap-4 md:grid-cols-3">
        {[["3", "Products Available", "all included in your plan"], ["1", "Unified Account", "one sign-in for everything"], ["24/7", "Support Access", "help whenever you need it"]].map(([value,label,note]) => (
          <article key={label} className="rounded-lg border border-border bg-card p-6 shadow-sm"><p className="text-4xl font-bold">{value}</p><h2 className="mt-3 text-sm font-bold">{label}</h2><p className="mt-1 text-xs text-muted-foreground">{note}</p></article>
        ))}
      </section>
      <section className="mt-10">
        <div className="mb-5 flex items-end justify-between"><div><p className="text-xs font-bold uppercase text-primary">Your products</p><h2 className="mt-2 text-xl font-bold">Open a Product</h2></div><span className="text-xs text-muted-foreground">3 available</span></div>
        <div className="grid gap-4 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="flex flex-col rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex items-start justify-between gap-3"><h3 className="text-lg font-bold">{product.name}</h3><StatusBadge tone="active">{product.status}</StatusBadge></div>
              <p className="mt-1 text-xs font-semibold text-primary">{product.tagline}</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{product.description}</p>
              <ul className="mt-4 space-y-2 text-sm">{product.features.map((feature) => <li key={feature} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{feature}</li>)}</ul>
              <div className="mt-6 pt-2"><Button className="w-full">Launch {product.name}</Button></div>
            </article>
          ))}
        </div>
      </section>
      <section className="mt-10">
        <p className="text-xs font-bold uppercase text-primary">For you</p><h2 className="mt-2 text-xl font-bold">Recent Activity</h2>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <article className="rounded-lg border border-nav-border bg-nav p-6 text-nav-foreground shadow-sm"><StatusBadge tone="info">NutriHelp</StatusBadge><h3 className="mt-6 text-lg font-bold">Your weekly meal plan is ready</h3><p className="mt-2 text-sm leading-6 text-nav-muted">New personalised recipes based on your nutrition goals and allergy profile.</p></article>
          <article className="rounded-lg border border-border bg-card p-6 shadow-sm"><StatusBadge tone="info">Guardian Monitor</StatusBadge><h3 className="mt-6 text-lg font-bold">Medication reminder set</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Your caregiver added a new evening medication schedule to your plan.</p></article>
        </div>
      </section>
    </AppShell>
  );
}
