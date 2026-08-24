// src/components/sections/TestimonialsSection.tsx
import { useEffect, useState } from "react";
import type { Testimonial } from "@techive/shared";
import { getTestimonials } from "../../lib/api";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";

const fallback: Partial<Testimonial>[] = [
  { quote: "TECHIVE completely transformed how we managed clinical data ingestion. Fast, clean, and perfectly engineered.", authorName: "Dr. Sarah Jenkins", authorTitle: "Director of Product, ScribeAI" },
  { quote: "The ledger pipelines they set up for Apex hold up perfectly under heavy peak hours. Exceptional quality.", authorName: "Marcus Miller", authorTitle: "VP of Engineering, Apex Ledger" },
  { quote: "Outstanding design choices and intuitive progression tracks. Our course engagement rose by 40%.", authorName: "Elena Rostova", authorTitle: "Co-founder, Nova Learn" },
];

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[] | Partial<Testimonial>[]>(fallback);

  useEffect(() => {
    getTestimonials()
      .then((data) => data.length && setItems(data))
      .catch((err) => console.error("Failed to load testimonials", err));
  }, []);

  return (
    <div className="bg-tag px-6 lg:px-20 py-16 lg:py-24">
      <SectionHeader tag="What Our Clients Say" title="Loved by Engineering Teams" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
        {items.map((t, i) => (
          <TiltCard key={t.id ?? i} intensity={5} className="bg-bg border border-border rounded-card shadow-depth-sm hover:shadow-depth-md p-8 flex flex-col gap-6">
            <p className="font-body text-[15px] leading-relaxed text-ink italic">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex gap-3 items-center">
              <div className="size-10 rounded-full bg-gradient-to-br from-cyan to-purple shrink-0" />
              <div>
                <p className="font-body font-semibold text-sm text-ink">{t.authorName}</p>
                <p className="font-body text-xs text-muted">{t.authorTitle}</p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
