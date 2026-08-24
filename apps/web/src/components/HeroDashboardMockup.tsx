// src/components/HeroDashboardMockup.tsx
import { useState, useEffect } from "react";
import { Home, BarChart3, Briefcase, Sparkles, Settings, Bell } from "lucide-react";

const sidebarIcons = [Home, BarChart3, Briefcase, Sparkles, Settings];

const stats = [
  { label: "Total Projects", value: "24", change: "+12%" },
  { label: "Active Users", value: "1,248", change: "+18%" },
  { label: "Revenue", value: "KES 2.4M", change: "+25%" },
  { label: "Success Rate", value: "98.6%", change: "+8%" },
];

// A short animated line-chart path, purely decorative — gives the
// mockup a sense of life without needing a real charting library here.
function MiniChart() {
  return (
    <svg viewBox="0 0 300 80" className="w-full h-20" preserveAspectRatio="none">
      <polyline
        points="0,55 30,45 60,50 90,25 120,35 150,15 180,30 210,20 240,10 270,25 300,15"
        fill="none"
        stroke="#06b6d4"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="0,65 30,60 60,68 90,50 120,55 150,45 180,52 210,48 240,40 270,50 300,42"
        fill="none"
        stroke="#a855f7"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HeroDashboardMockup() {
  const [activeIcon, setActiveIcon] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setActiveIcon((i) => (i + 1) % sidebarIcons.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full lg:w-[560px] shrink-0">
      <div className="bg-ink rounded-2xl shadow-hero overflow-hidden flex">
        {/* Sidebar */}
        <div className="bg-black/20 flex flex-col items-center gap-3 py-6 px-3">
          {sidebarIcons.map((Icon, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-btn transition-colors ${i === activeIcon ? "bg-brand-gradient" : "text-slate-500"}`}
            >
              <Icon size={16} className={i === activeIcon ? "text-white" : "text-slate-500"} />
            </div>
          ))}
        </div>

        {/* Main panel */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-heading font-bold text-sm text-white">AI-Powered Dashboard</p>
              <p className="font-body text-[11px] text-slate-400">Real insights. Smarter decisions.</p>
            </div>
            <div className="bg-brand-gradient rounded-full p-2">
              <Sparkles size={14} className="text-white" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/5 rounded-btn p-3">
                <p className="font-body text-[10px] text-slate-400 mb-1">{s.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-heading font-bold text-sm text-white">{s.value}</span>
                  <span className="font-body text-[10px] text-emerald-400">{s.change}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-btn p-3">
            <div className="flex gap-3 items-center mb-1">
              <span className="flex items-center gap-1 font-body text-[10px] text-cyan"><span className="size-1.5 rounded-full bg-cyan" /> Visitors</span>
              <span className="flex items-center gap-1 font-body text-[10px] text-purple"><span className="size-1.5 rounded-full bg-purple" /> Conversions</span>
            </div>
            <MiniChart />
          </div>

          <div className="bg-brand-gradient rounded-btn p-4 flex justify-between items-center">
            <div>
              <p className="font-heading font-bold text-xs text-white leading-snug">Empowering businesses<br />with intelligent technology.</p>
            </div>
            <div className="bg-white/20 rounded-full p-2">
              <Bell size={14} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-5">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`size-2 rounded-full ${i === 0 ? "bg-cyan w-6" : "bg-border"} transition-all`} />
        ))}
      </div>
    </div>
  );
}
