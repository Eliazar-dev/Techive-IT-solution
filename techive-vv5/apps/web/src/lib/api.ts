// src/lib/api.ts
import type {
  Service,
  Solution,
  Course,
  Project,
  TeamMember,
  BlogPost,
  Testimonial,
  Settings,
  GalleryItem,
  ContactFormPayload,
  ApiListResponse,
  ApiResponse,
} from "@techive/shared";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const getServices = async (): Promise<Service[]> =>
  (await apiCall<ApiListResponse<Service>>("/services")).data;

export const getSolutions = async (): Promise<Solution[]> =>
  (await apiCall<ApiListResponse<Solution>>("/solutions")).data;

export const getCourses = async (): Promise<Course[]> =>
  (await apiCall<ApiListResponse<Course>>("/courses")).data;

export const getProjects = async (): Promise<Project[]> =>
  (await apiCall<ApiListResponse<Project>>("/projects")).data;

export const getTeam = async (): Promise<TeamMember[]> =>
  (await apiCall<ApiListResponse<TeamMember>>("/team")).data;

export const getBlogPosts = async (): Promise<BlogPost[]> =>
  (await apiCall<ApiListResponse<BlogPost>>("/blog")).data;

export const getTestimonials = async (): Promise<Testimonial[]> =>
  (await apiCall<ApiListResponse<Testimonial>>("/testimonials")).data;

export const getSettings = async (): Promise<Settings> =>
  (await apiCall<ApiResponse<Settings>>("/settings")).data;

export const getGallery = async (): Promise<GalleryItem[]> =>
  (await apiCall<ApiListResponse<GalleryItem>>("/gallery")).data;

export const submitContact = async (payload: ContactFormPayload): Promise<void> => {
  await apiCall("/contact", { method: "POST", body: JSON.stringify(payload) });
};

export const subscribeNewsletter = async (email: string): Promise<void> => {
  await apiCall("/newsletter/subscribe", { method: "POST", body: JSON.stringify({ email }) });
};
