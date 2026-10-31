import {
  Activity,
  Database,
  KeyRound,
  ShieldAlert,
  type LucideIcon
} from "lucide-react";

const rows = [
  ["Apex Athletics", "Growth", "48,720", "healthy"],
  ["Iron District", "Starter", "8,144", "review"],
  ["Titan Flex", "Enterprise", "231,902", "healthy"]
];

const adminMetrics: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Live sessions", value: "1,284", icon: Activity },
  { label: "Tenant records", value: "3.8M", icon: Database },
  { label: "API keys", value: "142", icon: KeyRound },
  { label: "Security reviews", value: "2", icon: ShieldAlert }
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3] text-[#292d26]">
      <section className="fit-container py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="metric text-sm">PLATFORM ADMIN</p>
            <h1 className="mt-2 text-4xl font-semibold">Tenant operations and security posture.</h1>
          </div>
          <a href="/dashboard" className="rounded-[10px] bg-[#d9e6c7] px-4 py-2 text-sm font-semibold text-black">
            Brand console
          </a>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {adminMetrics.map(({ icon: Icon, label, value }) => {
            return (
              <div key={label} className="surface p-5">
                <Icon className="size-5 text-[#648575]" aria-hidden />
                <p className="mt-4 text-sm text-[#748068]">{label}</p>
                <p className="metric mt-2 text-3xl font-semibold">{value}</p>
              </div>
            );
          })}
        </div>
        <section className="surface mt-8 overflow-hidden">
          <div className="border-b border-[#dce3d3] p-5">
            <h2 className="text-xl font-semibold">Brands</h2>
          </div>
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#f7f9f2] text-[#748068]">
              <tr>
                <th className="px-5 py-3 font-medium">Brand</th>
                <th className="px-5 py-3 font-medium">Plan</th>
                <th className="px-5 py-3 font-medium">Try-ons</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([brand, plan, tryOns, status]) => (
                <tr key={brand} className="border-t border-[#dce3d3]">
                  <td className="px-5 py-4 font-semibold">{brand}</td>
                  <td className="px-5 py-4">{plan}</td>
                  <td className="metric px-5 py-4">{tryOns}</td>
                  <td className="px-5 py-4">{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </main>
  );
}
