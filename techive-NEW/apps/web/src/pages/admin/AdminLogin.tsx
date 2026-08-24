// src/pages/admin/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../lib/adminApi";
import { useAuth } from "../../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await adminLogin(email, password);
      login(res.token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-10 w-full max-w-sm flex flex-col gap-5">
        <div className="flex items-center gap-2 justify-center mb-2">
          <div className="bg-brand-gradient flex items-center justify-center rounded-[6px] size-8">
            <span className="font-heading font-extrabold text-base text-white">T</span>
          </div>
          <span className="font-heading font-extrabold text-xl text-ink">TECHIVE Admin</span>
        </div>
        <div>
          <label className="font-body text-sm text-ink block mb-2">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border rounded-btn px-3 py-3 font-body text-sm outline-none focus:border-cyan"
          />
        </div>
        <div>
          <label className="font-body text-sm text-ink block mb-2">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-border rounded-btn px-3 py-3 font-body text-sm outline-none focus:border-cyan"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-brand-gradient rounded-btn py-3.5 font-body font-semibold text-sm text-white disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
