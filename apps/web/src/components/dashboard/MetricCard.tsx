import type { LucideIcon } from "lucide-react";

export function MetricCard({
  icon: Icon,
  label,
  value,
  helper
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="surface p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#748068]">{label}</p>
        <Icon className="size-5 text-[#648575]" aria-hidden />
      </div>
      <p className="mt-4 text-3xl font-semibold">{value}</p>
      <p className="mt-2 text-sm text-[#748068]">{helper}</p>
    </div>
  );
}
