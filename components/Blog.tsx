"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const blogPosts = [
  {
    image: "/images/wp/2020/06/Full-roof-restoration-with-red-cement-tiles.png",
    tag: "Tips",
    date: "June 22, 2025",
    title: "7 Easy Ways to Make Your Roof Last Longer",
  },
  {
    image: "/images/wp/2023/10/roof-inspection-img.jpg",
    tag: "Guides",
    date: "July 5, 2025",
    title: "Choosing the Right Roofing Material: A Homeowner's Simple Guide",
  },
  {
    image: "/images/wp/2018/07/Roof-Restoration-pic3-e1532571064655.jpg",
    tag: "Advice",
    date: "July 15, 2025",
    title: "Roof Repair vs. Replacement: How to Make the Right Call",
  },
];

export default function Blog() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#f5f5f5" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-green-500">&#9632;</span>
            <span className="text-sm font-semibold tracking-widest uppercase">
              Blogs
            </span>
            <span className="text-green-500">&#9632;</span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl md:text-5xl text-center uppercase mb-12">
            THE ROOF FILES - STORIES, GUIDES &amp; GOOD ADVICE
          </h2>
        </ScrollReveal>

        {/* Blog Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <StaggerItem key={post.title}>
              <motion.div
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-sm group"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-400 group-hover:scale-105"
                    />
                  </motion.div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                      {post.tag}
                    </span>
                    <span className="text-gray-500 text-sm">{post.date}</span>
                  </div>
                  <h3 className="font-bold text-lg">{post.title}</h3>
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
            READ ALL BLOGS
          </motion.button>
        </div>
      </div>
    </section>
  );
}
