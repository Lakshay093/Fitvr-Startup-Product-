import {
  BarChart3,
  CreditCard,
  Database,
  KeyRound,
  PackagePlus,
  Ruler,
  Settings,
  Scan
} from "lucide-react";
import type { ReactNode } from "react";

const links = [
  { href: "/dashboard", label: "Overview", icon: BarChart3 },
  { href: "/dashboard/products/new", label: "Products", icon: PackagePlus },
  { href: "/dashboard/size-charts", label: "Size charts", icon: Ruler },
  { href: "/dashboard/analytics", label: "Analytics", icon: Database },
  { href: "/docs", label: "SDK docs", icon: KeyRound },
  { href: "/pricing", label: "Billing", icon: CreditCard },
  { href: "/admin", label: "Admin", icon: Settings }
];

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8f8f3] text-[#292d26]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-[#dce3d3] bg-[#f0f2e9] p-4 lg:block">
        <a href="/" className="wordmark px-2 py-2" aria-label="FitVR home">
          <Scan aria-hidden />fit<span>vr</span><sup>®</sup>
        </a>
        <nav className="mt-8 space-y-1">
          {links.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center gap-3 rounded-[10px] px-3 text-sm text-[#718260] transition hover:bg-[#e4ebda] hover:text-[#292d26]"
              >
                <Icon className="size-4" aria-hidden />
                {item.label}
              </a>
            );
          })}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-[#dce3d3] bg-[#f8f8f3]/95 backdrop-blur-xl">
          <div className="flex min-h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div>
              <p className="metric text-xs">FITVR / BRAND STUDIO</p>
              <p className="text-sm text-[#748068]">Apex Athletics workspace</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-[10px] border border-[#b6c9a0]/30 bg-[#d9e6c7]/10 px-3 py-2 text-xs font-semibold text-[#526b39] sm:inline-block">
                Demo workspace
              </span>
              <a
                href="/try-on"
                className="rounded-[10px] bg-[#d9e6c7] px-4 py-2 text-sm font-semibold text-black"
              >
                Launch Try-on
              </a>
            </div>
          </div>
        </header>
        <nav className="flex gap-4 overflow-x-auto border-b border-[#dce3d3] px-4 py-4 text-xs text-[#718260] lg:hidden" aria-label="Brand studio navigation">
          <a href="/" className="shrink-0">FitVR home</a>
          {links.map(item => <a key={item.href} href={item.href} className="shrink-0">{item.label}</a>)}
        </nav>
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
