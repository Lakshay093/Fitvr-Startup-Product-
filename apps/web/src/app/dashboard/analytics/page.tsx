import { AnalyticsWorkbench } from "@/components/dashboard/AnalyticsWorkbench";

export default function AnalyticsPage() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="metric text-sm">ANALYTICS</p>
        <h1 className="mt-2 text-4xl font-semibold">Try-on behavior, size demand, and return impact.</h1>
      </div>
      <AnalyticsWorkbench />
    </div>
  );
}
