"use client";

import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { demoSizeChart } from "@/lib/fit-engine";

export function SizeChartEditor() {
  const [rows, setRows] = useState(demoSizeChart);

  return (
    <section className="surface overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dce3d3] p-5">
        <div>
          <h2 className="text-xl font-semibold">Apex upper-body chart</h2>
          <p className="mt-1 text-sm text-[#748068]">Brand-specific sizing rules power every recommendation.</p>
        </div>
        <button
          className="inline-flex min-h-10 items-center gap-2 rounded-[10px] border border-[#dce3d3] px-3 text-sm"
          onClick={() =>
            setRows((current) => [
              ...current,
              {
                ...(current.at(-1) ?? demoSizeChart[0]!),
                size: `Custom ${current.length + 1}`
              }
            ])
          }
          type="button"
        >
          <Plus className="size-4" aria-hidden />
          Add row
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1020px] text-left text-sm">
          <thead className="bg-[#f7f9f2] text-[#748068]">
            <tr>
              {[
                "Size",
                "Shoulder",
                "Chest",
                "Waist",
                "Hip",
                "Bicep max",
                "Thigh max",
                "Calf max",
                "Inseam",
                ""
              ].map((header) => (
                <th key={header} className="px-4 py-3 font-medium">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.size}-${index}`} className="border-t border-[#dce3d3]">
                <td className="px-4 py-3 font-semibold">{row.size}</td>
                <td className="px-4 py-3">{row.shoulderMin}-{row.shoulderMax}</td>
                <td className="px-4 py-3">{row.chestMin}-{row.chestMax}</td>
                <td className="px-4 py-3">{row.waistMin}-{row.waistMax}</td>
                <td className="px-4 py-3">{row.hipMin}-{row.hipMax}</td>
                <td className="px-4 py-3">{row.bicepMax}</td>
                <td className="px-4 py-3">{row.thighMax}</td>
                <td className="px-4 py-3">{row.calfMax}</td>
                <td className="px-4 py-3">{row.inseamMin}-{row.inseamMax}</td>
                <td className="px-4 py-3">
                  <button
                    className="rounded-[10px] p-2 text-[#b85b57] hover:bg-[#e4ebda]"
                    onClick={() => setRows((current) => current.filter((_, rowIndex) => rowIndex !== index))}
                    type="button"
                    title="Remove row"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end border-t border-[#dce3d3] p-5">
        <button className="inline-flex min-h-11 items-center gap-2 rounded-[10px] bg-[#d9e6c7] px-4 text-sm font-semibold text-black">
          <Save className="size-4" aria-hidden />
          Save chart
        </button>
      </div>
    </section>
  );
}
