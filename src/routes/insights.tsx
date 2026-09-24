import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, StatusBadge } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [
    { title: "My Insights — GopherConnect" }, { name: "description", content: "Personalised food and health insights from your GopherConnect products." },
    { property: "og:title", content: "My Insights — GopherConnect" }, { property: "og:description", content: "Personalised food and health insights from your GopherConnect products." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: InsightsPage,
});

const insights = [
  { product: "NutriHelp", severity: "High Priority", tone: "high" as const, time: "Today · 10:42 AM", text: "Your protein intake has been below target for 3 days — here are 4 high-protein recipes matched to your allergy profile" },
  { product: "Guardian Monitor", severity: "Medium", tone: "medium" as const, time: "Today · 9:18 AM", text: "Your activity pattern changed this week — your caregiver has been notified and your medication schedule adjusted" },
  { product: "Food Remedy API", severity: "Good News", tone: "info" as const, time: "Yesterday · 4:06 PM", text: "12 products you scanned this week meet your dietary goals — see your personalised supermarket shortlist" },
  { product: "NutriHelp", severity: "Good News", tone: "info" as const, time: "Yesterday · 11:30 AM", text: "Your vitamin D levels are trending up since starting your new meal plan" },
  { product: "Guardian Monitor", severity: "High Priority", tone: "high" as const, time: "Monday · 8:05 AM", text: "Elevated fall risk detected from your recent movement patterns — a nurse check-in has been scheduled" },
];

const filters = ["All", "NutriHelp", "Food Remedy API", "Guardian Monitor"];

function InsightsPage() {
  const [filter, setFilter] = useState("All");
  const [reviewed, setReviewed] = useState<string[]>([]);
  const visible = filter === "All" ? insights : insights.filter((item) => item.product === filter);
  return <AppShell><PageHeader eyebrow="For you" title="Your Health & Nutrition Insights" description="Personalised insights from NutriHelp, Food Remedy API, and Guardian Monitor — all in one feed." />
    <div className="mb-6 flex flex-wrap gap-2" aria-label="Insight filters">{filters.map((item) => <Button key={item} variant={filter === item ? "primary" : "secondary"} size="sm" onClick={() => setFilter(item)}>{item}</Button>)}</div>
    <div className="space-y-4">{visible.map((item) => { const isReviewed=reviewed.includes(item.text); return <article key={item.text} className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><StatusBadge tone={item.tone}>{item.severity}</StatusBadge><span className="text-xs font-semibold text-primary">{item.product}</span><span className="text-xs text-muted-foreground">{item.time}</span></div><p className="mt-4 max-w-4xl text-sm font-semibold leading-6 sm:text-base">{item.text}</p></div><Button variant={isReviewed ? "ghost" : "secondary"} size="sm" onClick={() => setReviewed((current) => current.includes(item.text) ? current.filter((entry) => entry !== item.text) : [...current,item.text])}>{isReviewed ? "Read" : "Mark as Read"}</Button></div></article>})}</div>
  </AppShell>;
}
