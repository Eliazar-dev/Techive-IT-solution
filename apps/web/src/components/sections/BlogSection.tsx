// src/components/sections/BlogSection.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "@techive/shared";
import { getBlogPosts } from "../../lib/api";
import SectionHeader from "../SectionHeader";

const fallback: Partial<BlogPost>[] = [
  { slug: "future-of-llm-integrations", title: "The Future of LLM Integrations", excerpt: "Best practices for setting up reliable context gates and protecting system safety thresholds.", publishedAt: "2026-10-12", coverImageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop" },
  { slug: "auditable-ledgers", title: "Building Highly Auditable Ledgers", excerpt: "How our engineers architecture complex ledger systems that are zone-4 fault tolerant.", publishedAt: "2026-10-04", coverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop" },
  { slug: "inclusive-design-systems", title: "Fostering Inclusive Design Systems", excerpt: "How simple color rules and clear typography can make high-density dashboards friendly to all.", publishedAt: "2026-09-28", coverImageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop" },
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
      <SectionHeader tag="Insights" title="Technical Perspectives from the Field" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1280px] mx-auto">
        {items.map((p, i) => (
          <Link
            key={p.id ?? i}
            to={`/blog/${p.slug}`}
            className="border border-border rounded-card overflow-hidden shadow-card hover:shadow-depth-lg hover:-translate-y-1 transition-all"
          >
            <div className="h-[180px] w-full overflow-hidden">
              <img
                src={(p as any).coverImageUrl || fallback[i]?.coverImageUrl || ""}
                alt={p.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
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
