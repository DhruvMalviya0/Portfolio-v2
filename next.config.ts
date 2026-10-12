import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every route is static — emit plain HTML to out/ for Cloudflare static assets.
  // Cache headers live in public/_headers since next.config headers() don't apply to exports.
  output: "export",
  images: {
    // No image optimizer on static hosting; source images are already WebP
    unoptimized: true,
  },
};

export default nextConfig;
