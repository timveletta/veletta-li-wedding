import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://maps.googleapis.com/maps/api/staticmap")],
  },
};

export default nextConfig;
