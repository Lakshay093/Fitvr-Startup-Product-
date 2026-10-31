import { SizeChartEditor } from "@/components/dashboard/SizeChartEditor";

export default function SizeChartsPage() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="metric text-sm">SIZE CHART MANAGEMENT</p>
        <h1 className="mt-2 text-4xl font-semibold">Brand-specific fit rules and measurements.</h1>
      </div>
      <SizeChartEditor />
    </div>
  );
}
