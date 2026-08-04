import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.bitrix24.com.br",
      },
    ],
  },
};

export default nextConfig;
