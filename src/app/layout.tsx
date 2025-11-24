import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Bancassurance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="min-h-screen w-full bg-gray-50 dark:bg-gray-50 text-foreground drak:text-foreground overflow-x-hidden antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
