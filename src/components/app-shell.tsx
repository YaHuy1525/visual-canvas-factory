import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "My Products", to: "/" as const },
  { label: "My Insights", to: "/insights" as const },
  { label: "Food Lookup", to: "/research" as const },
  { label: "Account", to: "/admin" as const },
];

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-nav-border bg-nav px-5 text-nav-foreground lg:px-7">
        <div className="flex items-center gap-4">
          <Button className="lg:hidden" variant="ghost" size="sm" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen}>
            {menuOpen ? "Close" : "Menu"}
          </Button>
          <Link to="/" className="text-lg font-bold tracking-normal">Gopher<span className="text-primary">Connect</span></Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-nav-muted sm:block">Gopher Industries</span>
          <span className="h-5 w-px bg-nav-border" />
          <span className="text-sm font-semibold">Huy</span>
        </div>
      </header>

      {menuOpen && <button aria-label="Close navigation" className="fixed inset-0 z-20 bg-overlay lg:hidden" onClick={() => setMenuOpen(false)} />}
      <aside className={cn("fixed bottom-0 left-0 top-16 z-30 w-64 border-r border-nav-border bg-nav px-4 py-6 text-nav-foreground transition-transform lg:translate-x-0", menuOpen ? "" : "-translate-x-full")}>
        <p className="mb-4 px-3 text-xs font-semibold uppercase text-nav-muted">Workspace</p>
        <nav className="space-y-1" aria-label="Main navigation">
          {navigation.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to} onClick={() => setMenuOpen(false)} className={cn("block rounded-md border-l-2 px-4 py-3 text-sm font-medium transition-colors", active ? "border-primary bg-nav-active text-nav-foreground" : "border-transparent text-nav-muted hover:bg-nav-active hover:text-nav-foreground")}>{item.label}</Link>
            );
          })}
        </nav>
        <div className="absolute bottom-6 left-7 right-7 border-t border-nav-border pt-5">
          <p className="text-xs font-semibold">GopherConnect</p>
          <p className="mt-1 text-xs text-nav-muted">Platform v1.0</p>
        </div>
      </aside>
      <main className="pt-16 lg:pl-64">
        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">{children}</div>
      </main>
    </div>
  );
}

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8 border-b border-border pb-7">
      <p className="mb-3 text-xs font-bold uppercase text-primary">{eyebrow}</p>
      <h1 className="max-w-4xl text-3xl font-bold leading-tight sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>}
    </div>
  );
}

export function StatusBadge({ children, tone = "active" }: { children: ReactNode; tone?: "active" | "pending" | "high" | "medium" | "info" }) {
  const tones = {
    active: "bg-status-active text-status-active-foreground",
    pending: "bg-status-pending text-status-pending-foreground",
    high: "bg-severity-high text-severity-high-foreground",
    medium: "bg-severity-medium text-severity-medium-foreground",
    info: "bg-status-info text-status-info-foreground",
  };
  return <span className={cn("inline-flex rounded px-2 py-1 text-[11px] font-bold uppercase", tones[tone])}>{children}</span>;
}