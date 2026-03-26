"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.71-3.14a1.5 1.5 0 01-.79-1.32V6.43a1.5 1.5 0 01.79-1.32l5.71-3.14a1.5 1.5 0 011.16 0l5.71 3.14a1.5 1.5 0 01.79 1.32v4.28a1.5 1.5 0 01-.79 1.32l-5.71 3.14a1.5 1.5 0 01-1.16 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.71l-10.13 5.26a1.5 1.5 0 01-1.24 0L.25 6.71" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17V21.5" />
      </svg>
    ),
    iconAlt: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
      </svg>
    ),
    text: "Every roof is different. We tailor every project to fit your home and budget.",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
    text: "Talk directly to the people doing the work - no runarounds, no call centers.",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    text: "Locally owned, locally loved. We live where we work.",
  },
  {
    icon: (
      <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    text: "From hidden damage to tiny leaks - we catch the small stuff before it's big.",
  },
];

export default function AboutUs() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <ScrollReveal>
          <div className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-800">
            <span className="text-green-500">&#9632;</span>
            ABOUT US
            <span className="text-green-500">&#9632;</span>
          </div>

          {/* Main heading */}
          <h2 className="font-heading mx-auto mb-14 text-center text-4xl font-black uppercase leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            SERVING ROOFS SINCE 1982
          </h2>
        </ScrollReveal>

        {/* Two-column layout */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left - Image with play button */}
          <ScrollReveal direction="right">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop"
                alt="Aerial view of a roof"
                width={800}
                height={600}
                className="h-auto w-full object-cover grayscale"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1.0, 1.1, 1.0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <button
                    aria-label="Play video"
                    className="flex h-16 w-16 items-center justify-center bg-green-500 transition-transform hover:scale-110"
                  >
                    <svg className="ml-1 h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </motion.div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Text content */}
          <ScrollReveal direction="left">
            <div>
              <p className="mb-8 text-base leading-relaxed text-gray-600 lg:text-lg">
                What started as a small family operation has grown into one of the
                most trusted roofing teams in town. We&apos;re not just contractors
                - we&apos;re your neighbors.
              </p>

              {/* Feature list */}
              <div className="space-y-5">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                      {feature.icon}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600 pt-2">
                      {feature.text}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href="#about"
                className="mt-10 inline-flex items-center gap-2 bg-gray-900 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-gray-800"
                whileHover={{ scale: 1.05 }}
              >
                KNOW MORE ABOUT US
                <span className="text-lg leading-none">&rarr;</span>
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
