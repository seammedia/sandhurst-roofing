"use client";

import { useState } from "react";

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

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Section Label */}
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

        {/* Accordion */}
        <div>
          {faqItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200">
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between py-5 text-left"
              >
                <span className="font-bold text-lg pr-4">{item.question}</span>
                <span className="text-2xl flex-shrink-0 text-green-500">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
