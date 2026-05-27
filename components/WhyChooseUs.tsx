"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const features = [
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "FULLY INSURED, ZERO WORRIES.",
    desc: "We're covered head to toe - so your property (and your peace of mind) stays protected.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    title: "CERTIFIED AND VERIFIED.",
    desc: "Licensed pros who actually know what they're doing. No guesswork, just expertise.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.09 6.26L20.18 9l-5 4.09L16.82 20 12 16.54 7.18 20l1.64-6.91L3.82 9l6.09-.74L12 2z" />
      </svg>
    ),
    title: "ONLY THE GOOD STUFF UP TOP.",
    desc: "We use top-tier materials that hold strong through storms, sun, and squirrel attacks.",
  },
  {
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
    title: "NO FUNNY BUSINESS.",
    desc: "We keep things affordable without cutting corners - great roofs at great value.",
  },
];

const stats = [
  {
    number: "21",
    suffix: "K+",
    label: "ROOFS INSTALLED",
    desc: "From cozy homes to massive commercial builds - we've covered a lot of ground.",
  },
  {
    number: "42",
    suffix: "+",
    label: "EXPERT ROOFERS",
    desc: "Skilled, certified, and always up for the climb.",
  },
  {
    number: "1,000",
    suffix: "+",
    label: "REPAIRS COMPLETED",
    desc: "Fast, reliable, and leak-proof - just how roof repairs should be.",
  },
  {
    number: "5",
    suffix: "-star",
    label: "AVERAGE RATING",
    desc: "Across Google, Facebook, and Yelp - customers love us.",
  },
];

const statVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function WhyChooseUs() {
  return (
    <>
      {/* Why Choose Us - White section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section label + heading */}
          <ScrollReveal>
            <div className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-widest text-gray-800">
              <span className="text-green-500">&#9632;</span>
              WHY CHOOSE ROOFERIO
              <span className="text-green-500">&#9632;</span>
            </div>

            <h2 className="font-heading mx-auto mb-12 max-w-4xl text-center text-4xl font-black uppercase leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              BECAUSE YOUR ROOF DESERVES BETTER THAN &apos;GOOD ENOUGH&apos;
            </h2>
          </ScrollReveal>

          {/* Gray card with feature grid */}
          <div className="rounded-2xl bg-[#f5f5f5] p-6 sm:p-10 lg:p-14">
            <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:gap-10">
              {features.map((feature) => (
                <StaggerItem key={feature.title}>
                  <div className="rounded-xl bg-white p-6 sm:p-8">
                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-gray-100 p-3 text-gray-800">
                      {feature.icon}
                    </div>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-tight text-gray-900">
                      {feature.title}
                    </h3>
                    <hr className="my-3 border-gray-200" />
                    <p className="text-sm leading-relaxed text-gray-600">
                      {feature.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Stats - Dark section with background image */}
      <section className="relative overflow-hidden bg-black">
        {/* Background image */}
        <Image
          src="/images/wp/2018/04/sandhurst-roofing-about-us.jpg"
          alt="Roofers working on a roof"
          fill
          className="object-cover opacity-30"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            className="grid gap-12 sm:grid-cols-2 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center sm:text-left"
                variants={statVariants}
              >
                <div className="font-heading text-7xl font-black leading-none tracking-tight text-white lg:text-8xl">
                  {stat.number}
                  <span className="text-green-500">{stat.suffix}</span>
                </div>
                <p className="mt-3 text-sm font-bold uppercase tracking-widest text-white">
                  {stat.label}
                </p>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-400">
                  {stat.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
