// src/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const mainLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/team", label: "Team" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const moreLinks = [
  { to: "/solutions", label: "Solutions" },
  { to: "/academy", label: "Academy" },
  { to: "/about", label: "About Us" },
];

export default function Navbar() {
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-20 py-5 sticky top-0 z-40 border-b border-border shadow-depth-sm">
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-brand-gradient flex items-center justify-center rounded-[6px] size-8">
          <span className="font-heading font-extrabold text-base text-white">T</span>
        </div>
        <span className="font-heading font-extrabold text-xl text-ink">TECHIVE</span>
      </Link>

      <div className="hidden lg:flex font-body font-bold gap-6 text-sm items-center">
        {mainLinks.map((l) => (
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

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setMoreOpen((o) => !o)}
            className="flex items-center gap-1 text-ink hover:text-cyan transition-colors"
          >
            More <ChevronDown size={14} className={`transition-transform ${moreOpen ? "rotate-180" : ""}`} />
          </button>
          {moreOpen && (
            <div className="absolute top-full right-0 mt-3 bg-white border border-border rounded-card shadow-depth-md py-2 w-44">
              {moreLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setMoreOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 font-body font-semibold text-sm ${
                      isActive ? "text-cyan bg-tag" : "text-ink hover:bg-tag"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
