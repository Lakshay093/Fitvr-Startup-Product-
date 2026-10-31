import { FittingRoom } from "@/components/fitting/FittingRoom";
import { MarketingNav } from "@/components/marketing/MarketingNav";

export default function TryOnPage() {
  return (
    <main className="studio-page">
      <MarketingNav />
      <section className="fit-container">
        <FittingRoom />
      </section>
    </main>
  );
}
