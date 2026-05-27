"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";
import { useState } from "react";

const services = [
  {
    title: "ROOF INSTALLATION",
    description:
      "Built strong from the start — because a solid roof starts with a solid install.",
    image: "/images/wp/2018/07/Roof-Restoration-pic1.jpg",
    href: "/re-roofing/",
  },
  {
    title: "ROOF REPAIR",
    description:
      "Leaks, cracks, or storm damage? We patch it up before it gets worse.",
    image: "/images/wp/2018/07/roof-repairs-pic3.jpg",
    href: "/roof-repairs/",
  },
  {
    title: "ROOF REPLACEMENT",
    description:
      "Out with the old, in with something way better (and leak-free).",
    image: "/images/wp/2022/02/Reroof-Parkdale-after-image.jpg",
    href: "/re-roofing/",
  },
  {
    title: "ROOF RESTORATION",
    description:
      "Bring tired roofs back to life — cleaning, re-bedding, re-pointing, sealing.",
    image: "/images/wp/2018/07/Roof-Restoration-pic4-e1532571077281.jpg",
    href: "/roof-restoration/",
  },
  {
    title: "ROOF PAINTING",
    description: "It's like sunscreen... but for your roof.",
    image: "/images/wp/2018/10/roof-painting-and-re-pointing.jpg",
    href: "/roof-painting/",
  },
  {
    title: "GUTTERING & PLUMBING",
    description:
      "Full rainwater system — gutters, downpipes, fascia — matched to your roof.",
    image: "/images/wp/2018/05/Colorbond-Roofing-pic1.jpg",
    href: "/guttering/",
  },
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={service.href} className="block">
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden flex flex-col relative cursor-pointer h-full"
      >
        <div className="flex flex-1">
          {/* Text Side */}
          <div className="flex-1 p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm uppercase mb-2">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
            {/* Green Arrow Button - visible when not hovered */}
            <div className="mt-4">
              <motion.div
                animate={{ opacity: hovered ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    &gt;
                  </span>
                </span>
              </motion.div>
            </div>
          </div>

          {/* Image Side */}
          <div className="relative w-[140px] min-h-[180px] flex-shrink-0 overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="140px"
              />
            </motion.div>
          </div>
        </div>

        {/* Full-width VIEW bar - appears on hover */}
        <motion.div
          className="bg-green-500 flex items-center justify-between px-5 overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: hovered ? 40 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          <span className="text-white text-sm font-bold uppercase tracking-wider">
            VIEW
          </span>
          <span className="text-white text-sm font-bold tracking-wider">
            &gt;&gt;&gt;
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
}

export default function Services() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Label + Heading */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-green-500 text-xs">&#9632;</span>
            <span className="text-sm tracking-widest text-gray-500 uppercase">
              Our Services
            </span>
            <span className="text-green-500 text-xs">&#9632;</span>
          </div>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center uppercase mb-12">
            We Climb So You Don&apos;t Have To
          </h2>
        </ScrollReveal>

        {/* Services Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            href="/contact/"
            className="bg-black text-white uppercase text-sm tracking-wider px-8 py-3 rounded hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
          >
            Get A Free Quote
            <span className="text-lg">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
