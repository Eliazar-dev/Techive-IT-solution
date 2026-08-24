// src/components/sections/AboutSection.tsx
import SectionHeader from "../SectionHeader";
import MediaCarousel from "../MediaCarousel";

const values = [
  { title: "Innovation", description: "Always archiving what's next and coding solutions for the future." },
  { title: "Integrity", description: "Delivering clear metrics and predictable timelines on every build." },
  { title: "Impact", description: "Our structures are engineered to create sustainable long-term value." },
  { title: "Inclusivity", description: "Fostering open-source, friendly environments in all sectors." },
];

export default function AboutSection() {
  return (
    <div className="bg-white px-6 lg:px-20 py-16 lg:py-24">
      <SectionHeader tag="Who We Are" title="Pioneering Digital Integration" />
      <div className="flex flex-col lg:flex-row gap-16 items-start max-w-[1280px] mx-auto">
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-ink leading-snug">
              A collective built on trust, innovation, and direct impact.
            </h3>
            <p className="font-body text-[15px] leading-relaxed text-muted">
              TECHIVE IT Solutions has established itself as a reliable architectural partner for ambitious teams. We eliminate structural silos and make continuous innovation simple.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {values.map((v) => (
              <div key={v.title} className="flex flex-col gap-2">
                <h4 className="font-heading font-bold text-lg text-ink">{v.title}</h4>
                <p className="font-body text-sm leading-relaxed text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
        <MediaCarousel className="w-full lg:w-[500px] h-[400px] shrink-0" />
      </div>
    </div>
  );
}
