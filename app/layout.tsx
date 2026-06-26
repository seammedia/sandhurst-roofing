import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import GoogleTag from "@/components/GoogleTag";
import CallTracking from "@/components/CallTracking";

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
  metadataBase: new URL("https://sandhurstroofing.com.au"),
  title: {
    default: "Roof Repairs, Restoration & Gutter Repairs | Sandhurst Roofing",
    template: "%s | Sandhurst Roofing",
  },
  description:
    "Get top-notch roof repair services and craftsmanship with Sandhurst Roofing. Contact us today to discuss your specific requirements.",
  applicationName: "Sandhurst Roofing",
  authors: [{ name: "Sandhurst Roofing", url: "https://sandhurstroofing.com.au" }],
  generator: "Next.js",
  keywords: [
    "roofing Melbourne",
    "roof restoration Frankston",
    "re-roofing Mornington Peninsula",
    "COLORBOND roofing",
    "gutter repairs Melbourne",
    "roof painting",
    "roof plumber Melbourne",
  ],
  // NOTE: do NOT set a default `alternates.canonical` here. When set in the
  // root layout, every page inherits it (Next.js doesn't have a sensible
  // page-specific fallback for canonicals), which causes all inner pages to
  // report the homepage as their canonical URL — catastrophic for SEO.
  // Each page (`page.tsx` / `generateMetadata`) must set its own canonical.
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://sandhurstroofing.com.au",
    siteName: "Sandhurst Roofing",
    title: "Roof Repairs, Restoration & Gutter Repairs | Sandhurst Roofing",
    description:
      "Get top-notch roof repair services and craftsmanship with Sandhurst Roofing. Contact us today to discuss your specific requirements.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sandhurst Roofing - Melbourne's Roof Specialists",
    description:
      "Roof restoration, re-roofing, COLORBOND® and gutters. Family-run, 35+ years in the trade. Frankston · Mornington Peninsula · Melbourne SE.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} antialiased`}>
      <body className={inter.className}>
        <GoogleTag />
        {children}
        <LocalBusinessSchema />
        <CallTracking />
      </body>
    </html>
  );
}
