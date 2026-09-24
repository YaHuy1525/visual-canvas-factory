import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, StatusBadge } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/insights")({
  head: () => ({ meta: [
    { title: "AI Insights — GopherConnect" }, { name: "description", content: "Cross-product health insights from NutriHelp and Guardian Monitor." },
    { property: "og:title", content: "AI Insights — GopherConnect" }, { property: "og:description", content: "Cross-product health insights from NutriHelp and Guardian Monitor." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: InsightsPage,
});

const insights = [
  { severity: "High Severity", tone: "high" as const, time: "Today · 10:42 AM", text: "3 dietary risk events and 1 mobility flag in 72 hours — compounding cardiovascular risk" },
  { severity: "Medium", tone: "medium" as const, time: "Today · 9:18 AM", text: "Dietary improvement correlates with improved sleep quality score — positive compounding effect" },
  { severity: "Information", tone: "info" as const, time: "Yesterday · 4:06 PM", text: "Cross-product health baseline established for 12 new users this week" },
];

function InsightsPage() {
  const [filter, setFilter] = useState("All");
  const [reviewed, setReviewed] = useState<string[]>([]);
  const visible = filter === "All" ? insights : insights.filter((item) => item.severity === filter);
  return <AppShell><PageHeader eyebrow="Intelligence" title="Cross-Product AI Insight Feed" description="Patterns detected across NutriHelp and Guardian Monitor" />
    <div className="mb-6 flex flex-wrap gap-2" aria-label="Insight filters">{["All","High Severity","Medium","Information"].map((item) => <Button key={item} variant={filter === item ? "primary" : "secondary"} size="sm" onClick={() => setFilter(item)}>{item}</Button>)}</div>
    <div className="space-y-4">{visible.map((item) => { const isReviewed=reviewed.includes(item.text); return <article key={item.text} className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="min-w-0"><div className="flex flex-wrap items-center gap-3"><StatusBadge tone={item.tone}>{item.severity}</StatusBadge><span className="text-xs text-muted-foreground">{item.time}</span></div><p className="mt-4 max-w-4xl text-sm font-semibold leading-6 sm:text-base">{item.text}</p></div><Button variant={isReviewed ? "ghost" : "secondary"} size="sm" onClick={() => setReviewed((current) => current.includes(item.text) ? current.filter((entry) => entry !== item.text) : [...current,item.text])}>{isReviewed ? "Reviewed" : "Review"}</Button></div></article>})}</div>
  </AppShell>;
}