import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitVR | A fitting room, built around you",
  description:
    "Meet your personal fitting room. Explore full-body scanning, discover your fit, and preview oversized tees, compression wear, and everyday essentials.",
  metadataBase: new URL("https://fitvr.com"),
  icons: {
    icon: "/logow.png",
    apple: "/logow.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <footer aria-label="Creator credit" className="border-t border-[#e2e5da] bg-[#f8f8f3] px-6 py-5 text-center text-xs text-[#69735e]">
          Made by Lakshay Dhiman with pure heart <span role="img" aria-label="heart">&#10084;&#65039;</span>
        </footer>
      </body>
    </html>
  );
}
