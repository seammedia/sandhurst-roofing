"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const badges = [
  { icon: "🏗️", label: "35+ years of experience" },
  { icon: "✅", label: "Certified Contractor" },
  { icon: "🏆", label: "Voted best roofers in Sandhurst 2026" },
];

export default function Hero() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-7xl px-4 pb-0 pt-6 sm:px-6 lg:px-8">
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-between">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center gap-2 rounded-full border border-gray-700 px-4 py-1.5 text-xs font-medium text-white sm:text-sm"
            >
              <span className="text-green-500">{badge.icon}</span>
              {badge.label}
            </motion.div>
          ))}
        </div>

        {/* Main heading */}
        <motion.h1
          className="font-heading mt-10 text-5xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            THE ROOFERS
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            YOUR NEIGHBORS
          </motion.span>
          <br />
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-white">SECRETLY</span>{" "}
            <span className="text-white">RECOMMEND</span>
          </motion.span>
        </motion.h1>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-start justify-between gap-8 pb-10 md:flex-row md:items-end">
          {/* Left - buttons */}
          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.a
              href="#quote"
              className="inline-flex items-center gap-2 bg-green-500 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-green-600"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              GET A FREE QUOTE
              <span className="text-lg leading-none">&gt;</span>
            </motion.a>
            <motion.a
              href="tel:+61448812800"
              className="inline-flex items-center gap-2 border border-gray-600 bg-transparent px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {/* Phone icon */}
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +61 448 812 800
              <span className="text-lg leading-none">&gt;</span>
            </motion.a>
          </motion.div>

          {/* Right - tagline */}
          <motion.p
            className="max-w-xs text-right text-sm italic text-gray-400 md:max-w-sm"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Dominating roofs across Frankston, Sandhurst and nearby suburbs.
          </motion.p>
        </div>
      </div>

      {/* Full-width hero image with curved top */}
      <motion.div
        className="overflow-hidden rounded-t-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        <Image
          src="/images/wp/2018/08/Roof-Restoration-pic5.jpg"
          alt="Professional roofers working on a roof"
          width={1600}
          height={600}
          className="h-auto w-full object-cover"
          priority
        />
      </motion.div>
    </section>
  );
}
