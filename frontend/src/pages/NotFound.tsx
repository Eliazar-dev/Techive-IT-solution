import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <h1 className="font-heading font-extrabold text-6xl text-ink">404</h1>
      <p className="font-body text-muted">This page doesn't exist.</p>
      <Link to="/" className="bg-brand-gradient px-7 py-3.5 rounded-btn font-body font-semibold text-sm text-white">
        Back to Home
      </Link>
    </div>
  );
}
