import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ['nike-ecommerce-template-3.vercel.app', 'cdn.sanity.io'],
  },

  webpack: (config) => {
    config.resolve.alias["@public"] = path.resolve(__dirname, "public");
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/api/countries",
        destination: "https://nike-ecommerce-template-3.vercel.app/api/countries",
      },
    ];
  },
};

export default nextConfig;