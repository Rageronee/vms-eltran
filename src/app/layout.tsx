import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Vendor Connect",
  description: "Register and manage your vendor partnership with PT Eltran Indonesia through a secure, streamlined online portal.",
  icons: {
    icon: "/logo_b.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col bg-radar-pattern overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
