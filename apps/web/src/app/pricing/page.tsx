import { CheckCircle2 } from "lucide-react";
import { MarketingNav } from "@/components/marketing/MarketingNav";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { pricingPlans } from "@/lib/data";

const usageItems = [
  "Monthly platform fee by brand stage",
  "Metered overage per 1,000 try-ons",
  "Advanced analytics add-on",
  "White-label enterprise package",
  "Custom computer-vision model services"
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3] text-[#292d26]">
      <MarketingNav />
      <section className="fit-container py-16">
        <p className="metric text-sm">SAAS PRICING</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-semibold">Virtual fitting plans for modern gym apparel brands.</h1>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <div key={plan.name} className="surface flex min-h-[520px] flex-col p-6">
              <h2 className="text-2xl font-semibold">{plan.name}</h2>
              <p className="mt-4 text-5xl font-semibold">{plan.price}</p>
              <p className="mt-4 min-h-14 text-sm leading-6 text-[#748068]">{plan.description}</p>
              <div className="mt-6 grow space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="size-4 text-[#697f51]" aria-hidden />
                    {feature}
                  </div>
                ))}
              </div>
              <ButtonLink href="/signup" variant={plan.name === "Growth" ? "primary" : "secondary"}>
                Start {plan.name}
              </ButtonLink>
            </div>
          ))}
        </div>
        <section className="surface mt-8 p-6">
          <h2 className="text-2xl font-semibold">Usage-based monetization</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#748068]">
            Fit.VR can price like a B2B SaaS infrastructure product: base
            subscription, included try-on volume, metered overages, and
            enterprise services for white-label, SLA, SSO, and custom fit models.
          </p>
          <div className="mt-6 grid gap-3 md:grid-cols-5">
            {usageItems.map((item) => (
              <div
                key={item}
                className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4 text-sm"
              >
                <CheckCircle2 className="mb-3 size-4 text-[#697f51]" aria-hidden />
                {item}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
