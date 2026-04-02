"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const serviceLinks = [
  { label: "Roof Restoration", href: "/roof-restoration/" },
  { label: "Roof Repairs", href: "/roof-repairs/" },
  { label: "COLORBOND Roofing", href: "/colorbond-roofing/" },
  { label: "Re-Roofing", href: "/re-roofing/" },
  { label: "Roof Painting", href: "/roof-painting/" },
  { label: "Flat Metal Roofing", href: "/flat-metal-roofing/" },
  { label: "Terracotta Tiles", href: "/terracotta-tiles/" },
  { label: "Cement Tiles", href: "/cement-tiles/" },
  { label: "Guttering", href: "/guttering/" },
  { label: "Roof Plumber", href: "/roof-plumber-melbourne/" },
  { label: "Pergolas & Bali Huts", href: "/pergola/" },
  { label: "Asbestos Removal", href: "/asbestos-roof-removal-and-replacement/" },
  { label: "Tile To Tin", href: "/tile-to-tin-roof/" },
  { label: "Rebedding & Repointing", href: "/rebedding-repointing/" },
  { label: "Gutter Repairs", href: "/gutter-repairs/" },
  { label: "Gutter Replacement", href: "/gutter-replacement/" },
];

const colourToolLinks = [
  { label: "COLORBOND Colour Chart", href: "/colorbond-colour-chart/" },
  { label: "Colour Visualisation Tool", href: "/colour-visualisation-tool/" },
];

type NavItem = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about-us/" },
  { label: "Services", href: "#", dropdown: serviceLinks },
  { label: "Recent Jobs", href: "/recent-jobs/" },
  { label: "Colour Tools", href: "#", dropdown: colourToolLinks },
  { label: "Service Areas", href: "/service-areas/" },
  { label: "FAQ's", href: "/faq/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/contact/" },
];

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function DesktopDropdown({
  items,
  isOpen,
  isWide,
}: {
  items: { label: string; href: string }[];
  isOpen: boolean;
  isWide: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.15 }}
          className={`absolute left-0 top-full z-50 mt-0 rounded-b-md bg-white shadow-lg ring-1 ring-black/5 ${
            isWide ? "w-[520px]" : "w-64"
          }`}
        >
          <div
            className={
              isWide
                ? "grid grid-cols-2 gap-0 p-2"
                : "flex flex-col p-2"
            }
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[#7cda24]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const toggleMobileSection = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top bar with phone number */}
      <div className="hidden border-b border-gray-100 bg-gray-50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-1 sm:px-6 lg:px-8">
          <a
            href="tel:0448812800"
            className="flex items-center gap-1.5 text-xs font-medium text-gray-600 transition-colors hover:text-[#7cda24]"
          >
            <svg
              className="h-3.5 w-3.5"
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
            0448 812 800
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <path
                d="M4 18L16 6L28 18"
                stroke="#7cda24"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 15V26H24V15"
                stroke="#7cda24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect x="13" y="20" width="6" height="6" rx="0.5" fill="#7cda24" />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-black">
                SANDHURST ROOFING
              </span>
              <span className="text-[10px] text-gray-500">
                For all your roofing problems
              </span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const hasDropdown = !!item.dropdown;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={
                    hasDropdown ? () => handleMouseEnter(item.label) : undefined
                  }
                  onMouseLeave={hasDropdown ? handleMouseLeave : undefined}
                >
                  {hasDropdown ? (
                    <button
                      className="flex items-center gap-0.5 rounded px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-[#7cda24]"
                      onClick={() =>
                        setOpenDropdown(
                          openDropdown === item.label ? null : item.label
                        )
                      }
                    >
                      {item.label}
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="rounded px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-[#7cda24]"
                    >
                      {item.label}
                    </Link>
                  )}
                  {hasDropdown && (
                    <DesktopDropdown
                      items={item.dropdown!}
                      isOpen={openDropdown === item.label}
                      isWide={item.label === "Services"}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:block"
            >
              <a
                href="tel:0448812800"
                className="inline-flex items-center gap-2 rounded-md bg-[#7cda24] px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#6bc41e]"
              >
                <svg
                  className="h-4 w-4"
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
                Call Now
              </a>
            </motion.div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center text-gray-800 lg:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-gray-100 bg-white lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-0 px-4 pb-4 pt-2">
              {navItems.map((item) => {
                const hasDropdown = !!item.dropdown;
                const isExpanded = mobileExpanded === item.label;

                return (
                  <div key={item.label}>
                    {hasDropdown ? (
                      <button
                        onClick={() => toggleMobileSection(item.label)}
                        className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium text-gray-800 transition-colors hover:text-[#7cda24]"
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-3 py-3 text-sm font-medium text-gray-800 transition-colors hover:text-[#7cda24]"
                      >
                        {item.label}
                      </Link>
                    )}

                    {/* Mobile sub-menu */}
                    <AnimatePresence>
                      {hasDropdown && isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="overflow-hidden"
                        >
                          <div className="border-l-2 border-[#7cda24] ml-4 pl-3 pb-2">
                            {item.dropdown!.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2 text-sm text-gray-600 transition-colors hover:text-[#7cda24]"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-3">
                <a
                  href="tel:0448812800"
                  className="flex items-center justify-center gap-2 rounded-md bg-[#7cda24] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black"
                >
                  <svg
                    className="h-4 w-4"
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
                  Call 0448 812 800
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
