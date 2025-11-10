import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  output: "standalone",
  images: {
    domains: ['cdn.dummyjson.com', 'dummyjson.com'],
  },
  // eslint: {
  //   ignoreDuringBuilds: false,
  // },

  async rewrites() {
    const backendurl = process.env.NEXT_PUBLIC_BASE_URL;
    if(!backendurl) {
      console.error("NEXT_PUBLIC_BASE_URL is not defined in environment variables");
      return [];
    }
    return [
      {
        source: "/auth/login",
        destination: `${backendurl}/auth/login`,
      },
      {
        source: "/auth/logout",
        destination: `${backendurl}/auth/logout`,
      },
    ];
  }
};

export default nextConfig;
