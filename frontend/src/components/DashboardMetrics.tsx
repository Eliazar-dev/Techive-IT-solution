// src/components/DashboardMetrics.tsx
import { Briefcase, Users, Clock, TrendingUp, Star } from "lucide-react";

const metrics = [
  { label: "Total Projects Completed", value: "47", icon: Briefcase, color: "from-cyan to-purple" },
  { label: "Customer Satisfaction", value: "98%", icon: Star, color: "from-purple to-pink" },
  { label: "Active Clients", value: "23", icon: Users, color: "from-cyan to-blue" },
  { label: "Avg Turnaround", value: "3.2d", icon: Clock, color: "from-purple to-cyan" },
  { label: "Revenue Growth", value: "+18%", icon: TrendingUp, color: "from-cyan to-purple" },
];

export default function DashboardMetrics() {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 shadow-depth-md">
      <h3 className="font-heading font-bold text-lg text-ink mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="flex flex-col gap-2 p-4 rounded-xl bg-tag hover:shadow-depth-sm transition-shadow">
            <div className={`bg-brand-gradient rounded-full flex items-center justify-center size-10`}>
              <m.icon size={18} className="text-white" />
            </div>
            <p className="font-heading font-extrabold text-2xl text-ink">{m.value}</p>
            <p className="font-body text-xs text-muted font-medium">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
