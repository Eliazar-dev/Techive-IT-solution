// src/components/DashboardMockup.tsx
import { useState } from "react";

const slides = [
  {
    title: "AI-Powered Systems",
    subtitle: "Intelligent automation & insights",
    stats: [
      { label: "Projects", value: "47", change: "+12%" },
      { label: "Active Users", value: "1.2K", change: "+8%" },
      { label: "Revenue", value: "$84K", change: "+18%" },
    ],
    chartData: [40, 65, 45, 80, 55, 90, 70],
  },
  {
    title: "Web Applications",
    subtitle: "Scalable platforms & dashboards",
    stats: [
      { label: "Uptime", value: "99.9%", change: "+0.1%" },
      { label: "Requests", value: "2.4M", change: "+24%" },
      { label: "Latency", value: "45ms", change: "-12%" },
    ],
    chartData: [60, 45, 75, 50, 85, 40, 70],
  },
  {
    title: "Data Analytics",
    subtitle: "Real-time business intelligence",
    stats: [
      { label: "Datasets", value: "1.8K", change: "+32%" },
      { label: "Reports", value: "342", change: "+18%" },
      { label: "Accuracy", value: "99.2%", change: "+2%" },
    ],
    chartData: [30, 55, 70, 45, 85, 60, 75],
  },
  {
    title: "Mobile Applications",
    subtitle: "Cross-platform experiences",
    stats: [
      { label: "Installs", value: "85K", change: "+15%" },
      { label: "Rating", value: "4.9", change: "+0.2" },
      { label: "Retention", value: "72%", change: "+5%" },
    ],
    chartData: [50, 70, 55, 80, 65, 90, 60],
  },
];

export default function DashboardMockup() {
  const [index, setIndex] = useState(0);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const current = slides[index];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="relative w-full max-w-[560px] h-[320px] lg:h-[480px] shrink-0"
      onMouseMove={handleMouseMove}
    >
      <div className="relative w-full h-full bg-white rounded-2xl shadow-depth-lg border border-border overflow-hidden">
        <div className="flex h-full">
          <div className="w-16 bg-ink flex flex-col items-center py-4 gap-4">
            <div className="w-8 h-8 rounded-lg bg-brand-gradient flex items-center justify-center">
              <span className="text-white font-heading font-extrabold text-xs">T</span>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-md bg-white/10 cursor-pointer hover:bg-white/20 transition-colors"
                  onClick={() => setIndex(i - 1)}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 p-4 flex flex-col gap-4 relative">
            <div
              className="absolute w-4 h-4 rounded-full bg-cyan/30 pointer-events-none transition-all duration-100 ease-out z-10"
              style={{
                left: `${cursorPos.x}%`,
                top: `${cursorPos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-heading font-bold text-sm text-ink">{current.title}</h4>
                <p className="font-body text-xs text-muted">{current.subtitle}</p>
              </div>
              <div className="flex items-center gap-1 bg-cyan/10 text-cyan px-2 py-1 rounded-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
                <span className="font-body text-[10px] font-semibold uppercase tracking-wide">Live</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {current.stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`bg-tag rounded-xl p-3 flex flex-col gap-1 cursor-pointer transition-all duration-200 ${
                    hoveredStat === stat.label ? "ring-2 ring-cyan shadow-depth-sm scale-105" : ""
                  }`}
                  onMouseEnter={() => setHoveredStat(stat.label)}
                  onMouseLeave={() => setHoveredStat(null)}
                  onClick={() => alert(`${stat.label}: ${stat.value}\nChange: ${stat.change}`)}
                >
                  <span className="font-body text-[10px] text-muted font-medium uppercase tracking-wide">{stat.label}</span>
                  <span className="font-heading font-extrabold text-lg text-ink">{stat.value}</span>
                  <span className="font-body text-[10px] text-green-600 font-semibold">{stat.change}</span>
                </div>
              ))}
            </div>

            <div className="flex-1 bg-tag rounded-xl p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-body text-[10px] text-muted font-medium uppercase tracking-wide">Analytics Overview</span>
                <span className="font-body text-[10px] text-muted">Last 7 days</span>
              </div>
              <div className="flex items-end gap-1 h-16">
                {current.chartData.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-cyan to-purple opacity-80 cursor-pointer hover:opacity-100 transition-opacity"
                    style={{ height: `${h}%` }}
                    onClick={() => alert(`Day ${i + 1}: ${h}%`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`size-2 rounded-full transition-all ${i === index ? "bg-ink w-6" : "bg-ink/30 hover:bg-ink/50"}`}
          />
        ))}
      </div>
    </div>
  );
}
