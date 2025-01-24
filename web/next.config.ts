import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'https://clone-instagram-qc7i.onrender.com',
      },
      {
        hostname: 'localhost'
      }
    ],
  },
};

export default nextConfig;
