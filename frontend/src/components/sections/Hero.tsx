// src/components/sections/Hero.tsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import GradientOrbs from "../GradientOrbs";
import HeroDashboardMockup from "../HeroDashboardMockup";
import TypewriterHeading from "../TypewriterHeading";
import TrustedByStrip from "../TrustedByStrip";

export default function Hero() {
  return (
    <>
      <div className="relative bg-bg flex flex-col lg:flex-row gap-8 items-center px-6 lg:px-20 py-16 lg:py-20 overflow-hidden">
        <GradientOrbs />
        <div className="relative flex-1 flex flex-col gap-8 items-start">
          <div className="flex gap-2 items-center">
            <span className="bg-tag border border-border px-3.5 py-1.5 rounded-pill font-body font-bold text-xs text-purple uppercase">
              Archiving Innovation
            </span>
            <span className="font-body font-semibold text-xs text-muted">• Coding The Future</span>
          </div>
          <TypewriterHeading
            as="h1"
            text="Transforming Ideas Into Intelligent Digital Solutions."
            speedMs={28}
            className="font-heading font-extrabold text-4xl md:text-5xl lg:text-[54px] leading-[1.15] text-ink"
          />
          <p className="font-body text-lg leading-relaxed text-muted max-w-xl">
            We build websites, applications, AI-powered systems and data solutions that help businesses build, automate and grow.
          </p>
          <div className="flex gap-4">
            <Link to="/contact" className="bg-brand-gradient flex items-center gap-2 px-7 py-3.5 rounded-btn font-body font-bold text-sm text-white shadow-depth-glow hover:shadow-depth-lg transition-shadow">
              Book a Consultation <ArrowRight size={16} />
            </Link>
            <Link to="/portfolio" className="bg-white border border-border flex items-center gap-2 px-6 py-3.5 rounded-btn font-body font-bold text-sm text-ink shadow-depth-sm hover:shadow-depth-md transition-shadow">
              View Our Work <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="relative">
          <HeroDashboardMockup />
        </div>
      </div>
      <TrustedByStrip />
    </>
  );
}
