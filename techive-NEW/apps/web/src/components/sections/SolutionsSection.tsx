// src/components/sections/SolutionsSection.tsx
import { useEffect, useState } from "react";
import type { Solution } from "@techive/shared";
import { getSolutions } from "../../lib/api";
import SectionHeader from "../SectionHeader";

const fallback: Partial<Solution>[] = [
  { title: "Healthcare Tech", tag: "Industry Native", description: "HIPAA-compliant platforms bridging administrative data, telemetry streams, and modern patient portals securely." },
  { title: "FinTech Systems", tag: "Industry Native", description: "Robust ledger tooling and smart banking APIs engineered with high throughput, fraud detection, and safety." },
  { title: "EdTech Platforms", tag: "Industry Native", description: "Scalable virtual learning spaces designed with interactive progression tracks and dynamic course managers." },
];

export default function SolutionsSection({ limit }: { limit?: number }) {
  const [solutions, setSolutions] = useState<Solution[] | Partial<Solution>[]>(fallback);

  useEffect(() => {
    getSolutions()
      .then((data) => data.length && setSolutions(data))
      .catch((err) => console.error("Failed to load solutions", err));
  }, []);

  const items = limit ? solutions.slice(0, limit) : solutions;

  return (
    <div className="bg-tag px-6 lg:px-20 py-16 lg:py-24">
      <SectionHeader tag="Solutions That Scale" title="Tailored Infrastructure for Every Core Sector" />
      <div className="flex flex-col gap-6 max-w-[1280px] mx-auto">
        {items.map((s, i) => (
          <div
            key={s.id ?? i}
            className="bg-bg border border-border rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="flex-1 flex flex-col gap-4">
              <span className="bg-tag border border-border px-3.5 py-1.5 rounded-pill font-body font-semibold text-xs text-purple uppercase w-fit">
                {s.tag}
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-ink">{s.title}</h3>
              <p className="font-body text-[15px] leading-relaxed text-muted">{s.description}</p>
            </div>
            <div className="w-full md:w-60 h-40 rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
