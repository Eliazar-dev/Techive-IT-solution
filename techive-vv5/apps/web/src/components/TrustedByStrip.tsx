// src/components/TrustedByStrip.tsx
import { Boxes, ShieldCheck, Hexagon, CircuitBoard } from "lucide-react";

// Placeholder client marks — swap for real client logos once available
// (e.g. through the Gallery/Settings admin once a "clients" resource exists).
const clients = [
  { name: "OpenSky Connect", icon: Boxes },
  { name: "UnitSmart AI Hub", icon: Hexagon },
  { name: "GladTidings Health", icon: ShieldCheck },
  { name: "CAAS Solutions", icon: CircuitBoard },
];

export default function TrustedByStrip() {
  return (
    <div className="px-6 lg:px-20 py-10 flex flex-col items-center gap-6">
      <p className="font-body font-bold text-xs text-muted uppercase tracking-wider">Trusted By Growing Businesses</p>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 opacity-60">
        {clients.map((c) => (
          <div key={c.name} className="flex items-center gap-2">
            <c.icon size={20} className="text-ink" />
            <span className="font-heading font-bold text-sm text-ink">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
