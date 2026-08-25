// src/components/sections/AcademySection.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Course } from "@techive/shared";
import { getCourses } from "../../lib/api";
import SectionHeader from "../SectionHeader";

const fallback: Partial<Course>[] = [
  { title: "Web Development Bootcamp", durationWeeks: 12, level: "Beginner to Pro", description: "From HTML fundamentals to full-stack React and Node applications.", imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop" },
  { title: "AI & Data Science Program", durationWeeks: 16, level: "Intermediate", description: "Python, statistics, and applied machine learning for real datasets.", imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop" },
  { title: "UI/UX Design Masterclass", durationWeeks: 8, level: "All Levels", description: "Design systems, prototyping, and user research from first principles.", imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop" },
  { title: "Cloud Engineering Track", durationWeeks: 10, level: "Advanced", description: "AWS/Azure architecture, containers, and production-grade CI/CD.", imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop" },
];

export default function AcademySection({ limit }: { limit?: number }) {
  const [courses, setCourses] = useState<Course[] | Partial<Course>[]>(fallback);

  useEffect(() => {
    getCourses()
      .then((data) => data.length && setCourses(data))
      .catch((err) => console.error("Failed to load courses", err));
  }, []);

  const items = limit ? courses.slice(0, limit) : courses;

  return (
    <div className="bg-white px-6 lg:px-20 py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <span className="bg-brand-gradient rounded-full size-2" />
              <span className="font-body font-bold text-sm text-ink uppercase tracking-wide">TECHIVE Academy</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-ink">Learn. Build. Innovate.</h2>
          </div>
          <p className="font-body text-[15px] leading-relaxed text-muted max-w-md">
            Upskill your digital teams or build a foundation in modern technologies with courses designed by senior engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((c, i) => (
            <div key={c.id ?? i} className="bg-white border border-border rounded-card shadow-depth-sm hover:shadow-depth-md hover:-translate-y-1 transition-all overflow-hidden flex flex-col">
              <div className="h-[160px] w-full overflow-hidden">
                <img
                  src={c.imageUrl || fallback[i]?.imageUrl || ""}
                  alt={c.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-heading font-bold text-base text-ink leading-snug">{c.title}</h3>
                <p className="font-body text-xs leading-relaxed text-muted line-clamp-3">{c.description}</p>
                <div className="flex gap-2 mt-auto">
                  <span className="bg-tag border border-border px-3 py-1.5 rounded-pill font-body font-semibold text-[11px] text-muted">
                    {c.durationWeeks} Weeks
                  </span>
                  <span className="bg-tag border border-border px-3 py-1.5 rounded-pill font-body font-semibold text-[11px] text-muted">
                    {c.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link to="/academy" className="bg-brand-gradient px-7 py-3.5 rounded-btn font-body font-bold text-sm text-white hover:shadow-depth-lg transition-all active:scale-95">
            Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
