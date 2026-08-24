// src/components/sections/TrustSection.tsx
const clients = [
  "ScribeAI Health",
  "Apex Ledger",
  "Nova Learn",
  "FinCore",
  "MediSync",
  "EduVista",
];

export default function TrustSection() {
  return (
    <div className="bg-white border-y border-border px-6 lg:px-20 py-10">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-6">
        <p className="font-body text-xs text-muted font-semibold uppercase tracking-widest">Trusted by growing businesses</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-60">
          {clients.map((client) => (
            <span key={client} className="font-heading font-bold text-sm text-ink whitespace-nowrap">
              {client}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
