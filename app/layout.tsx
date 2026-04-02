import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sandhurst Roofing - Expert Roofers in Sandhurst & Frankston",
  description:
    "Professional roofing services in Sandhurst, Frankston and nearby suburbs. 35+ years of experience. Get a free quote today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} antialiased`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
