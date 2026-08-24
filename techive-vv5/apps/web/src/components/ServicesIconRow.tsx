// src/components/ServicesIconRow.tsx
import { Code2, Smartphone, Sparkles, PieChart, CreditCard } from "lucide-react";

const items = [
  { label: "Web Development", description: "Fast, responsive & modern websites.", icon: Code2, tint: "text-cyan bg-cyan/10" },
  { label: "Mobile Apps", description: "Powerful apps for Android & iOS.", icon: Smartphone, tint: "text-purple bg-purple/10" },
  { label: "AI Solutions", description: "Intelligent systems that automate.", icon: Sparkles, tint: "text-cyan bg-cyan/10" },
  { label: "Data Analytics", description: "Turning data into actionable insights.", icon: PieChart, tint: "text-purple bg-purple/10" },
  { label: "Payment Integration", description: "Secure payment systems for global business.", icon: CreditCard, tint: "text-cyan bg-cyan/10" },
];

export default function ServicesIconRow() {
  return (
    <div className="px-6 lg:px-20 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-[1280px] mx-auto">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center gap-3">
            <div className={`rounded-full flex items-center justify-center size-14 ${item.tint}`}>
              <item.icon size={22} />
            </div>
            <div>
              <p className="font-heading font-bold text-sm text-ink">{item.label}</p>
              <p className="font-body text-xs text-muted leading-snug mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
