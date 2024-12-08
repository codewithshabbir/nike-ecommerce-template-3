import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* Other config options */

  webpack: (config) => {
    config.resolve.alias["@public"] = path.resolve(__dirname, "public");
    return config;
  },
};

export default nextConfig;
