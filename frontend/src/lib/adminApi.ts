// src/lib/adminApi.ts
const RAW_API_BASE = import.meta.env.VITE_API_BASE || "";
const API_BASE = RAW_API_BASE ? `${RAW_API_BASE.replace(/\/+$/, "")}/api` : "/api";

function authHeaders(token: string | null) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handle(res: Response) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const adminLogin = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE}/admin/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handle(res);
};

// Generic CRUD for any admin resource — used by every AdminResourceList page.
// `resource` matches the mounted route, e.g. "services", "courses", "team".
export const adminList = async (resource: string, token: string | null) =>
  handle(await fetch(`${API_BASE}/admin/${resource}`, { headers: authHeaders(token) }));

export const adminCreate = async (resource: string, token: string | null, data: any) =>
  handle(
    await fetch(`${API_BASE}/admin/${resource}`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    })
  );

export const adminUpdate = async (resource: string, token: string | null, id: number, data: any) =>
  handle(
    await fetch(`${API_BASE}/admin/${resource}/${id}`, {
      method: "PUT",
      headers: authHeaders(token),
      body: JSON.stringify(data),
    })
  );

export const adminDelete = async (resource: string, token: string | null, id: number) =>
  handle(
    await fetch(`${API_BASE}/admin/${resource}/${id}`, {
      method: "DELETE",
      headers: authHeaders(token),
    })
  );

export const adminUploadImage = async (token: string | null, folder: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_BASE}/admin/upload/${folder}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: formData,
  });
  return handle(res);
};

export const adminDashboardStats = async (token: string | null) =>
  handle(await fetch(`${API_BASE}/admin/contact?status=new`, { headers: authHeaders(token) }));
