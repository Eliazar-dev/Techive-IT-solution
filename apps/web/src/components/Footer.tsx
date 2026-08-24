// src/components/Footer.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Facebook, Github, SendHorizontal } from "lucide-react";
import { subscribeNewsletter } from "../lib/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      await subscribeNewsletter(email);
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="bg-ink text-white">
      <div className="max-w-[1440px] mx-auto px-20 py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo-icon.png" alt="Techive" className="h-8 w-8 object-contain" />
            <span className="font-heading font-extrabold text-lg">TECHIVE</span>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Archiving Innovation. Coding the Future. Our specialized systems are deployed at enterprise scale.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-slate-400 font-semibold">
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link to="/academy" className="hover:text-white">Academy</Link></li>
            <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-4">Services</h4>
          <ul className="space-y-3 text-sm text-slate-400 font-semibold">
            <li><Link to="/services" className="hover:text-white">Custom Build</Link></li>
            <li><Link to="/services" className="hover:text-white">Machine Learning</Link></li>
            <li><Link to="/services" className="hover:text-white">DevOps Systems</Link></li>
            <li><Link to="/services" className="hover:text-white">UI/UX Consult</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-bold mb-4">Stay In Touch</h4>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              placeholder="your-email@here.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 rounded-l-btn px-3 py-3 text-sm flex-1 placeholder:text-slate-500 outline-none"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="bg-brand-gradient rounded-r-btn px-4 flex items-center justify-center"
            >
              <SendHorizontal size={16} />
            </button>
          </form>
          {status === "done" && <p className="text-xs text-cyan mt-2">Subscribed — thank you!</p>}
          {status === "error" && <p className="text-xs text-red-400 mt-2">Something went wrong, try again.</p>}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-20 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} TECHIVE IT Solutions. All structural rights archived.</p>
          <div className="flex gap-4">
            <a href="#" aria-label="Twitter" className="hover:text-white"><Twitter size={18} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><Linkedin size={18} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-white"><Facebook size={18} /></a>
            <a href="#" aria-label="GitHub" className="hover:text-white"><Github size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
