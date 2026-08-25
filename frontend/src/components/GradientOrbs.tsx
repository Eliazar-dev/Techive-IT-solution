// src/components/GradientOrbs.tsx
// Soft blurred gradient shapes floating behind content — cheap way to
// add atmospheric depth to a section without any 3D rendering cost.
export default function GradientOrbs({ variant = "default" }: { variant?: "default" | "reverse" }) {
  const positions =
    variant === "reverse"
      ? ["top-10 right-10", "bottom-0 left-0"]
      : ["top-0 left-10", "bottom-10 right-0"];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute ${positions[0]} w-[400px] h-[400px] rounded-full bg-cyan/10 blur-[100px] animate-float-slow`} />
      <div className={`absolute ${positions[1]} w-[350px] h-[350px] rounded-full bg-purple/10 blur-[100px] animate-float-slower`} />
    </div>
  );
}
