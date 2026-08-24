// src/components/admin/AdminLayout.tsx
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Briefcase, Layers, GraduationCap, FolderKanban, Users, FileText, Quote, Mail, Bell, Settings as SettingsIcon, LogOut, Images } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/services", label: "Services", icon: Briefcase },
  { to: "/admin/solutions", label: "Solutions", icon: Layers },
  { to: "/admin/courses", label: "Academy", icon: GraduationCap },
  { to: "/admin/projects", label: "Portfolio", icon: FolderKanban },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { to: "/admin/gallery", label: "Gallery", icon: Images },
  { to: "/admin/contact", label: "Inquiries", icon: Bell },
  { to: "/admin/newsletter", label: "Newsletter", icon: Mail },
  { to: "/admin/settings", label: "Settings", icon: SettingsIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-bg flex">
      <aside className="w-64 bg-white border-r border-border flex flex-col shrink-0">
        <div className="flex items-center gap-2 px-6 py-6 border-b border-border">
          <img src="/logo-icon.png" alt="Techive" className="h-8 w-8 object-contain" />
          <span className="font-heading font-extrabold text-lg text-ink">TECHIVE</span>
        </div>
        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-btn font-body text-sm font-medium transition-colors ${
                  isActive ? "bg-tag text-ink" : "text-muted hover:bg-tag hover:text-ink"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 m-4 rounded-btn font-body text-sm font-medium text-red-500 hover:bg-red-50"
        >
          <LogOut size={18} /> Log Out
        </button>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
