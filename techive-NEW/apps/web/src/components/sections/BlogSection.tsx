// src/components/sections/BlogSection.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@techive/shared";
import { getBlogPosts } from "../../lib/api";
import SectionHeader from "../SectionHeader";

const fallback: Partial<BlogPost>[] = [
  { slug: "future-of-llm-integrations", title: "The Future of LLM Integrations", excerpt: "Best practices for setting up reliable context gates and protecting system safety thresholds.", publishedAt: "2026-10-12" },
  { slug: "auditable-ledgers", title: "Building Highly Auditable Ledgers", excerpt: "How our engineers architecture complex ledger systems that are zone-4 fault tolerant.", publishedAt: "2026-10-04" },
  { slug: "inclusive-design-systems", title: "Fostering Inclusive Design Systems", excerpt: "How simple color rules and clear typography can make high-density dashboards friendly to all.", publishedAt: "2026-09-28" },
];

export default function BlogSection({ limit }: { limit?: number }) {
  const [posts, setPosts] = useState<BlogPost[] | Partial<BlogPost>[]>(fallback);

  useEffect(() => {
    getBlogPosts()
      .then((data) => data.length && setPosts(data))
      .catch((err) => console.error("Failed to load blog posts", err));
  }, []);

  const items = limit ? posts.slice(0, limit) : posts;

  return (
    <div className="bg-white px-6 lg:px-20 py-16 lg:py-24">
      <SectionHeader tag="From Our Blog" title="Insightful Engineering for Operators" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
        {items.map((p, i) => (
          <Link
            key={p.id ?? i}
            to={`/blog/${p.slug}`}
            className="border border-border rounded-card overflow-hidden shadow-card hover:shadow-lg transition-shadow"
          >
            <div className="h-[180px] bg-gradient-to-br from-purple/20 to-cyan/20" />
            <div className="p-6 flex flex-col gap-3">
              <span className="font-body text-xs text-muted">
                {p.publishedAt && new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
              </span>
              <h3 className="font-heading font-bold text-xl text-ink leading-snug">{p.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted">{p.excerpt}</p>
              <span className="font-body font-semibold text-sm text-cyan mt-2">Read More →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
