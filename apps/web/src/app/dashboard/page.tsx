import { BarChart3, PackageCheck, Ruler, TrendingDown } from "lucide-react";
import { AnalyticsWorkbench } from "@/components/dashboard/AnalyticsWorkbench";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { analytics } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="metric text-sm">BRAND DASHBOARD</p>
        <h1 className="mt-2 text-4xl font-semibold">Apex Athletics fit intelligence.</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={BarChart3} label="Virtual try-ons" value={analytics.totalTryOns.toLocaleString()} helper="Across product pages" />
        <MetricCard icon={TrendingDown} label="Return reduction" value={`${analytics.returnReduction}%`} helper="Estimated from mismatch drop" />
        <MetricCard icon={Ruler} label="Avg confidence" value={`${analytics.averageConfidence}%`} helper="Size engine average" />
        <MetricCard icon={PackageCheck} label="Conversion lift" value={`${analytics.conversionLift}%`} helper="Post-try-on sessions" />
      </div>
      <AnalyticsWorkbench />
    </div>
  );
}
