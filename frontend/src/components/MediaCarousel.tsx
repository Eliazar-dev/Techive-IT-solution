// src/components/MediaCarousel.tsx
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Code2 } from "lucide-react";
import type { GalleryItem } from "@techive/shared";
import { getGallery } from "../lib/api";

interface Props {
  className?: string;
  autoAdvanceMs?: number;
}

// Placeholder slides shown until real photos/videos are uploaded via the
// admin Gallery section — styled to match the brand rather than a blank box.
const placeholderSlides = [
  { caption: "Engineers pairing on a client build" },
  { caption: "Live sprint planning in progress" },
  { caption: "Shipping a new release" },
];

export default function MediaCarousel({ className = "", autoAdvanceMs = 5000 }: Props) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGallery()
      .then(setItems)
      .catch((err) => console.error("Failed to load gallery", err))
      .finally(() => setLoading(false));
  }, []);

  const slideCount = items.length > 0 ? items.length : placeholderSlides.length;
  const usingPlaceholders = items.length === 0 || items.every((i) => !i.url);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % slideCount), autoAdvanceMs);
    return () => clearInterval(interval);
  }, [slideCount, autoAdvanceMs]);

  const next = () => setIndex((i) => (i + 1) % slideCount);
  const prev = () => setIndex((i) => (i - 1 + slideCount) % slideCount);

  return (
    <div className={`relative rounded-2xl overflow-hidden shadow-hero group ${className}`}>
      <div className="relative w-full h-full">
        {usingPlaceholders
          ? placeholderSlides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate-900 via-ink to-slate-800 transition-opacity duration-700 ${
                  i === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-5">
                  <Code2 size={40} className="text-cyan" />
                </div>
                <p className="font-body text-sm text-white/70 px-6 text-center">{slide.caption}</p>
              </div>
            ))
          : items.map((item, i) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
              >
                {item.type === "video" ? (
                  <video src={item.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                ) : (
                  <img src={item.url} alt={item.caption || ""} className="w-full h-full object-cover" />
                )}
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="font-body text-sm text-white">{item.caption}</p>
                  </div>
                )}
              </div>
            ))}
      </div>

      {!loading && slideCount > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`size-2 rounded-full transition-all ${i === index ? "bg-white w-6" : "bg-white/40"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
