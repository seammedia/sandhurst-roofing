"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const faqItems = [
  {
    question: "How do I know if my roof needs to be replaced?",
    answer:
      "Signs include missing shingles, frequent leaks, sagging areas, or if your roof is over 20-25 years old. We offer free inspections to assess the condition.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes! We provide free, no-obligation estimates for all roofing projects.",
  },
  {
    question: "How long does a roof replacement take?",
    answer:
      "Most residential roof replacements take 1-3 days depending on the size and complexity.",
  },
  {
    question: "What types of roofing materials do you offer?",
    answer:
      "We work with asphalt shingles, clay tiles, concrete tiles, metal roofing, and more.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. We are fully licensed and carry comprehensive insurance coverage.",
  },
  {
    question: "Do you offer warranties on your work?",
    answer:
      "Yes, we offer a 15-year workmanship warranty on all installations.",
  },
  {
    question: "Can you help with insurance claims?",
    answer:
      "Yes, we work directly with insurance companies and can help guide you through the claims process.",
  },
  {
    question: "Do you offer emergency roofing services?",
    answer:
      "Yes, we offer 24/7 emergency roofing services for urgent repairs.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Label */}
        <ScrollReveal>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-green-500">&#9632;</span>
            <span className="text-sm font-semibold tracking-widest uppercase">
              FAQ
            </span>
            <span className="text-green-500">&#9632;</span>
          </div>

          {/* Main Heading */}
          <h2 className="font-heading text-3xl md:text-5xl text-center uppercase mb-12">
            LET&apos;S CLIMB THROUGH YOUR QUESTIONS, ONE BY ONE.
          </h2>
        </ScrollReveal>

        {/* Accordion */}
        <div>
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-200"
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={itemVariants}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="font-bold text-lg pr-4">{item.question}</span>
                <motion.span
                  className="text-2xl flex-shrink-0 text-green-500"
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 pb-5">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
