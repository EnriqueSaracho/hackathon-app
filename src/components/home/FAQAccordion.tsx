"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/site";

const categories = [
  "General",
  "Teams & Projects",
  "Logistics",
  "Eligibility",
] as const;

export function FAQAccordion() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("General");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqs.filter((f) => f.category === activeCategory);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(0);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              activeCategory === cat
                ? "bg-navy-900 text-white"
                : "bg-white text-text-dark hover:bg-navy-800/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-2">
        {filtered.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-navy-800/10 bg-white"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between px-5 py-4 text-left font-medium"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                {faq.question}
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-navy-800/10 px-5 py-4 text-sm text-text-muted">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
