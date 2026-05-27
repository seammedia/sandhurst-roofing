"use client";

import Link from "next/link";
import Image from "next/image";

const serviceLinks = [
  { label: "Roof Restoration", href: "/roof-restoration/" },
  { label: "Roof Repairs", href: "/roof-repairs/" },
  { label: "COLORBOND Roofing", href: "/colorbond-roofing/" },
  { label: "Re-Roofing", href: "/re-roofing/" },
  { label: "Roof Painting", href: "/roof-painting/" },
  { label: "Flat Metal Roofing", href: "/flat-metal-roofing/" },
  { label: "Guttering", href: "/guttering/" },
  { label: "Asbestos Removal", href: "/asbestos-roof-removal-and-replacement/" },
  { label: "Tile To Tin", href: "/tile-to-tin-roof/" },
  { label: "Gutter Repairs", href: "/gutter-repairs/" },
  { label: "Gutter Replacement", href: "/gutter-replacement/" },
];

const pageLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Recent Jobs", href: "/recent-jobs/" },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "FAQ's", href: "/faq/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
  { label: "COLORBOND Colour Chart", href: "/colorbond-colour-chart/" },
  { label: "Colour Visualisation Tool", href: "/colour-visualisation-tool/" },
];

const serviceAreas = [
  "Frankston",
  "Mornington Peninsula",
  "Langwarrin",
  "Cranbourne",
  "Dandenong",
  "Berwick",
  "Narre Warren",
  "Pakenham",
  "South East Melbourne",
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="mb-5 inline-block">
              <Image
                src="/images/new-logo.png"
                alt="Sandhurst Roofing - For all your roofing solutions"
                width={538}
                height={357}
                className="h-20 w-auto"
              />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Professional roofing services across Melbourne's south east.
              Specialising in roof restorations, repairs, COLORBOND roofing,
              and complete re-roofs. Fully licensed and insured.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#7cda24]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-sm text-gray-400">
                  10 Duiker Crt, Langwarrin VIC
                </span>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="h-4 w-4 shrink-0 text-[#7cda24]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <a
                  href="tel:0448812800"
                  className="text-sm text-gray-400 transition-colors hover:text-[#7cda24]"
                >
                  0448 812 800
                </a>
              </div>

              <div className="flex items-center gap-3">
                <svg
                  className="h-4 w-4 shrink-0 text-[#7cda24]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <a
                  href="mailto:info@sandhurstroofing.com.au"
                  className="text-sm text-gray-400 transition-colors hover:text-[#7cda24]"
                >
                  info@sandhurstroofing.com.au
                </a>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#7cda24]">
              Our Services
            </h4>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#7cda24]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#7cda24]">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors hover:text-[#7cda24]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-[#7cda24]">
              Service Areas
            </h4>
            <ul className="space-y-2">
              {serviceAreas.map((area) => (
                <li key={area}>
                  <span className="text-sm text-gray-400">{area}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/service-areas/"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#7cda24] transition-colors hover:text-[#6bc41e]"
              >
                View all areas
                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Sandhurst Roofing. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacy-policy/"
              className="text-xs text-gray-500 transition-colors hover:text-[#7cda24]"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms/"
              className="text-xs text-gray-500 transition-colors hover:text-[#7cda24]"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
