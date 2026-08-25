// src/components/sections/AboutSection.tsx
import SectionHeader from "../SectionHeader";
import MediaCarousel from "../MediaCarousel";

const values = [
  { title: "Precision Engineering", description: "Every system we build is architected for reliability, scalability, and long-term maintainability." },
  { title: "Relentless Innovation", description: "We archive what's next — integrating cutting-edge AI, cloud, and data architectures into every engagement." },
  { title: "Measurable Impact", description: "Our engagements are designed to deliver predictable timelines, clear metrics, and sustainable business value." },
  { title: "Inclusive Excellence", description: "We foster collaborative, transparent partnerships that elevate teams and democratize access to advanced technology." },
];

export default function AboutSection() {
  return (
    <div className="bg-white px-6 lg:px-20 py-16 lg:py-24">
      <SectionHeader tag="About Us" title="Architects of Scalable Digital Infrastructure" />
      <div className="flex flex-col lg:flex-row gap-16 items-start max-w-[1280px] mx-auto">
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-ink leading-snug">
              A collective of senior engineers and strategists building the infrastructure of tomorrow.
            </h3>
            <p className="font-body text-[15px] leading-relaxed text-muted">
              TECHIVE IT Solutions partners with ambitious organizations to eliminate technical debt, modernize legacy systems, and deliver resilient platforms at enterprise scale. From HIPAA-compliant health tech to high-throughput fintech ledgers, our work is defined by precision, accountability, and measurable outcomes.
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
        <div className="w-full lg:w-[500px] h-[400px] shrink-0 rounded-2xl overflow-hidden shadow-depth-md">
          <img
            src="https://res.cloudinary.com/wgxqiqmi/image/upload/v1787603460/ChatGPT_Image_Aug_24_2026_11_30_31_PM.png"
            alt="TECHIVE Office"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
