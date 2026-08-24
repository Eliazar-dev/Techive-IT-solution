// src/pages/admin/AdminSettings.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminList, adminUpdate } from "../../lib/adminApi";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export default function AdminSettings() {
  const { token } = useAuth();
  const [form, setForm] = useState<any>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  useEffect(() => {
    fetch(`${API_BASE}/admin/settings`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((res) => setForm(res.data || {}));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving");
    try {
      await fetch(`${API_BASE}/admin/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (!form) return <div className="p-8 font-body text-sm text-muted">Loading…</div>;

  const fields = [
    ["companyName", "Company Name"],
    ["companyEmail", "Company Email"],
    ["companyPhone", "Company Phone"],
    ["companyAddress", "Company Address"],
    ["twitterUrl", "Twitter URL"],
    ["linkedinUrl", "LinkedIn URL"],
    ["facebookUrl", "Facebook URL"],
    ["githubUrl", "GitHub URL"],
  ];

  return (
    <div className="p-8 max-w-xl">
      <h1 className="font-heading font-extrabold text-2xl text-ink mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-card p-8 flex flex-col gap-4">
        {fields.map(([key, label]) => (
          <div key={key}>
            <label className="font-body text-sm text-ink block mb-2">{label}</label>
            <input
              value={form[key] ?? ""}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full border border-border rounded-btn px-3 py-2.5 font-body text-sm outline-none focus:border-cyan"
            />
          </div>
        ))}
        <button type="submit" disabled={status === "saving"} className="bg-brand-gradient rounded-btn py-3 font-body font-semibold text-sm text-white mt-2">
          {status === "saving" ? "Saving…" : "Save Settings"}
        </button>
        {status === "done" && <p className="text-sm text-cyan">Saved.</p>}
        {status === "error" && <p className="text-sm text-red-500">Save failed.</p>}
      </form>
    </div>
  );
}
