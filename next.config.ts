import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF where supported, WebP otherwise
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Navigator model + cut-ins never change in place — cache hard
        source: "/:dir(models|images)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
