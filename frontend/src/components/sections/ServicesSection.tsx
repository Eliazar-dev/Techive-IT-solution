// src/components/sections/ServicesSection.tsx
import { useEffect, useState } from "react";
import type { Service } from "@techive/shared";
import { getServices } from "../../lib/api";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";

const fallback: Partial<Service>[] = [
  {
    title: "Web Development",
    description: "High-performance websites and web platforms built with modern frameworks.",
    imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
  },
  {
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps designed for scale.",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    title: "AI Solutions",
    description: "Custom AI models and automation pipelines for real business problems.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    title: "Data Analytics",
    description: "Turn raw data into actionable insights with beautiful dashboards.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  },
  {
    title: "Payment Integration",
    description: "Secure, compliant payment systems for local and global markets.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
  },
];

export default function ServicesSection({ limit }: { limit?: number }) {
  const [services, setServices] = useState<Service[] | Partial<Service>[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then((data) => data.length && setServices(data))
      .catch((err) => console.error("Failed to load services", err))
      .finally(() => setLoading(false));
  }, []);

  const items = limit ? services.slice(0, limit) : services;

  return (
    <div className="bg-white px-6 lg:px-20 py-16 lg:py-24">
      <SectionHeader tag="What We Do" title="End-to-end digital solutions for modern businesses." />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-[1280px] mx-auto">
        {items.map((s, i) => (
          <TiltCard
            key={s.id ?? i}
            className={`bg-white border border-border rounded-card shadow-depth-sm hover:shadow-depth-md hover:-translate-y-1 transition-all overflow-hidden ${loading ? "animate-pulse" : ""}`}
          >
            <div className="h-[140px] w-full overflow-hidden">
              <img
                src={s.imageUrl || fallback[i]?.imageUrl || ""}
                alt={s.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <h3 className="font-heading font-bold text-base text-ink leading-snug">{s.title}</h3>
              <p className="font-body text-xs leading-relaxed text-muted">{s.description}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
