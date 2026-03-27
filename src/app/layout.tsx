import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import AuthHandler from "@/components/auth/AuthHandler";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Glamorgan Dashboard",
  description: "Internal dashboard for Glamorgan Marketing",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={cn(inter.className, "bg-[#F5F8FF] text-[#111827] antialiased")}>
        <AuthHandler />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
