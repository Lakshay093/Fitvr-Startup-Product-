import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  devIndicators: false,
  async rewrites() {
    const apiUrl = process.env.FITVR_API_URL;
    return apiUrl
      ? [{ source: "/backend/:path*", destination: `${apiUrl.replace(/\/$/, "")}/:path*` }]
      : [];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  turbopack: {
    root: path.resolve(process.cwd(), "../.."),
    rules: {}
  }
};

export default nextConfig;
