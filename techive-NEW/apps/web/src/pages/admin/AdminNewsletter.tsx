// src/pages/admin/AdminNewsletter.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminList } from "../../lib/adminApi";

export default function AdminNewsletter() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminList("newsletter", token)
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-8">
      <h1 className="font-heading font-extrabold text-2xl text-ink mb-6">Newsletter Subscribers</h1>
      <div className="bg-white border border-border rounded-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-tag border-b border-border">
            <tr>
              <th className="px-5 py-3 font-body font-semibold text-xs text-muted uppercase">Email</th>
              <th className="px-5 py-3 font-body font-semibold text-xs text-muted uppercase">Subscribed</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={2} className="px-5 py-8 text-center font-body text-sm text-muted">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={2} className="px-5 py-8 text-center font-body text-sm text-muted">No subscribers yet.</td></tr>
            ) : (
              items.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-body text-sm text-ink">{s.email}</td>
                  <td className="px-5 py-3 font-body text-sm text-muted">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
