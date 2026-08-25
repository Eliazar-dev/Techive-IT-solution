// src/components/admin/AdminResourceList.tsx
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Upload as UploadIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { adminList, adminCreate, adminUpdate, adminDelete, adminUploadImage } from "../../lib/adminApi";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "select" | "image";
  options?: string[]; // for select
  required?: boolean;
}

interface Props {
  resource: string; // matches backend route, e.g. "services"
  title: string;
  columns: { key: string; label: string }[]; // what to show in the table
  fields: FieldConfig[]; // what to show in the create/edit form
  emptyItem: Record<string, any>;
}

export default function AdminResourceList({ resource, title, columns, fields, emptyItem }: Props) {
  const { token } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const load = () => {
    setLoading(true);
    adminList(resource, token)
      .then((res) => setItems(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [resource]);

  const openCreate = () => { setEditing({ ...emptyItem }); setShowForm(true); setError(""); };
  const openEdit = (item: any) => { setEditing({ ...item }); setShowForm(true); setError(""); };
  const closeForm = () => { setShowForm(false); setEditing(null); };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (editing.id) {
        await adminUpdate(resource, token, editing.id, editing);
      } else {
        await adminCreate(resource, token, editing);
      }
      closeForm();
      load();
    } catch (err: any) {
      setError(err.message || "Save failed.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    try {
      await adminDelete(resource, token, id);
      load();
    } catch (err: any) {
      setError(err.message || "Delete failed.");
    }
  };

  const handleImageUpload = async (field: string, file: File) => {
    setUploading(true);
    try {
      const res = await adminUploadImage(token, resource, file);
      setEditing((prev: any) => ({ ...prev, [field]: res.url }));
    } catch (err: any) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-heading font-extrabold text-2xl text-ink">{title}</h1>
        <button
          onClick={openCreate}
          className="bg-brand-gradient px-5 py-2.5 rounded-btn font-body font-semibold text-sm text-white flex items-center gap-2"
        >
          <Plus size={16} /> Add New
        </button>
      </div>

      {error && !showForm && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="bg-white border border-border rounded-card overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-tag border-b border-border">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="px-5 py-3 font-body font-semibold text-xs text-muted uppercase">{c.label}</th>
              ))}
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length + 1} className="px-5 py-8 text-center font-body text-sm text-muted">Loading…</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="px-5 py-8 text-center font-body text-sm text-muted">No items yet.</td></tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0">
                  {columns.map((c) => (
                    <td key={c.key} className="px-5 py-3 font-body text-sm text-ink">
                      {String(item[c.key] ?? "—").slice(0, 80)}
                    </td>
                  ))}
                  <td className="px-5 py-3 flex gap-2 justify-end">
                    <button onClick={() => openEdit(item)} className="p-2 rounded-btn hover:bg-tag"><Pencil size={16} /></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 rounded-btn hover:bg-red-50 text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSave} className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="font-heading font-bold text-xl text-ink">{editing.id ? "Edit" : "New"} {title.replace(/s$/, "")}</h2>
              <button type="button" onClick={closeForm}><X size={20} /></button>
            </div>
            {fields.map((f) => (
              <div key={f.name}>
                <label className="font-body text-sm text-ink block mb-2">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    required={f.required}
                    rows={3}
                    value={editing[f.name] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    className="w-full border border-border rounded-btn px-3 py-2.5 font-body text-sm outline-none focus:border-cyan resize-none"
                  />
                ) : f.type === "select" ? (
                  <select
                    required={f.required}
                    value={editing[f.name] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f.name]: e.target.value })}
                    className="w-full border border-border rounded-btn px-3 py-2.5 font-body text-sm outline-none focus:border-cyan"
                  >
                    <option value="">Select…</option>
                    {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : f.type === "image" ? (
                  <div className="flex items-center gap-3">
                    {editing[f.name] && <img src={editing[f.name]} alt="" className="size-14 rounded-btn object-cover border border-border" />}
                    <label className="flex items-center gap-2 border border-border rounded-btn px-3 py-2.5 font-body text-sm cursor-pointer hover:bg-tag">
                      <UploadIcon size={16} />
                      {uploading ? "Uploading…" : "Upload image"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleImageUpload(f.name, e.target.files[0])}
                      />
                    </label>
                  </div>
                ) : (
                  <input
                    required={f.required}
                    type={f.type === "number" ? "number" : "text"}
                    value={editing[f.name] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value })}
                    className="w-full border border-border rounded-btn px-3 py-2.5 font-body text-sm outline-none focus:border-cyan"
                  />
                )}
              </div>
            ))}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button type="submit" className="bg-brand-gradient rounded-btn py-3 font-body font-semibold text-sm text-white mt-2">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
