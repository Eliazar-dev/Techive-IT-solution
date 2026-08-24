// src/components/sections/PortfolioSection.tsx
import { useEffect, useState } from "react";
import type { Project } from "@techive/shared";
import { getProjects } from "../../lib/api";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";

const fallback: Partial<Project>[] = [
  { title: "ScribeAI Health", category: "Healthcare AI" },
  { title: "Apex Ledger", category: "FinTech API" },
  { title: "Nova Learn", category: "EdTech Platform" },
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
      <SectionHeader tag="Our Work Speaks" title="Proven Projects Executed at Scale" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
        {items.map((p, i) => (
          <TiltCard key={p.id ?? i} intensity={6} className="border border-border rounded-card overflow-hidden shadow-depth-sm hover:shadow-depth-lg">
            <div className="h-[220px] bg-gradient-to-br from-slate-700 to-ink" />
            <div className="p-5 flex flex-col gap-3">
              <span className="bg-tag border border-border px-3.5 py-1.5 rounded-pill font-body font-semibold text-xs text-purple w-fit">
                {p.category}
              </span>
              <h3 className="font-heading font-bold text-xl text-ink">{p.title}</h3>
              <span className="font-body font-semibold text-sm text-cyan">Read Case Study →</span>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
