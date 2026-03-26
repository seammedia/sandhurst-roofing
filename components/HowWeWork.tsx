"use client";

import { motion } from "framer-motion";
import ScrollReveal, { StaggerContainer, StaggerItem } from "./ScrollReveal";

const steps = [
  {
    number: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
    title: "TELL US WHAT'S UP (OR WHAT'S LEAKING)",
    description:
      "Give us a call, shoot us a message, or fill out a quick form. We'll get back to you faster than a leaky roof on a rainy day.",
    active: true,
  },
  {
    number: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
    title: "WE COME, WE SEE, WE INSPECT",
    description:
      "Our expert roofers will swing by for a thorough inspection - no guesswork, no surprises. We'll schedule a quick visit to understand your needs.",
    active: false,
  },
  {
    number: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    title: "GAME PLAN & GREEN LIGHT",
    description:
      "We'll walk you through the plan, the costs, and the timeline. No jargon - just straight talk.",
    active: false,
  },
  {
    number: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
    title: "WE GET TO WORK (AND NAIL IT)",
    description:
      "Sit back, relax, and let us handle the heavy lifting. We work clean, fast, and right.",
    active: false,
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-[#f5f5f5] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-green-500 text-xs">&#9632;</span>
            <span className="text-sm tracking-widest text-gray-500 uppercase">
              How We Work
            </span>
            <span className="text-green-500 text-xs">&#9632;</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl uppercase mb-12">
            Here&apos;s How We Make
            <br />
            Roofing Easy-Peasy
          </h2>
        </ScrollReveal>

        {/* Steps Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.15}>
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <motion.div
                className={`rounded-lg p-6 flex flex-col justify-between min-h-[280px] ${
                  step.active
                    ? "bg-green-500 text-gray-900"
                    : "bg-white text-gray-900"
                }`}
                whileHover={{ y: -5, boxShadow: "0 10px 40px rgba(0,0,0,0.12)" }}
                transition={{ duration: 0.2 }}
              >
                <div>
                  {/* Icon */}
                  <div
                    className={`mb-5 ${
                      step.active ? "text-gray-900" : "text-green-500"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-sm uppercase mb-3 leading-snug">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-sm leading-relaxed ${
                      step.active ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Step Label */}
                <p
                  className={`text-xs uppercase tracking-wider mt-6 font-semibold ${
                    step.active ? "text-gray-800" : "text-gray-400"
                  }`}
                >
                  Step {step.number}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
