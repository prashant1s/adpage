import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* 75 is the default; 85 is for text-heavy screenshots (proof wall),
       where 75 leaves visible smearing around small numbers. Next 16
       only serves qualities listed here. */
    qualities: [75, 85],
  },
};

export default nextConfig;
