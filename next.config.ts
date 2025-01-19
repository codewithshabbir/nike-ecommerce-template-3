import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Other config options */

  images: {
    domains: ['nike-ecommerce-template-3.vercel.app', 'cdn.sanity.io'],  // Allow loading images from this domain
  },

  webpack: (config) => {
    config.resolve.alias["@public"] = path.resolve(__dirname, "public");
    return config;
  },
};

export default nextConfig;