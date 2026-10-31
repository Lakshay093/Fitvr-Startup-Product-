import {
  ArrowRight,
  Building2,
  Mail,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import { MarketingNav } from "@/components/marketing/MarketingNav";

const signupSignals: { label: string; icon: LucideIcon }[] = [
  { label: "Multi-tenant brand workspace", icon: Building2 },
  { label: "Privacy-first camera consent", icon: ShieldCheck },
  { label: "Demo workspace delivered after onboarding", icon: Mail }
];

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3] text-[#292d26]">
      <MarketingNav />
      <section className="fit-container grid gap-10 py-16 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="metric text-sm">BRAND SIGNUP</p>
          <h1 className="mt-3 text-5xl font-semibold">Bring body-aware try-on to your product pages.</h1>
          <p className="mt-4 leading-7 text-[#748068]">
            Fit.VR is built for gym apparel teams that need fewer returns,
            better size confidence, and analytics that reveal how athletic
            customers actually fit their clothing.
          </p>
          <div className="mt-8 grid gap-4">
            {signupSignals.map(({ icon: Icon, label }) => {
              return (
                <div key={label} className="surface flex items-center gap-3 p-4">
                  <Icon className="size-5 text-[#697f51]" aria-hidden />
                  {label}
                </div>
              );
            })}
          </div>
        </div>
        <form className="surface grid gap-4 p-6">
          <label className="grid gap-2 text-sm">
            Brand name
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" placeholder="Apex Athletics" />
          </label>
          <label className="grid gap-2 text-sm">
            Work email
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" placeholder="founder@brand.com" type="email" />
          </label>
          <label className="grid gap-2 text-sm">
            Monthly order volume
            <select className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]">
              <option>Under 1,000</option>
              <option>1,000 - 10,000</option>
              <option>10,000 - 100,000</option>
              <option>100,000+</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Platform
            <select className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]">
              <option>Shopify</option>
              <option>WooCommerce</option>
              <option>Custom React storefront</option>
              <option>Other</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Fit category focus
            <textarea className="min-h-32 rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" placeholder="Compression shirts, oversized tees, joggers..." />
          </label>
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#d9e6c7] px-5 font-semibold text-black">
            Book a Demo <ArrowRight className="size-5" aria-hidden />
          </button>
        </form>
      </section>
    </main>
  );
}
