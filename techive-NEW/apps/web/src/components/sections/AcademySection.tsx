// src/components/sections/AcademySection.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Course } from "@techive/shared";
import { getCourses } from "../../lib/api";
import SectionHeader from "../SectionHeader";

const fallback: Partial<Course>[] = [
  { title: "Web Development Bootcamp", durationWeeks: 12, level: "Beginner to Pro" },
  { title: "AI & Data Science Program", durationWeeks: 16, level: "Intermediate" },
  { title: "UI/UX Design Masterclass", durationWeeks: 8, level: "All Levels" },
  { title: "Cloud Engineering Track", durationWeeks: 10, level: "Advanced" },
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

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <div className="w-full lg:w-[500px] h-[380px] rounded-2xl bg-gradient-to-br from-purple/20 to-cyan/20 shrink-0" />
          <div className="flex-1 flex flex-col divide-y divide-border w-full">
            {items.map((c, i) => (
              <div key={c.id ?? i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-5">
                <div className="flex gap-3 items-center">
                  <span className="bg-brand-gradient rounded-full size-1.5" />
                  <span className="font-body font-semibold text-lg text-ink">{c.title}</span>
                </div>
                <div className="flex gap-3">
                  <span className="bg-tag border border-border px-3.5 py-1.5 rounded-pill font-body font-semibold text-xs text-muted">
                    {c.durationWeeks} Weeks
                  </span>
                  <span className="bg-tag border border-border px-3.5 py-1.5 rounded-pill font-body font-semibold text-xs text-muted">
                    {c.level}
                  </span>
                </div>
              </div>
            ))}
            <div className="pt-6">
              <Link to="/academy" className="bg-brand-gradient px-7 py-3.5 rounded-btn font-body font-semibold text-sm text-white inline-block">
                Explore Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
