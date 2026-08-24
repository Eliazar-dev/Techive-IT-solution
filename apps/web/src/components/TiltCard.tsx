// src/components/TiltCard.tsx
import { useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // max rotation degrees
}

// Pure CSS/JS 3D tilt on mouse move — no library needed. Gives cards a
// tangible "physical" depth feel that reads as professional/premium
// rather than flat, without any WebGL cost.
export default function TiltCard({ children, className = "", intensity = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(1000px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.05s linear",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d", ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
