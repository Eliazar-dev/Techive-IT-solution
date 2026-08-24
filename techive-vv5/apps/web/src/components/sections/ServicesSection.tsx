// src/components/sections/ServicesSection.tsx
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import type { Service } from "@techive/shared";
import { getServices } from "../../lib/api";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";

const fallback: Partial<Service>[] = [
  { title: "Custom Software", icon: "terminal", description: "Engineered web and mobile platforms built to fit your precise workflows." },
  { title: "AI & Machine Learning", icon: "cpu", description: "Automate manual decisions and build natural pipelines using custom models." },
  { title: "Data & Intelligence", icon: "bar-chart", description: "Turn raw datasets into intuitive, beautiful executive dashboard interfaces." },
];

function iconFor(name: string) {
  const key = name
    .split("-")
    .map((s, i) => (i === 0 ? s : s[0].toUpperCase() + s.slice(1)))
    .join("");
  const Icon = (Icons as any)[key[0].toUpperCase() + key.slice(1)] || Icons.Terminal;
  return Icon;
}

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
      <SectionHeader tag="What We Do" title="Services Built For Growth" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
        {items.map((s, i) => {
          const Icon = iconFor(s.icon || "terminal");
          return (
            <TiltCard
              key={s.id ?? i}
              className={`bg-white border border-border rounded-card shadow-depth-sm hover:shadow-depth-md p-8 flex flex-col gap-5 ${loading ? "animate-pulse" : ""}`}
            >
              <div className="bg-bg border border-border rounded-btn flex items-center justify-center size-11">
                <Icon size={20} className="text-ink" />
              </div>
              <div className="flex flex-col gap-2.5">
                <h3 className="font-heading font-bold text-xl text-ink">{s.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted">{s.description}</p>
              </div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
