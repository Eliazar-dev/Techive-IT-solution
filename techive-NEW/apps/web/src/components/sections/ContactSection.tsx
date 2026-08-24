// src/components/sections/ContactSection.tsx
import { useState } from "react";
import { Twitter, Linkedin, Facebook, Github, MapPin, Mail } from "lucide-react";
import { submitContact } from "../../lib/api";
import GradientOrbs from "../GradientOrbs";
import SectionHeader from "../SectionHeader";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      await submitContact(form);
      setStatus("done");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative bg-bg px-6 lg:px-20 py-16 lg:py-24 overflow-hidden">
      <GradientOrbs variant="reverse" />
      <div className="relative max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-16">
        <div className="flex-1 flex flex-col gap-10">
          <div>
            <div className="flex gap-2 items-center mb-4">
              <span className="bg-brand-gradient rounded-full size-2" />
              <span className="font-body font-bold text-sm text-ink uppercase tracking-wide">Let's Build Together</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-ink mb-4">Begin Your Innovation Integration</h2>
            <p className="font-body text-[15px] leading-relaxed text-muted">
              Schedule a session with our senior architects to get a precise quote, detailed milestones, and a clear architectural overview.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 font-body text-sm text-ink"><MapPin size={16} /> 100 Innovation Parkway, Suite 400</span>
            <span className="flex items-center gap-2 font-body text-sm text-ink"><Mail size={16} /> hello@techive.co.ke</span>
          </div>
          <div className="flex gap-3">
            {[Twitter, Linkedin, Facebook, Github].map((Icon, i) => (
              <a key={i} href="#" className="bg-white border border-border rounded-full flex items-center justify-center size-10 hover:bg-tag">
                <Icon size={18} className="text-ink" />
              </a>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 bg-white border border-border rounded-2xl shadow-depth-md p-10 flex flex-col gap-5 max-w-[480px]">
          <div>
            <label className="font-body text-sm text-ink block mb-2">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-border rounded-btn px-3 py-3 font-body text-sm outline-none focus:border-cyan"
              placeholder="Elena Rostova"
            />
          </div>
          <div>
            <label className="font-body text-sm text-ink block mb-2">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-border rounded-btn px-3 py-3 font-body text-sm outline-none focus:border-cyan"
              placeholder="elena@example.com"
            />
          </div>
          <div>
            <label className="font-body text-sm text-ink block mb-2">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-border rounded-btn px-3 py-3 font-body text-sm outline-none focus:border-cyan"
              placeholder="+254 700 000 000"
            />
          </div>
          <div>
            <label className="font-body text-sm text-ink block mb-2">Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-border rounded-btn px-3 py-3 font-body text-sm outline-none focus:border-cyan resize-none"
              placeholder="Describe your structural software needs..."
            />
          </div>
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-brand-gradient rounded-btn py-3.5 font-body font-semibold text-sm text-white disabled:opacity-60"
          >
            {status === "sending" ? "Submitting..." : "Submit Inquiry"}
          </button>
          {status === "done" && <p className="text-sm text-cyan text-center">Thanks — we'll be in touch shortly.</p>}
          {status === "error" && <p className="text-sm text-red-500 text-center">{errorMsg}</p>}
        </form>
      </div>
    </div>
  );
}
