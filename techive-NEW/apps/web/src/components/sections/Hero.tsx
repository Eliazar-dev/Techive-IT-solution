// src/components/sections/Hero.tsx
import { Link } from "react-router-dom";
import GradientOrbs from "../GradientOrbs";
import MediaCarousel from "../MediaCarousel";
import TypewriterHeading from "../TypewriterHeading";

export default function Hero() {
  return (
    <div className="relative bg-bg flex flex-col lg:flex-row gap-8 items-center px-6 lg:px-20 py-16 lg:py-24 overflow-hidden">
      <GradientOrbs />
      <div className="relative flex-1 flex flex-col gap-8 items-start">
        <div className="flex gap-2 items-center">
          <span className="bg-tag border border-border px-3.5 py-1.5 rounded-pill font-body font-bold text-xs text-purple uppercase">
            Innovation Archived
          </span>
          <span className="font-body font-semibold text-xs text-muted">• Coding the Future</span>
        </div>
        <TypewriterHeading
          as="h1"
          text="Transforming Ideas into Intelligent Digital Solutions"
          speedMs={28}
          className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[54px] leading-[1.15] text-ink"
        />
        <p className="font-body text-lg leading-relaxed text-muted max-w-xl">
          From websites and applications to AI-powered systems and data analytics, TECHIVE IT Solutions helps businesses build, automate, and grow.
        </p>
        <div className="flex gap-4">
          <Link to="/contact" className="bg-brand-gradient px-7 py-3.5 rounded-btn font-body font-bold text-sm text-white shadow-depth-glow hover:shadow-depth-lg transition-shadow">
            Book a Consultation
          </Link>
          <Link to="/contact" className="bg-white border border-border px-6 py-3.5 rounded-btn font-body font-bold text-sm text-ink shadow-depth-sm hover:shadow-depth-md transition-shadow">
            Get a Quote
          </Link>
        </div>
      </div>
      <div className="relative w-full lg:w-[560px] h-[320px] lg:h-[480px] shrink-0">
        <MediaCarousel className="w-full h-full" />
      </div>
    </div>
  );
}
