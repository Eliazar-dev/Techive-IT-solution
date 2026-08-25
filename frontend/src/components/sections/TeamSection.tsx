// src/components/sections/TeamSection.tsx
import { useEffect, useState } from "react";
import type { TeamMember } from "@techive/shared";
import { getTeam } from "../../lib/api";
import SectionHeader from "../SectionHeader";
import TiltCard from "../TiltCard";

const fallback: Partial<TeamMember>[] = [
  { name: "Amara Okoye", role: "Founder & Lead Engineer" },
  { name: "David Mwangi", role: "Head of AI Systems" },
  { name: "Grace Wanjiru", role: "Lead Product Designer" },
];

export default function TeamSection({ limit }: { limit?: number }) {
  const [items, setItems] = useState<TeamMember[] | Partial<TeamMember>[]>(fallback);

  useEffect(() => {
    getTeam()
      .then((data) => data.length && setItems(data))
      .catch((err) => console.error("Failed to load team", err));
  }, []);

  const members = limit ? items.slice(0, limit) : items;

  return (
    <div className="bg-white px-6 lg:px-20 py-16 lg:py-24">
      <SectionHeader tag="The People Behind It" title="Meet The TECHIVE Team" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
        {members.map((m, i) => (
          <TiltCard
            key={m.id ?? i}
            intensity={6}
            className="bg-white border border-border rounded-card shadow-depth-sm hover:shadow-depth-md p-6 flex flex-col items-center text-center gap-4"
          >
            {m.photoUrl ? (
              <img src={m.photoUrl} alt={m.name} className="size-24 rounded-full object-cover" />
            ) : (
              <div className="size-24 rounded-full bg-gradient-to-br from-cyan to-purple" />
            )}
            <div>
              <h3 className="font-heading font-bold text-lg text-ink">{m.name}</h3>
              <p className="font-body text-sm text-muted">{m.role}</p>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
}
