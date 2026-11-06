"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const roofingTypes = [
  {
    title: "COLORBOND® STEEL",
    image: "/images/wp/2018/07/Colorbond-Roofing-pic1.jpg",
    description:
      "Lightweight, weather-tough, and Australia's most-trusted roofing steel.",
    lifespan: "30-50+ years",
    href: "/colorbond-roofing/",
  },
  {
    title: "FLAT METAL ROOFING",
    image: "/images/wp/2018/07/flat-metal-roofing-pic2-e1532572999317.jpg",
    description:
      "Clean lines and tight seams for low-pitch roofs, extensions and verandahs.",
    lifespan: "30-50+ years",
    href: "/flat-metal-roofing/",
  },
  {
    title: "TILE TO TIN",
    image: "/images/wp/2023/02/Roofing-springvale-south-6.jpg",
    description:
      "Lose the weight and the maintenance. Convert an old tile roof to metal.",
    lifespan: "30-50+ years",
    href: "/tile-to-tin-roof/",
  },
];

export default function RoofingTypes() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-green-500">&#9632;</span>
            <span className="text-sm font-semibold tracking-widest uppercase">
              Roofing Types
            </span>
            <span className="text-green-500">&#9632;</span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl md:text-5xl text-center uppercase mb-12">
            COLORBOND? FLAT METAL? TILE TO TIN? LET&apos;S FIND YOUR MATCH
          </h2>
        </ScrollReveal>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {roofingTypes.map((type) => (
            <StaggerItem key={type.title}>
              <Link href={type.href} className="block h-full">
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-full cursor-pointer"
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg uppercase mb-2">
                      {type.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{type.description}</p>
                    <div className="border-t border-gray-200 pt-4 flex justify-between text-sm">
                      <div>
                        <span className="text-gray-500">Lifespan</span>
                        <p className="font-semibold">{type.lifespan}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-green-600 font-semibold uppercase tracking-wider text-xs">
                          Learn more &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Button */}
        <div className="text-center">
          <Link
            href="/recent-jobs/"
            className="inline-block bg-black text-white px-8 py-3 font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            SEE OUR RECENT WORK
          </Link>
        </div>
      </div>
    </section>
  );
}
