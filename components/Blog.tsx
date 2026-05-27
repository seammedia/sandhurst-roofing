"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

export interface BlogCardPost {
  slug: string;
  title: string;
  date: string;
  categories?: string[];
  featuredImage?: string | null;
}

interface BlogProps {
  posts: BlogCardPost[];
}

// Fallback image if a post has no featured image set
const FALLBACK_IMAGE = "/images/wp/2018/07/Roof-Restoration-pic3-e1532571064655.jpg";

function formatDate(dateStr: string): string {
  // Posts stored as e.g. "2023-10-30 11:32:19" - render as "October 30, 2023"
  try {
    const d = new Date(dateStr.replace(" ", "T"));
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-AU", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function Blog({ posts }: BlogProps) {
  const blogPosts = posts.slice(0, 3).map((p) => ({
    slug: p.slug,
    image: p.featuredImage || FALLBACK_IMAGE,
    tag: p.categories?.[0] || "Roofing",
    date: formatDate(p.date),
    title: p.title,
  }));

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
            <StaggerItem key={post.slug}>
              <Link href={`/blog/${post.slug}/`} className="block h-full">
                <motion.div
                  whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm group h-full cursor-pointer"
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
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Button */}
        <div className="text-center">
          <Link
            href="/blog/"
            className="inline-block bg-black text-white px-8 py-3 font-semibold uppercase tracking-wide hover:bg-gray-800 transition-colors"
          >
            READ ALL BLOGS
          </Link>
        </div>
      </div>
    </section>
  );
}
