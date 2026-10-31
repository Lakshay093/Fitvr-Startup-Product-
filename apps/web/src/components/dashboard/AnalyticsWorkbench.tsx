import { analytics, products } from "@/lib/data";

export function AnalyticsWorkbench() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="surface p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Product try-on intelligence</h2>
            <p className="mt-1 text-sm text-[#748068]">Size mismatch, confidence, and return reduction signals.</p>
          </div>
          <span className="metric text-sm">last 30 days</span>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-sm">
            <thead className="text-[#748068]">
              <tr>
                <th className="py-3 font-medium">Product</th>
                <th className="py-3 font-medium">Try-ons</th>
                <th className="py-3 font-medium">Fit Score</th>
                <th className="py-3 font-medium">Top size</th>
                <th className="py-3 font-medium">Confidence</th>
                <th className="py-3 font-medium">Mismatch</th>
                <th className="py-3 font-medium">Tight area</th>
                <th className="py-3 font-medium">Return risk</th>
                <th className="py-3 font-medium">Return impact</th>
                <th className="py-3 font-medium">Assets</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-[#dce3d3]">
                  <td className="py-4">
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-xs text-[#748068]">{product.category}</p>
                  </td>
                  <td className="metric py-4">{product.tryOns.toLocaleString()}</td>
                  <td className="py-4 text-[#697f51]">{product.fitScore}%</td>
                  <td className="py-4">{product.topRecommendedSize}</td>
                  <td className="py-4">{product.confidence}%</td>
                  <td className="py-4">{product.mismatchRate}%</td>
                  <td className="py-4">{product.commonTightArea}</td>
                  <td className="py-4 capitalize">{product.returnRisk}</td>
                  <td className="py-4 text-[#697f51]">{product.returnReduction}%</td>
                  <td className="py-4 text-[#748068]">{product.assetStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <aside className="grid gap-6">
        <Distribution title="Fit preference" data={analytics.fitPreferences} color="#b7ff3c" />
        <Distribution title="Body type demand" data={analytics.bodyDemand} color="#48f4ff" />
        <Distribution title="Common tight areas" data={analytics.tightAreas} color="#ff4d6d" />
        <Distribution title="Common loose areas" data={analytics.looseAreas} color="#ffb13b" />
        <Distribution title="Device type" data={analytics.deviceTypes} color="#d8ff8a" />
        <Distribution title="Region demand" data={analytics.regions} color="#bafaff" />
      </aside>
    </div>
  );
}

function Distribution({
  title,
  data,
  color
}: {
  title: string;
  data: { label: string; value: number }[];
  color: string;
}) {
  return (
    <div className="surface p-5">
      <h3 className="font-semibold">{title}</h3>
      <div className="mt-5 space-y-4">
        {data.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-[#657358]">{item.label}</span>
              <span className="metric">{item.value}%</span>
            </div>
            <div className="h-2 rounded-[10px] bg-white/10">
              <div className="h-2 rounded-[10px]" style={{ width: `${item.value}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
