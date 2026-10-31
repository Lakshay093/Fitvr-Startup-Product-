import {
  Camera,
  Building2,
  DatabaseZap,
  FileDown,
  LockKeyhole,
  ScrollText,
  Trash2,
  type LucideIcon
} from "lucide-react";
import { MarketingNav } from "@/components/marketing/MarketingNav";

const privacyControls: {
  title: string;
  copy: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Camera permission",
    copy: "The camera starts only after shopper consent and browser permission.",
    icon: Camera
  },
  {
    title: "Temporary processing",
    copy: "Shoppers can complete a fit session without saving measurements.",
    icon: DatabaseZap
  },
  {
    title: "Profile deletion",
    copy: "Clear session & start again removes your entered measurements from the active fitting room. Reloading also resets the profile.",
    icon: Trash2
  },
  {
    title: "No profile upload",
    copy: "The redesigned fitting room keeps your measurements in browser memory. It does not send them to a server or save them to browser storage.",
    icon: LockKeyhole
  },
  {
    title: "Data export",
    copy: "Download this look exports your measurements and garment selections as a JSON file on your device. Clearing the session does not delete downloaded files.",
    icon: FileDown
  },
  {
    title: "Demo collection",
    copy: "The fitting room uses sample garments. Your preview selections are not shared with a retailer.",
    icon: Building2
  },
  {
    title: "Scanning status",
    copy: "Native LiDAR scanning is not connected yet. The sample scan is an animation; the optional live camera view is for framing only and records no video.",
    icon: ScrollText
  }
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8f8f3] text-[#292d26]">
      <MarketingNav />
      <section className="fit-container py-16">
        <p className="metric text-sm">PRIVACY AND CONSENT</p>
        <h1 className="mt-3 max-w-3xl text-5xl font-semibold">Your shape. Your space. Your say.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#748068]">
          Here is how your data works in the current fitting-room preview.
          Explore a sample without sharing anything, or enter measurements
          for this session. You choose whether to open your camera or export a file.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {privacyControls.map(({ icon: Icon, title, copy }) => {
            return (
              <div key={title} className="surface p-5">
                <Icon className="size-6 text-[#697f51]" aria-hidden />
                <h2 className="mt-4 text-xl font-semibold">{title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#748068]">{copy}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
