"use client";

import Image from "next/image";
import { useRef, useState, useCallback, useEffect } from "react";

const portfolioImages = [
  {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=350&fit=crop",
    alt: "House roof project 1",
  },
  {
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=350&fit=crop",
    alt: "House roof project 2",
  },
  {
    src: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=350&fit=crop",
    alt: "House roof project 3",
  },
  {
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=350&fit=crop",
    alt: "House roof project 4",
  },
  {
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=350&fit=crop",
    alt: "House roof project 5",
  },
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=350&fit=crop",
    alt: "House roof project 6",
  },
  {
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=350&fit=crop",
    alt: "House roof project 7",
  },
  {
    src: "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=400&h=350&fit=crop",
    alt: "House roof project 8",
  },
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&h=350&fit=crop",
    alt: "House roof project 9",
  },
];

const ANGLE_PER_IMAGE = 20;
const TRANSLATE_Z = 600;

export default function Portfolio() {
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const velocityRef = useRef(0);

  const centerIndex = Math.floor(portfolioImages.length / 2);
  const initialRotation = 0;

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    velocityRef.current = 0;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      velocityRef.current = dx * 0.15;
      setRotation((prev) => prev + dx * 0.15);
      lastX.current = e.clientX;
    },
    []
  );

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;

    const decelerate = () => {
      velocityRef.current *= 0.95;
      if (Math.abs(velocityRef.current) < 0.05) {
        velocityRef.current = 0;
        animationRef.current = null;
        return;
      }
      setRotation((prev) => prev + velocityRef.current);
      animationRef.current = requestAnimationFrame(decelerate);
    };

    animationRef.current = requestAnimationFrame(decelerate);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
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
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-green-500 text-xs">&#9632;</span>
          <span className="text-sm tracking-widest text-gray-500 uppercase">
            Our Portfolio
          </span>
          <span className="text-green-500 text-xs">&#9632;</span>
        </div>

        {/* Heading */}
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center uppercase mb-10">
          A Look At What We&apos;ve Nailed
        </h2>

        {/* Buttons */}
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
      </div>

      {/* 3D Carousel */}
      <div className="relative w-full" style={{ height: "420px" }}>
        {/* Drag indicator */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="inline-block bg-green-500 text-black text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full select-none">
            Drag &gt;&gt;&gt;
          </span>
        </div>

        <div
          ref={containerRef}
          className="relative w-full h-full cursor-grab active:cursor-grabbing select-none"
          style={{ perspective: "1200px" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="absolute left-1/2 top-1/2 w-0 h-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateY(-50%) rotateY(${rotation}deg)`,
            }}
          >
            {portfolioImages.map((img, index) => {
              const angle = (index - centerIndex) * ANGLE_PER_IMAGE;
              return (
                <div
                  key={index}
                  className="absolute rounded-xl overflow-hidden shadow-2xl"
                  style={{
                    width: "300px",
                    height: "240px",
                    left: "-150px",
                    top: "-120px",
                    transform: `rotateY(${angle}deg) translateZ(${TRANSLATE_Z}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover pointer-events-none"
                    sizes="300px"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* White curved arc overlay at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
          <svg
            className="relative block w-full h-[100px]"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,100 L0,40 Q720,0 1440,40 L1440,100 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
