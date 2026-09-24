import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { AppShell, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [
    { title: "Research Gateway — GopherConnect" }, { name: "description", content: "Query BirdMark and Feed Formulation research data together." },
    { property: "og:title", content: "Research Gateway — GopherConnect" }, { property: "og:description", content: "Query BirdMark and Feed Formulation research data together." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: ResearchPage,
});

const sightings = [["Roebuck Bay, WA","1,284","Spring"],["Hunter Estuary, NSW","943","Summer"],["Moreton Bay, QLD","620","Autumn"]];
const nutrition = [["Protein","18.4 g"],["Fat","5.2 g"],["Energy","428 kJ"]];

function ResearchPage() {
  const [species,setSpecies]=useState("Bar-tailed Godwit"); const [queryType,setQueryType]=useState("Sightings + Nutrition"); const [result,setResult]=useState("Bar-tailed Godwit");
  function submit(event: FormEvent) { event.preventDefault(); setResult(species.trim() || "Bar-tailed Godwit"); }
  function exportCsv() { const csv=["Location,Sightings,Season",...sightings.map((r)=>r.join(",")),"","Nutrient,Value",...nutrition.map((r)=>r.join(","))].join("\n"); const url=URL.createObjectURL(new Blob([csv],{type:"text/csv"})); const a=document.createElement("a"); a.href=url; a.download="gopherconnect-research.csv"; a.click(); URL.revokeObjectURL(url); }
  return <AppShell><PageHeader eyebrow="Research" title="Research Data Gateway" description="Query BirdMark and Feed Formulation datasets in a single API call" />
    <form onSubmit={submit} className="grid gap-5 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-6 lg:grid-cols-[1fr_280px_auto] lg:items-end"><label className="text-sm font-bold">Species Name<input value={species} onChange={(e)=>setSpecies(e.target.value)} placeholder="e.g. Bar-tailed Godwit" className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label><label className="text-sm font-bold">Query Type<select value={queryType} onChange={(e)=>setQueryType(e.target.value)} className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"><option>Sightings + Nutrition</option><option>Sightings Only</option><option>Nutrition Only</option></select></label><Button type="submit">Run Query</Button></form>
    <section className="mt-8"><div className="mb-5 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase text-primary">Query results</p><h2 className="mt-2 text-xl font-bold">{result}</h2><p className="mt-1 text-xs text-muted-foreground">{queryType} · completed in 2.1 seconds</p></div><Button variant="secondary" size="sm" onClick={exportCsv}>Export CSV</Button></div>
      <div className="grid gap-4 sm:grid-cols-2"><article className="rounded-lg border border-border bg-accent p-5"><p className="text-3xl font-bold">2,847</p><p className="mt-2 text-sm font-semibold">BirdMark Sightings</p></article><article className="rounded-lg border border-border bg-accent p-5"><p className="text-3xl font-bold">18</p><p className="mt-2 text-sm font-semibold">Migration Routes</p></article></div>
      <div className="mt-6 grid gap-6 xl:grid-cols-2"><DataTable title="Sightings by location" headers={["Location","Sightings","Season"]} rows={sightings}/><DataTable title="Feed Formulation profile" headers={["Nutrient","Value"]} rows={nutrition}/></div>
    </section>
  </AppShell>;
}

function DataTable({title,headers,rows}:{title:string;headers:string[];rows:string[][]}) { return <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"><h3 className="border-b border-border px-5 py-4 text-sm font-bold">{title}</h3><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-accent text-xs uppercase text-muted-foreground"><tr>{headers.map(h=><th key={h} className="px-5 py-3">{h}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i} className="border-t border-border">{row.map((cell,j)=><td key={j} className="px-5 py-4">{cell}</td>)}</tr>)}</tbody></table></div></div>; }