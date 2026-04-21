import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Ye line TypeScript errors ko ignore karegi build ke waqt
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ye line ESLint errors ko ignore karegi
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;