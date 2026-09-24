import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, StatusBadge } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Administration — GopherConnect" }, { name: "description", content: "Manage connected products, API keys, and GopherConnect audit activity." },
    { property: "og:title", content: "Administration — GopherConnect" }, { property: "og:description", content: "Manage connected products, API keys, and GopherConnect audit activity." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AdminPage,
});

const products=[["NutriHelp","React / Node.js","Active","528"],["Guardian Monitor","React Native / Python","Active","319"],["BirdMark","Vue / Django","Pending","—"],["Feed Formulation","Angular / Java","Pending","—"]];
const keys=[["Research Production","12 Mar 2026","1,284","Active"],["Guardian Sync","04 Mar 2026","8,421","Active"],["BirdMark Staging","18 Feb 2026","0","Paused"]];
const events=[["Today · 11:03","Identity sync completed","Information"],["Today · 10:42","High-risk insight dispatched","High"],["Today · 09:36","API key rotated","Information"],["Yesterday · 16:18","BirdMark connection requested","Medium"]];

function AdminPage() {
 const [managed,setManaged]=useState<string | null>(null);
 return <AppShell><PageHeader eyebrow="Settings" title="Platform Administration" description="Manage integrations, credentials, and activity across the GopherConnect platform." />
  <AdminSection title="Connected Products"><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><TableHead labels={["Product Name","Tech Stack","Status","Users","Action"]}/><tbody>{products.map(r=><tr key={r[0]} className="border-t border-border"><td className="px-5 py-4 font-bold">{r[0]}</td><td className="px-5 py-4 text-muted-foreground">{r[1]}</td><td className="px-5 py-4"><StatusBadge tone={r[2]==="Active"?"active":"pending"}>{r[2]}</StatusBadge></td><td className="px-5 py-4">{r[3]}</td><td className="px-5 py-4"><Button size="sm" variant="secondary" onClick={()=>setManaged(r[0])}>{managed===r[0]?"Selected":"Manage"}</Button></td></tr>)}</tbody></table></div></AdminSection>
  <div className="mt-6 grid gap-6 xl:grid-cols-2"><AdminSection title="API Key Management"><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><TableHead labels={["Key Name","Created","Requests Today","Status"]}/><tbody>{keys.map(r=><tr key={r[0]} className="border-t border-border"><td className="px-5 py-4 font-semibold">{r[0]}</td><td className="px-5 py-4 text-muted-foreground">{r[1]}</td><td className="px-5 py-4">{r[2]}</td><td className="px-5 py-4"><StatusBadge tone={r[3]==="Active"?"active":"pending"}>{r[3]}</StatusBadge></td></tr>)}</tbody></table></div></AdminSection>
  <AdminSection title="Recent Audit Events"><div>{events.map(r=><div key={r[1]} className="flex items-center justify-between gap-4 border-t border-border px-5 py-4 first:border-t-0"><div><p className="text-sm font-semibold">{r[1]}</p><p className="mt-1 text-xs text-muted-foreground">{r[0]}</p></div><StatusBadge tone={r[2]==="High"?"high":r[2]==="Medium"?"medium":"info"}>{r[2]}</StatusBadge></div>)}</div></AdminSection></div>
 </AppShell>;
}
function AdminSection({title,children}:{title:string;children:React.ReactNode}) { return <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"><h2 className="border-b border-border px-5 py-4 text-base font-bold">{title}</h2>{children}</section>; }
function TableHead({labels}:{labels:string[]}) { return <thead className="bg-accent text-xs uppercase text-muted-foreground"><tr>{labels.map(label=><th key={label} className="px-5 py-3">{label}</th>)}</tr></thead>; }