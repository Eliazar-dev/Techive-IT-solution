// src/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { createPortal } from "react-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/solutions", label: "Solutions" },
  { to: "/portfolio", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

const moreLinks = [
  { to: "/team", label: "Team" },
  { to: "/academy", label: "Academy" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  const openMenu = () => {
    setClosing(false);
    setMobileOpen(true);
    setMoreOpen(false);
  };

  const closeMenu = () => {
    setClosing(true);
    setTimeout(() => {
      setMobileOpen(false);
      setClosing(false);
    }, 500);
  };

  const handleLinkClick = () => {
    closeMenu();
    setMoreOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    if (mobileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const showMobileMenu = mobileOpen || closing;

  const mobileMenuContent = showMobileMenu ? (
    <div className="fixed inset-0 z-[9999]">
      <div
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-500 ${
          closing ? "opacity-0" : "opacity-100"
        }`}
        onClick={closeMenu}
      />
      <div
        ref={mobileRef}
        className={`absolute top-0 right-0 bottom-0 w-[300px] bg-white shadow-depth-lg flex flex-col transform transition-transform duration-500 ease-out ${
          closing ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <span className="font-heading font-extrabold text-lg text-ink">Menu</span>
          <button
            onClick={closeMenu}
            className="flex items-center justify-center size-10 text-ink hover:text-cyan transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-1 overflow-y-auto flex-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-btn font-body font-bold text-base transition-colors ${
                  isActive ? "text-cyan bg-tag" : "text-ink hover:bg-tag"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <div className="mt-2 pt-2 border-t border-border">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-btn font-body font-bold text-base text-ink hover:bg-tag transition-colors"
            >
              More
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>
            {moreOpen && (
              <div className="flex flex-col gap-1 mt-1 ml-2 border-l-2 border-border pl-3">
                {moreLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-btn font-body font-semibold text-base transition-colors ${
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

          <div className="mt-4 pt-4 border-t border-border">
            <Link
              to="/contact"
              onClick={handleLinkClick}
              className="block w-full bg-brand-gradient text-center px-7 py-3.5 rounded-btn font-body font-bold text-sm text-white shadow-depth-glow hover:shadow-depth-lg transition-all active:scale-95"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className="bg-white/90 backdrop-blur-md px-6 lg:px-20 py-4 sticky top-0 z-40 border-b border-border shadow-depth-sm">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={handleLinkClick}>
          <img src="/logo-icon.png" alt="Techive" className="h-9 w-9 object-contain" />
          <div className="flex flex-col leading-none">
            <span className="font-heading font-extrabold text-lg text-ink tracking-tight">TECHIVE</span>
            <span className="font-body font-bold text-[9px] text-muted tracking-[0.15em]">IT SOLUTIONS</span>
          </div>
        </Link>

        <nav className="hidden lg:flex font-body font-semibold gap-8 text-[15px] items-center absolute left-1/2 -translate-x-1/2">
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
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/contact"
            className="bg-brand-gradient flex items-center gap-2 px-5 py-2.5 rounded-btn font-body font-bold text-sm text-white shadow-depth-sm hover:shadow-depth-md transition-all active:scale-95"
          >
            Book a Consultation <ArrowRight size={15} />
          </Link>
          <button
            onClick={openMenu}
            aria-label="More menu"
            aria-expanded={mobileOpen}
            className="p-2.5 rounded-btn border border-border hover:bg-tag transition-colors"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <button
          onClick={openMenu}
          aria-label="Menu"
          aria-expanded={mobileOpen}
          className="lg:hidden p-2 rounded-btn border border-border text-ink hover:text-cyan transition-colors"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {typeof document !== "undefined" && createPortal(mobileMenuContent, document.body)}
    </div>
  );
}
