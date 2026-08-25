// src/components/TypewriterHeading.tsx
import { useEffect, useState, useRef } from "react";

interface Props {
  text: string; // plain text version, used for the typing animation
  as?: "h1" | "h2" | "h3";
  className?: string;
  speedMs?: number; // per character
  startDelayMs?: number;
}

// Lightweight typewriter effect — plays once when the heading scrolls
// into view. Deliberately built without a library (Typed.js etc.) to
// avoid extra bundle weight for something this simple.
export default function TypewriterHeading({
  text,
  as = "h2",
  className = "",
  speedMs = 35,
  startDelayMs = 0,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speedMs);
    }, startDelayMs);
    return () => clearTimeout(startTimeout);
  }, [started, text, speedMs, startDelayMs]);

  const Tag = as;

  return (
    <Tag ref={ref as any} className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[0.9em] bg-current ml-0.5 animate-pulse align-middle" />
      )}
      {/* Reserve layout space so the page doesn't jump as text types in */}
      {displayed.length === 0 && <span className="invisible">{text}</span>}
    </Tag>
  );
}
