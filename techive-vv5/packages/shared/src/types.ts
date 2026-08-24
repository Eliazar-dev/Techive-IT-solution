// packages/shared/src/types.ts
// Single source of truth for data shapes shared between apps/web and apps/api.
// Both apps import from here instead of each defining their own — this is what
// prevents the frontend/backend field-name drift that caused bugs last time.

export interface Service {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name, e.g. "terminal", "cpu"
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Solution {
  id: number;
  slug: string;
  tag: string; // e.g. "Industry Native"
  title: string;
  description: string;
  imageUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  durationWeeks: number;
  level: "Beginner to Pro" | "Intermediate" | "All Levels" | "Advanced";
  description: string;
  syllabusUrl: string | null;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string; // e.g. "Healthcare AI"
  summary: string;
  caseStudyUrl: string | null;
  imageUrl: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  photoUrl: string | null;
  order: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string | null;
  publishedAt: string;
  isPublished: boolean;
}

export interface Testimonial {
  id: number;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorPhotoUrl: string | null;
  order: number;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "in_progress" | "resolved" | "closed";
  createdAt: string;
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface Settings {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyAddress: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    github?: string;
  };
}

export interface GalleryItem {
  id: number;
  type: "image" | "video";
  url: string;
  caption: string | null;
  order: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiListResponse<T> {
  success: boolean;
  data: T[];
  total?: number;
  page?: number;
}
