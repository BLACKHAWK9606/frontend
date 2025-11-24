import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.dummyjson.com',
      },
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
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
      {
        source: "/auth/verify-login-otp",
        destination: `${backendurl}/auth/verify-login-otp`,
      },
      {
         source: "/auth/security-questions/available", 
         destination: `${backendurl}/auth/security-questions/available`,
      },


       {
      source: "/auth/security-questions/setup",
      destination: `${backendurl}/auth/security-questions/setup`,
    },
    {
        source: "/auth/forgot-password",
        destination: `${backendurl}/auth/forgot-password`,
      },
      {
        source: "/auth/verify-reset-otp",
        destination: `${backendurl}/auth/verify-reset-otp`,
      },
      {
        source: "/auth/reset-password",
        destination: `${backendurl}/auth/reset-password`,
      },
       {
        source: "/auth/resend-otp",
        destination: `${backendurl}/auth/resend-otp`,
      },
      {
        source: "/auth/security-questions/status/:userId",
        destination: `${backendurl}/auth/security-questions/status/:userId`,
      },
      {
        source: "/auth/security-questions/verify",
        destination: `${backendurl}/auth/security-questions/verify`,
      },
      {
        source: "/api/users/:path*",
        destination: `${backendurl}/api/users/:path*`,
      },

     
    ];
  }
};

export default nextConfig;
