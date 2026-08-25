// src/pages/admin/AdminOverview.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { adminDashboardStats } from "../../lib/adminApi";

export default function AdminOverview() {
  const { token } = useAuth();
  const [newCount, setNewCount] = useState(0);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminDashboardStats(token);
        setNewCount(res.data.length);
        setRecent(res.data.slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <div className="p-8">
      <h1 className="font-heading font-extrabold text-2xl text-ink mb-6">Overview</h1>

      <Link
        to="/admin/contact"
        className="bg-white border border-border rounded-card p-6 flex items-center gap-4 w-fit mb-8 hover:shadow-card transition-shadow"
      >
        <div className="bg-brand-gradient rounded-full flex items-center justify-center size-12 relative">
          <Bell size={20} className="text-white" />
          {newCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full size-5 flex items-center justify-center">
              {newCount}
            </span>
          )}
        </div>
        <div>
          <p className="font-heading font-bold text-lg text-ink">{newCount} new inquiries</p>
          <p className="font-body text-sm text-muted">Click to review</p>
        </div>
      </Link>

      <div className="bg-white border border-border rounded-card p-6">
        <h2 className="font-heading font-bold text-lg text-ink mb-4">Recent Submissions</h2>
        {recent.length === 0 ? (
          <p className="font-body text-sm text-muted">Nothing new right now.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recent.map((r) => (
              <div key={r.id} className="border-b border-border last:border-0 pb-3 last:pb-0">
                <p className="font-body font-semibold text-sm text-ink">{r.name} — {r.email}</p>
                <p className="font-body text-sm text-muted">{r.message.slice(0, 100)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
