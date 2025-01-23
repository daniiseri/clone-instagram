import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'https://clone-instagram-qc7i.onrender.com',
      },
    ],
  },
};

export default nextConfig;
