// src/pages/BlogPost.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { BlogPost as BlogPostType } from "@techive/shared";
import { getBlogPosts } from "../lib/api";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then((posts) => setPost(posts.find((p) => p.slug === slug) || null))
      .catch((err) => console.error("Failed to load post", err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="px-6 lg:px-20 py-24 text-center font-body text-muted">Loading…</div>;

  if (!post) {
    return (
      <div className="px-6 lg:px-20 py-24 text-center flex flex-col gap-4 items-center">
        <p className="font-body text-muted">Post not found.</p>
        <Link to="/blog" className="text-cyan font-body font-semibold text-sm">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
      <Link to="/blog" className="text-cyan font-body font-semibold text-sm mb-6 inline-block">← Back to Blog</Link>
      <span className="font-body text-xs text-muted block mb-2">
        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}
      </span>
      <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-ink mb-6">{post.title}</h1>
      <div className="h-[320px] rounded-2xl bg-gradient-to-br from-purple/20 to-cyan/20 mb-8" />
      <div className="font-body text-[15px] leading-relaxed text-ink whitespace-pre-wrap">{post.content}</div>
    </article>
  );
}
