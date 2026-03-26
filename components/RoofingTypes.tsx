"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const roofingTypes = [
  {
    title: "ASPHALT SHINGLE",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description:
      "Affordable, reliable, and made to handle the heat (and the hail).",
    lifespan: "15-30 years",
    price: "$3.50-$5.50/sq. ft.",
  },
  {
    title: "CLAY TILE",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=400&h=300&fit=crop",
    description:
      "Timeless elegance, unbeatable heat resistance, extreme durability.",
    lifespan: "50-100+ years",
    price: "$10.00-$18.00/sq. ft.",
  },
  {
    title: "CONCRETE TILE",
    image:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop",
    description:
      "Stylish, tough, and made to mimic high-end without the high cost.",
    lifespan: "40-75 years",
    price: "$8.00-$12.00/sq. ft.",
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
            SHINGLE? METAL? TILE? LET&apos;S FIND YOUR MATCH
          </h2>
        </ScrollReveal>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {roofingTypes.map((type) => (
            <StaggerItem key={type.title}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ duration: 0.3 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
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
                      <span className="text-gray-500">Price</span>
                      <p className="font-semibold">{type.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="bg-black text-white px-8 py-3 font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            VIEW ALL TYPES
          </motion.button>
        </div>
      </div>
    </section>
  );
}
