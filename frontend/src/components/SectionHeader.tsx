// src/components/SectionHeader.tsx
import TypewriterHeading from "./TypewriterHeading";

export default function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex flex-col gap-4 items-center text-center mb-14">
      <div className="flex gap-2 items-center">
        <span className="bg-brand-gradient rounded-full size-2" />
        <span className="font-body font-bold text-sm text-ink uppercase tracking-wide">{tag}</span>
      </div>
      <TypewriterHeading
        as="h2"
        text={title}
        className="font-heading font-extrabold text-3xl md:text-4xl text-ink leading-tight max-w-3xl"
      />
    </div>
  );
}
