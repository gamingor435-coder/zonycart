import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Ye sab se zaroori line hai
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ye linting ko build ke waqt rok degi
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;