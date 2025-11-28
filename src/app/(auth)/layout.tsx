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
          {children}
    </main>
  );
}