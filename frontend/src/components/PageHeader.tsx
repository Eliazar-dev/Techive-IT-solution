// src/components/PageHeader.tsx
import GradientOrbs from "./GradientOrbs";
import TypewriterHeading from "./TypewriterHeading";

interface Props {
  tag: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ tag, title, subtitle }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-ink to-slate-900 px-6 lg:px-20 py-20 overflow-hidden">
      <GradientOrbs />
      <div className="relative flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
        <span className="bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-pill font-body font-bold text-xs text-cyan uppercase">
          {tag}
        </span>
        <TypewriterHeading
          as="h1"
          text={title}
          className="font-heading font-extrabold text-3xl md:text-4xl text-white"
        />
        {subtitle && <p className="font-body text-[15px] text-slate-300 leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}
