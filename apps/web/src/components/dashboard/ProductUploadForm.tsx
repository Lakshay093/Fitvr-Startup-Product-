"use client";

import {
  Box,
  Dumbbell,
  ImagePlus,
  Ruler,
  Save,
  Shirt,
  SlidersHorizontal,
  Upload
} from "lucide-react";
import { useState } from "react";

const categories = [
  "Compression shirt",
  "Oversized t-shirt",
  "Stringer",
  "Tank top",
  "Hoodie",
  "Joggers",
  "Shorts",
  "Leggings",
  "Compression pants"
];

const setupChecklist = [
  "Chest and shoulder priority zones",
  "Bicep sleeve tightness enabled",
  "Compression pressure scoring",
  "Squat comfort for lower wear",
  "Return-risk analytics enabled",
  "Model reference data linked"
];

export function ProductUploadForm() {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    window.setTimeout(() => setStatus("saved"), 900);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <section className="surface p-5">
        <div className="flex items-center gap-3">
          <Shirt className="size-5 text-[#697f51]" aria-hidden />
          <h2 className="text-xl font-semibold">Product profile</h2>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            Product name
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="Apex Compression Tee" />
          </label>
          <label className="grid gap-2 text-sm">
            SKU
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="APX-COMP-001" />
          </label>
          <label className="grid gap-2 text-sm">
            Category
            <select className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="Compression shirt">
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Intended fit
            <select className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="compression">
              <option value="compression">Compression</option>
              <option value="slim">Slim</option>
              <option value="regular">Regular</option>
              <option value="oversized">Oversized</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Fabric type
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="Nylon spandex blend" />
          </label>
          <label className="grid gap-2 text-sm">
            Fabric stretch
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="8" />
          </label>
          <label className="grid gap-2 text-sm">
            Compression level
            <select className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="4">
              <option value="0">None</option>
              <option value="1">Very light</option>
              <option value="2">Light</option>
              <option value="3">Medium</option>
              <option value="4">High</option>
              <option value="5">Maximum</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Fit rule preset
            <select className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="muscle-fit">
              <option value="muscle-fit">Muscle-fit upper body</option>
              <option value="pump-cover">Oversized pump cover</option>
              <option value="squat-test">Squat movement lower body</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Product length
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="72 cm" />
          </label>
          <label className="grid gap-2 text-sm">
            Sleeve length
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="22 cm" />
          </label>
          <label className="grid gap-2 text-sm">
            Waist fit
            <select className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="regular">
              <option value="compression">Compression</option>
              <option value="slim">Slim</option>
              <option value="regular">Regular</option>
              <option value="relaxed">Relaxed</option>
              <option value="oversized">Oversized</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Thigh fit
            <select className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="relaxed">
              <option value="compression">Compression</option>
              <option value="slim">Slim</option>
              <option value="regular">Regular</option>
              <option value="relaxed">Relaxed</option>
              <option value="oversized">Oversized</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            Model reference size
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="L" />
          </label>
          <label className="grid gap-2 text-sm">
            Model reference
            <input className="rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] px-3 py-3 outline-none focus:border-[#b4cbbd]" defaultValue="183 cm / 86 kg" />
          </label>
        </div>
      </section>
      <section className="grid gap-6">
        <div className="surface p-5">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="size-5 text-[#697f51]" aria-hidden />
            <h2 className="text-xl font-semibold">Fit intelligence setup</h2>
          </div>
          <div className="mt-5 grid gap-3">
            {setupChecklist.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-3 text-sm"
              >
                <input defaultChecked type="checkbox" />
                {item}
              </label>
            ))}
          </div>
        </div>
        <div className="surface p-5">
          <div className="flex items-center gap-3">
            <ImagePlus className="size-5 text-[#648575]" aria-hidden />
            <h2 className="text-xl font-semibold">Product images</h2>
          </div>
          <div className="mt-5 grid min-h-40 place-items-center rounded-[10px] border border-dashed border-[#d0d9c4] bg-[#f7f9f2] text-center">
            <div>
              <Upload className="mx-auto size-7 text-[#697f51]" aria-hidden />
              <p className="mt-3 text-sm text-[#657358]">PNG, WebP, or layered garment mask</p>
            </div>
          </div>
        </div>
        <div className="surface p-5">
          <div className="flex items-center gap-3">
            <Box className="size-5 text-[#a27a36]" aria-hidden />
            <h2 className="text-xl font-semibold">3D model</h2>
          </div>
          <div className="mt-5 rounded-[10px] border border-[#dce3d3] bg-[#f1f3eb] p-4">
            <p className="text-sm text-[#748068]">GLB/GLTF garment assets are versioned per product and served through the CDN.</p>
          </div>
        </div>
        <div className="surface grid gap-4 p-5 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Ruler className="size-5 text-[#648575]" aria-hidden />
            <div>
              <p className="text-sm text-[#748068]">Required chart</p>
              <p className="font-semibold">Shoulder, chest, waist, bicep</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Dumbbell className="size-5 text-[#697f51]" aria-hidden />
            <div>
              <p className="text-sm text-[#748068]">Movement tests</p>
              <p className="font-semibold">Arm raise, stretch, flex</p>
            </div>
          </div>
        </div>
        <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[10px] bg-[#d9e6c7] px-5 font-semibold text-black">
          <Save className="size-5" aria-hidden />
          {status === "saving" ? "Saving product" : status === "saved" ? "Product saved" : "Save product"}
        </button>
      </section>
    </form>
  );
}
