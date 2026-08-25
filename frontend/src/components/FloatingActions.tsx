// src/components/FloatingActions.tsx
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 left-6 z-30 flex flex-col gap-3 pointer-events-none">
      <a
        href="tel:+254701422720"
        aria-label="Call us"
        className="pointer-events-auto bg-brand-gradient rounded-full p-4 shadow-depth-lg flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Phone size={20} className="text-white" />
      </a>
      <a
        href="https://wa.me/254701422720"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto bg-emerald-500 rounded-full pl-4 pr-5 py-3.5 shadow-depth-lg flex items-center gap-2 hover:scale-105 transition-transform"
      >
        <span className="relative">
          <MessageCircle size={18} className="text-white" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-white border border-emerald-500" />
        </span>
        <span className="font-body font-bold text-sm text-white">Let's Chat</span>
      </a>
    </div>
  );
}
