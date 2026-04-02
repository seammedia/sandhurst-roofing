"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const portfolioImages = [
  {
    src: "/images/wp/2018/04/Before-and-After1-e1523846046607.jpg",
    alt: "Before and after roof project 1",
  },
  {
    src: "/images/wp/2018/04/Roof-replacement-after1-e1523845065441.jpg",
    alt: "Roof replacement completed",
  },
  {
    src: "/images/wp/2018/08/Roof-Restoration-pic5.jpg",
    alt: "Roofer working on roof restoration",
  },
  {
    src: "/images/wp/2018/01/IMG_3365.png",
    alt: "Roofing job site",
  },
  {
    src: "/images/wp/2022/02/Reroof-Parkdale-after-image.jpg",
    alt: "Reroof Parkdale completed project",
  },
  {
    src: "/images/wp/2018/04/Before-and-After2-e1523846166898.jpg",
    alt: "Before and after roof project 2",
  },
  {
    src: "/images/wp/2018/01/IMG_3474.jpg",
    alt: "Roofing project in progress",
  },
  {
    src: "/images/wp/2018/07/Roof-replacement-Before-and-After3-e1532574721891.jpg",
    alt: "Roof replacement before and after",
  },
  {
    src: "/images/wp/2018/04/Before-and-After3-e1523846145509.jpg",
    alt: "Before and after roof project 3",
  },
];

// Define transforms for each image position to create the concave arc
// Index 0 and 8 are the outer edges (large, angled inward)
// Index 4 is the center (standard, facing forward)
const imageTransforms = [
  { rotateY: 35, height: 400, translateZ: -60, scale: 1.05 },
  { rotateY: 25, height: 380, translateZ: -40, scale: 1.0 },
  { rotateY: 16, height: 340, translateZ: -20, scale: 0.95 },
  { rotateY: 8, height: 310, translateZ: -10, scale: 0.92 },
  { rotateY: 0, height: 330, translateZ: 0, scale: 0.9 },
  { rotateY: -8, height: 310, translateZ: -10, scale: 0.92 },
  { rotateY: -16, height: 340, translateZ: -20, scale: 0.95 },
  { rotateY: -25, height: 380, translateZ: -40, scale: 1.0 },
  { rotateY: -35, height: 400, translateZ: -60, scale: 1.05 },
];

export default function Portfolio() {
  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 40 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: -800, right: 800 });

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const overflow = (containerWidth - viewportWidth) / 2 + 100;
      setDragConstraints({ left: -overflow, right: overflow });
    }
  }, []);

  return (
    <section className="relative bg-[#f5f5f5] pt-24 pb-0 overflow-hidden">
      {/* Curved White Divider at Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[60px]"
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,0 L0,0 Q720,60 1440,0 L1440,0 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-green-500 text-xs">&#9632;</span>
            <span className="text-sm tracking-widest text-gray-500 uppercase">
              Our Portfolio
            </span>
            <span className="text-green-500 text-xs">&#9632;</span>
          </div>
        </ScrollReveal>

        {/* Heading */}
        <ScrollReveal delay={0.1}>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center uppercase mb-10">
            A Look At What We&apos;ve Nailed
          </h2>
        </ScrollReveal>

        {/* Buttons */}
        <ScrollReveal delay={0.2}>
          <div className="flex items-center justify-center gap-4 mb-12">
            <button className="flex items-center gap-2 bg-black text-white uppercase text-sm tracking-wider px-8 py-3 rounded hover:bg-gray-800 transition-colors">
              View Projects
              <span className="text-lg leading-none">&gt;</span>
            </button>
            <button className="flex items-center gap-2 bg-black text-white uppercase text-sm tracking-wider px-8 py-3 rounded hover:bg-gray-800 transition-colors">
              View Gallery
              <span className="text-lg leading-none">&gt;</span>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* 3D Arc Gallery */}
      <div className="relative w-full" style={{ height: "480px" }}>
        {/* Drag indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-block bg-green-500 text-black text-xs font-bold tracking-widest uppercase px-5 py-1.5 rounded-full select-none">
            Drag &gt;&gt;&gt;
          </span>
        </div>

        <div
          className="relative w-full h-full overflow-visible"
          style={{ perspective: "1000px" }}
        >
          <motion.div
            ref={containerRef}
            className="flex items-end justify-center gap-3 cursor-grab active:cursor-grabbing select-none px-8"
            style={{
              x: springX,
              transformStyle: "preserve-3d",
              paddingTop: "40px",
              paddingBottom: "100px",
            }}
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.1}
            onDrag={(_, info) => {
              x.set(info.offset.x);
            }}
          >
            {portfolioImages.map((img, index) => {
              const t = imageTransforms[index];
              return (
                <motion.div
                  key={index}
                  className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    width: "260px",
                    height: `${t.height}px`,
                    transform: `perspective(1000px) rotateY(${t.rotateY}deg) translateZ(${t.translateZ}px) scale(${t.scale})`,
                    transformOrigin: "center bottom",
                  }}
                  whileHover={{ scale: t.scale * 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="260px"
                    draggable={false}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* White curved arc overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            className="relative block w-full h-[120px]"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,120 L0,50 Q720,0 1440,50 L1440,120 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
