// src/components/Navbar.tsx
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/portfolio", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

// Not in the main bar, reachable via the hamburger menu
const moreLinks = [
  { to: "/team", label: "Team" },
  { to: "/academy", label: "Academy" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-border shadow-depth-sm">
      <div className="flex items-center justify-between px-6 lg:px-20 py-3.5">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="/logo-icon.png" alt="Techive" className="h-9 w-9 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-heading font-extrabold text-lg text-ink tracking-tight">TECHIVE</span>
            <span className="font-body font-bold text-[9px] text-muted tracking-[0.15em]">IT SOLUTIONS</span>
          </div>
        </Link>

        <div className="hidden lg:flex font-body font-bold gap-6 text-sm items-center">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? "text-cyan" : "text-ink hover:text-cyan transition-colors"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="bg-brand-gradient flex items-center gap-2 px-5 py-2.5 rounded-btn font-body font-bold text-sm text-white shadow-depth-sm hover:shadow-depth-md transition-shadow"
          >
            Book a Consultation <ArrowRight size={15} />
          </Link>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="More menu"
            className="p-2.5 rounded-btn border border-border hover:bg-tag transition-colors"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Menu"
          className="lg:hidden p-2 rounded-btn border border-border"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-border bg-white px-6 lg:px-20 py-4 flex flex-col gap-1">
          <div className="lg:hidden flex flex-col gap-1 mb-2 pb-2 border-b border-border">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2 font-body font-bold text-sm ${isActive ? "text-cyan" : "text-ink"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
          {moreLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `py-2 font-body font-bold text-sm ${isActive ? "text-cyan" : "text-ink hover:text-cyan"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="md:hidden bg-brand-gradient text-center mt-2 px-5 py-3 rounded-btn font-body font-bold text-sm text-white"
          >
            Book a Consultation
          </Link>
        </div>
      )}
    </div>
  );
}
