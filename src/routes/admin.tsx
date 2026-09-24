import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader, StatusBadge } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [
    { title: "Account & Settings — GopherConnect" }, { name: "description", content: "Manage your GopherConnect account, subscriptions, and connected caregivers." },
    { property: "og:title", content: "Account & Settings — GopherConnect" }, { property: "og:description", content: "Manage your GopherConnect account, subscriptions, and connected caregivers." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: AdminPage,
});

const subscriptions=[["NutriHelp","Personal Plan","Active","Included"],["Food Remedy API","Consumer Access","Active","Included"],["Guardian Monitor","Family Plan","Active","Included"]];
const caregivers=[["Dr. Sarah Chen","GP · Lindfield Medical","Full access","Active"],["Maria Lopez","Registered Nurse","Monitoring only","Active"],["David Nguyen","Family Member","Alerts only","Pending"]];
const activity=[["Today · 11:03","Signed in from Sydney, NSW","Information"],["Today · 10:42","Guardian Monitor alert acknowledged","High"],["Today · 09:36","Password updated","Information"],["Yesterday · 16:18","New caregiver invitation sent","Medium"]];

function AdminPage() {
 const [managed,setManaged]=useState<string | null>(null);
 return <AppShell><PageHeader eyebrow="Settings" title="Account & Settings" description="Manage your subscriptions, connected caregivers, and account activity." />
  <AdminSection title="Your Subscriptions"><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><TableHead labels={["Product","Plan","Status","Billing","Action"]}/><tbody>{subscriptions.map(r=>{ const productName=r[0] ?? "Product"; return <tr key={productName} className="border-t border-border"><td className="px-5 py-4 font-bold">{productName}</td><td className="px-5 py-4 text-muted-foreground">{r[1]}</td><td className="px-5 py-4"><StatusBadge tone="active">{r[2]}</StatusBadge></td><td className="px-5 py-4">{r[3]}</td><td className="px-5 py-4"><Button size="sm" variant="secondary" onClick={()=>setManaged(productName)}>{managed===productName?"Selected":"Manage"}</Button></td></tr>})}</tbody></table></div></AdminSection>
  <div className="mt-6 grid gap-6 xl:grid-cols-2"><AdminSection title="Connected Caregivers"><div className="overflow-x-auto"><table className="w-full min-w-[600px] text-left text-sm"><TableHead labels={["Name","Role","Access","Status"]}/><tbody>{caregivers.map(r=><tr key={r[0]} className="border-t border-border"><td className="px-5 py-4 font-semibold">{r[0]}</td><td className="px-5 py-4 text-muted-foreground">{r[1]}</td><td className="px-5 py-4">{r[2]}</td><td className="px-5 py-4"><StatusBadge tone={r[3]==="Active"?"active":"pending"}>{r[3]}</StatusBadge></td></tr>)}</tbody></table></div></AdminSection>
  <AdminSection title="Recent Account Activity"><div>{activity.map(r=><div key={r[1]} className="flex items-center justify-between gap-4 border-t border-border px-5 py-4 first:border-t-0"><div><p className="text-sm font-semibold">{r[1]}</p><p className="mt-1 text-xs text-muted-foreground">{r[0]}</p></div><StatusBadge tone={r[2]==="High"?"high":r[2]==="Medium"?"medium":"info"}>{r[2]}</StatusBadge></div>)}</div></AdminSection></div>
 </AppShell>;
}
function AdminSection({title,children}:{title:string;children:React.ReactNode}) { return <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"><h2 className="border-b border-border px-5 py-4 text-base font-bold">{title}</h2>{children}</section>; }
function TableHead({labels}:{labels:string[]}) { return <thead className="bg-accent text-xs uppercase text-muted-foreground"><tr>{labels.map(label=><th key={label} className="px-5 py-3">{label}</th>)}</tr></thead>; }
