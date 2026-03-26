"use client";

import Link from "next/link";
import { useState } from "react";

const pages = [
  { label: "Home", href: "/" },
  { label: "About us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Albums", href: "/gallery" },
  { label: "Blogs", href: "/blog" },
  { label: "Career", href: "/career" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Roof Installation",
  "Roof Repair",
  "Roof Replacement",
  "Roof Inspections",
  "Roof Coating",
  "Commercial Roofing",
];

const roofingTypes = [
  "Asphalt shingle",
  "Clay Tile",
  "Concrete Tile",
  "Synthetic roofing",
  "Metal Roofing",
  "Architectural",
  "Wood Shake",
  "Solar roofing",
  "Slate Roofing",
  "Flat roofing",
];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24 18.635 24 24 18.633 24 12.013 24 5.393 18.635 0 12.017 0z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-black text-white">
      {/* Section 1: Main Footer Content - Bordered Box */}
      <div className="mx-4 md:mx-8 lg:mx-12 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {/* Pages Column */}
          <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-700">
            <h4 className="text-green-500 font-heading text-sm uppercase tracking-wider mb-6">
              Pages
            </h4>
            <ul className="space-y-3">
              {pages.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-green-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-700">
            <h4 className="text-green-500 font-heading text-sm uppercase tracking-wider mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-gray-300 hover:text-green-500 transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Roofing Types Column */}
          <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-700">
            <h4 className="text-green-500 font-heading text-sm uppercase tracking-wider mb-6">
              Roofing Types
            </h4>
            <ul className="space-y-3">
              {roofingTypes.map((type) => (
                <li key={type}>
                  <span className="text-sm text-gray-300">{type}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Social Column */}
          <div className="p-6 md:p-8">
            {/* Newsletter */}
            <h4 className="font-heading text-sm uppercase tracking-wider mb-6">
              Subscribe to the Newsletter
            </h4>
            <div className="flex gap-2 mb-6">
              <div className="flex-1 flex items-center bg-gray-900 border border-gray-700 rounded">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@framer.com"
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder-gray-500 outline-none"
                />
                <button className="px-2 text-sm">📧</button>
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-black font-bold text-xs uppercase px-4 py-2 rounded transition-colors">
                Subscribe
              </button>
            </div>

            {/* Social Media Grid */}
            <div className="grid grid-cols-3 gap-0">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-2 border border-gray-700 px-3 py-3 text-white hover:text-green-500 transition-colors"
                >
                  {social.icon}
                  <span className="text-xs">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Contact Bar */}
      <div className="mx-4 md:mx-8 lg:mx-12 border border-t-0 border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {/* Phone */}
          <div className="p-6 border-b sm:border-b lg:border-b-0 lg:border-r border-gray-700">
            <h4 className="text-green-500 font-heading text-xs uppercase tracking-wider mb-2">
              Phone
            </h4>
            <p className="text-sm text-gray-300">(217) 555-0134</p>
            <p className="text-sm text-gray-300">(217) 444-0134</p>
          </div>

          {/* Email */}
          <div className="p-6 border-b sm:border-b lg:border-b-0 lg:border-r border-gray-700">
            <h4 className="text-green-500 font-heading text-xs uppercase tracking-wider mb-2">
              Email
            </h4>
            <a
              href="mailto:rooferio@email.com"
              className="text-sm text-gray-300 hover:text-green-500 transition-colors"
            >
              rooferio@email.com
            </a>
          </div>

          {/* Address */}
          <div className="p-6 border-b sm:border-b-0 lg:border-r border-gray-700">
            <h4 className="text-green-500 font-heading text-xs uppercase tracking-wider mb-2">
              Address
            </h4>
            <p className="text-sm text-gray-300">
              123 Main Street, Suite 200,
              <br />
              Austin, TX 78701
            </p>
          </div>

          {/* Opening Hours */}
          <div className="p-6">
            <h4 className="text-green-500 font-heading text-xs uppercase tracking-wider mb-2">
              Opening Hours
            </h4>
            <p className="text-sm text-gray-300">Mon to Sat: 9.00am - 8.30pm</p>
            <p className="text-sm text-gray-300">Sun: Closed</p>
          </div>
        </div>
      </div>

      {/* Section 3: Giant Brand Name */}
      <div className="relative mx-4 md:mx-8 lg:mx-12 mt-8 overflow-hidden">
        <div className="relative">
          <h2 className="font-heading text-[11vw] leading-[0.85] uppercase text-white select-none">
            Sandhurst Roofing
          </h2>
          <p className="hidden md:block absolute right-0 top-4 max-w-[200px] text-sm text-gray-400 text-right leading-relaxed">
            Roofs built to last. Service built on trust. Proudly serving with
            real people, real tools, and real results.
          </p>
        </div>
      </div>

      {/* Section 4: Bottom Bar */}
      <div className="border-t border-gray-800 mx-4 md:mx-8 lg:mx-12 mt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-green-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-green-500 transition-colors"
            >
              Terms
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            &copy; 2026 Sandhurst Roofing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
