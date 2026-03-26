import type { Metadata } from "next";
import { Anton } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
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
    <html lang="en" className={`${anton.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
