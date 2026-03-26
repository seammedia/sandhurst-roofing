"use client";

import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const badges = [
  {
    icon: (
      <span className="text-2xl font-bold">
        <span className="text-blue-500">G</span>
        <span className="text-red-500">o</span>
        <span className="text-yellow-500">o</span>
        <span className="text-blue-500">g</span>
        <span className="text-green-500">l</span>
        <span className="text-red-500">e</span>
      </span>
    ),
    rating: "4.9",
    label: "150+ Google Reviews",
  },
  {
    icon: (
      <span className="text-2xl font-bold text-red-600">
        &#10033;
      </span>
    ),
    rating: "5.00",
    label: "200+ Yelp Reviews",
  },
  {
    icon: (
      <span className="text-2xl font-bold text-blue-700">
        &#9638;&#9638;
      </span>
    ),
    rating: "A+",
    label: "BBB Rating",
  },
];

const testimonials = [
  {
    text: "They replaced our entire roof in just two days. Professional, clean, and the price was exactly what they quoted. No surprises. Would recommend to anyone!",
    author: "James M.",
    role: "Homeowner",
  },
  {
    text: "Called them for a leak during a storm - they were out the next morning. Fixed it fast and even checked the rest of the roof for free. Absolute legends.",
    author: "Sarah L.",
    role: "Homeowner",
  },
  {
    text: "Best roofing experience we've had. From the initial inspection to the final cleanup, everything was smooth. The team was friendly and super knowledgeable.",
    author: "David & Karen P.",
    role: "Property Owners",
  },
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-green-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-[#f5f5f5] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-green-500 text-xs">&#9632;</span>
            <span className="text-sm tracking-widest text-gray-500 uppercase">
              Reviews
            </span>
            <span className="text-green-500 text-xs">&#9632;</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-center uppercase mb-12">
            Don&apos;t Take Our Word For It
            <br />
            - Take Theirs
          </h2>
        </ScrollReveal>

        {/* Rating Badges */}
        <StaggerContainer className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-14">
          {badges.map((badge) => (
            <StaggerItem key={badge.label}>
              <div className="bg-white rounded-lg px-6 py-4 flex items-center gap-4 shadow-sm min-w-[220px]">
                <div>{badge.icon}</div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold">{badge.rating}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500">{badge.label}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Testimonial Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8" staggerDelay={0.15}>
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.author}>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <StarRating />
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-sm">{testimonial.author}</p>
                  <p className="text-gray-400 text-xs">{testimonial.role}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-3">
          <motion.button
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
          <motion.button
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-green-500 hover:text-green-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
