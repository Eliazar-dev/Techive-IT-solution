// src/pages/admin/AdminContact.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";
const statuses = ["new", "in_progress", "resolved", "closed"];

export default function AdminContact() {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch(`${API_BASE}/admin/contact${filter ? `?status=${filter}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id: number, status: string) => {
    await fetch(`${API_BASE}/admin/contact/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    load();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading font-extrabold text-2xl text-ink">Inquiries</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-border rounded-btn px-3 py-2 font-body text-sm"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {loading ? (
          <p className="font-body text-sm text-muted">Loading…</p>
        ) : items.length === 0 ? (
          <p className="font-body text-sm text-muted">No submissions.</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="bg-white border border-border rounded-card p-6 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-body font-semibold text-ink">{item.name} — {item.email}</p>
                  {item.phone && <p className="font-body text-xs text-muted">{item.phone}</p>}
                </div>
                <select
                  value={item.status}
                  onChange={(e) => updateStatus(item.id, e.target.value)}
                  className="border border-border rounded-pill px-3 py-1.5 font-body text-xs"
                >
                  {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <p className="font-body text-sm text-ink">{item.message}</p>
              <p className="font-body text-xs text-muted">{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
