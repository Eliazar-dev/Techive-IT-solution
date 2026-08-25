// src/components/sections/PortfolioSection.tsx
import { useEffect, useState } from "react";
import type { Project } from "@techive/shared";
import { getProjects } from "../../lib/api";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";

const fallback: Partial<Project>[] = [
  {
    title: "ScribeAI Health",
    category: "Healthcare AI",
    summary: "AI-assisted clinical documentation platform reducing charting time by 60%.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },
  {
    title: "Apex Ledger",
    category: "FinTech API",
    summary: "High-throughput ledger system with real-time fraud detection.",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
  {
    title: "Nova Learn",
    category: "EdTech Platform",
    summary: "Interactive learning platform with adaptive progression tracking.",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&h=400&fit=crop",
  },
];

export default function PortfolioSection({ limit }: { limit?: number }) {
  const [projects, setProjects] = useState<Project[] | Partial<Project>[]>(fallback);

  useEffect(() => {
    getProjects()
      .then((data) => data.length && setProjects(data))
      .catch((err) => console.error("Failed to load projects", err));
  }, []);

  const items = limit ? projects.slice(0, limit) : projects;

  return (
    <div className="bg-white px-6 lg:px-20 py-16 lg:py-24">
      <SectionHeader tag="Selected Work" title="Enterprise-Grade Solutions, Delivered." />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
        {items.map((p, i) => (
          <TiltCard key={p.id ?? i} intensity={6} className="border border-border rounded-card overflow-hidden shadow-depth-sm hover:shadow-depth-lg hover:-translate-y-1 transition-all">
            <div className="h-[220px] w-full overflow-hidden">
              <img
                src={p.imageUrl || fallback[i]?.imageUrl || ""}
                alt={p.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="p-5 flex flex-col gap-3">
              <span className="bg-tag border border-border px-3.5 py-1.5 rounded-pill font-body font-semibold text-xs text-purple w-fit">
                {p.category}
              </span>
              <h3 className="font-heading font-bold text-xl text-ink">{p.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted line-clamp-2">{p.summary}</p>
              <span className="font-body font-semibold text-sm text-cyan mt-1">Read Case Study →</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
