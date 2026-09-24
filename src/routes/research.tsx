import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [
    { title: "Food Lookup — GopherConnect" }, { name: "description", content: "Look up any food product for nutrition, allergens, and healthier alternatives." },
    { property: "og:title", content: "Food Lookup — GopherConnect" }, { property: "og:description", content: "Look up any food product for nutrition, allergens, and healthier alternatives." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ResearchPage,
});

const nutrition = [["Energy","428 kJ"],["Protein","18.4 g"],["Fat","5.2 g"],["Sugars","3.1 g"],["Sodium","120 mg"]];
const alternatives = [["Greek Yoghurt (Plain)","Nutri-score A","No allergens"],["Oat Milk (Unsweetened)","Nutri-score A","Lactose-free"],["Wholegrain Crackers","Nutri-score B","Low sodium"]];

function ResearchPage() {
  const [product,setProduct]=useState("Barilla Wholegrain Pasta"); const [queryType,setQueryType]=useState("Full Nutrition Profile"); const [result,setResult]=useState("Barilla Wholegrain Pasta");
  function submit(event: FormEvent) { event.preventDefault(); setResult(product.trim() || "Barilla Wholegrain Pasta"); }
  function exportCsv() { const csv=["Nutrient,Value",...nutrition.map((r)=>r.join(",")),"","Alternative,Nutri-score,Notes",...alternatives.map((r)=>r.join(","))].join("\n"); const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); const a=document.createElement("a"); a.href=url; a.download="gopherconnect-food-lookup.csv"; a.click(); URL.revokeObjectURL(url); }
  return <AppShell><PageHeader eyebrow="Food Remedy" title="Food Product Lookup" description="Powered by the Food Remedy API — scan or search any product for nutrition, allergens, and personalised alternatives." />
    <form onSubmit={submit} className="grid gap-5 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:grid-cols-[1fr_280px_auto] lg:items-end"><label className="text-sm font-bold">Product or Barcode<input value={product} onChange={(e)=>setProduct(e.target.value)} placeholder="e.g. Barilla Wholegrain Pasta or 9300675..." className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label><label className="text-sm font-bold">Lookup Type<select value={queryType} onChange={(e)=>setQueryType(e.target.value)} className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option>Full Nutrition Profile</option><option>Allergen Check Only</option><option>Alternatives Only</option></select></label><Button type="submit">Look Up</Button></form>
    <section className="mt-8"><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase text-primary">Results</p><h2 className="mt-2 text-xl font-bold">{result}</h2><p className="mt-1 text-xs text-muted-foreground">{queryType} · found in 0.8 seconds</p></div><Button variant="secondary" size="sm" onClick={exportCsv}>Export CSV</Button></div>
      <div className="grid gap-4 sm:grid-cols-3"><article className="rounded-lg border border-border bg-accent p-5"><p className="text-3xl font-bold">B</p><p className="mt-2 text-sm font-semibold">Nutri-score</p></article><article className="rounded-lg border border-border bg-accent p-5"><p className="text-3xl font-bold">0</p><p className="mt-2 text-sm font-semibold">Allergens for You</p></article><article className="rounded-lg border border-border bg-accent p-5"><p className="text-3xl font-bold">Yes</p><p className="mt-2 text-sm font-semibold">Suits Your Diet</p></article></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2"><DataTable title="Nutrition summary (per serve)" headers={["Nutrient","Value"]} rows={nutrition}/><DataTable title="Personalised alternatives" headers={["Product","Nutri-score","Notes"]} rows={alternatives}/></div>
    </section>
  </AppShell>;
}

function DataTable({title,headers,rows}:{title:string;headers:string[];rows:string[][]}) { return <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"><h3 className="border-b border-border px-5 py-4 text-sm font-bold">{title}</h3><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-accent text-xs uppercase text-muted-foreground"><tr>{headers.map(h=><th key={h} className="px-5 py-3">{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i} className="border-t border-border">{row.map((cell,j)=><td key={j} className="px-5 py-4">{cell}</td>)}</tr>)}</tbody></table></div></div>; }
