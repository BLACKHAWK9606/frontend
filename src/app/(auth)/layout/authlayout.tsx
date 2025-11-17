// src/app/layouts/AuthLayout.tsx
"use client";

import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  imageSrc?: string;
  altText?: string;
}

export default function AuthLayout({
  children,
  imageSrc = "/login.jpg",
  altText = "Authentication background",
}: AuthLayoutProps) {
  return (
    <main className="flex min-h-screen">
      {/* Left image */}
      <div className="relative w-1/2 hidden md:block">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right side (Sign In or Sign Up) */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </main>
  );
}