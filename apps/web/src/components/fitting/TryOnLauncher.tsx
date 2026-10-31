"use client";

import { Maximize2, X } from "lucide-react";
import { useState } from "react";
import { FittingWizard } from "./FittingWizard";

export function TryOnLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="inline-flex min-h-12 items-center gap-2 rounded-[10px] bg-[#d9e6c7] px-5 font-semibold text-black"
        onClick={() => setOpen(true)}
        type="button"
      >
        <Maximize2 className="size-5" aria-hidden />
        Try with Fit.VR
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#f8f8f3]/95 p-3 backdrop-blur-xl sm:p-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-3 flex justify-end">
              <button
                className="rounded-[10px] border border-[#dce3d3] bg-white/5 p-2"
                onClick={() => setOpen(false)}
                title="Close"
                type="button"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <FittingWizard />
          </div>
        </div>
      ) : null}
    </>
  );
}
