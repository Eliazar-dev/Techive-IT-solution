// src/pages/admin/AdminDashboard.tsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminResourceList from "../../components/admin/AdminResourceList";
import AdminOverview from "./AdminOverview";
import AdminContact from "./AdminContact";
import AdminNewsletter from "./AdminNewsletter";
import AdminSettings from "./AdminSettings";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="dashboard" element={<AdminOverview />} />

        <Route
          path="services"
          element={
            <AdminResourceList
              resource="services"
              title="Services"
              columns={[{ key: "title", label: "Title" }, { key: "slug", label: "Slug" }]}
              fields={[
                { name: "title", label: "Title", type: "text", required: true },
                { name: "slug", label: "Slug", type: "text", required: true },
                { name: "description", label: "Description", type: "textarea", required: true },
                { name: "icon", label: "Icon (lucide name, e.g. terminal)", type: "text", required: true },
                { name: "imageUrl", label: "Image URL", type: "text" },
                { name: "order", label: "Order", type: "number" },
              ]}
              emptyItem={{ title: "", slug: "", description: "", icon: "terminal", imageUrl: "", order: 0 }}
            />
          }
        />

        <Route
          path="solutions"
          element={
            <AdminResourceList
              resource="solutions"
              title="Solutions"
              columns={[{ key: "title", label: "Title" }, { key: "tag", label: "Tag" }]}
              fields={[
                { name: "title", label: "Title", type: "text", required: true },
                { name: "slug", label: "Slug", type: "text", required: true },
                { name: "tag", label: "Tag", type: "text", required: true },
                { name: "description", label: "Description", type: "textarea", required: true },
                { name: "imageUrl", label: "Image", type: "image" },
                { name: "order", label: "Order", type: "number" },
              ]}
              emptyItem={{ title: "", slug: "", tag: "", description: "", imageUrl: "", order: 0 }}
            />
          }
        />

        <Route
          path="courses"
          element={
            <AdminResourceList
              resource="courses"
              title="Academy Courses"
              columns={[{ key: "title", label: "Title" }, { key: "level", label: "Level" }, { key: "durationWeeks", label: "Weeks" }]}
              fields={[
                { name: "title", label: "Title", type: "text", required: true },
                { name: "slug", label: "Slug", type: "text", required: true },
                { name: "durationWeeks", label: "Duration (weeks)", type: "number", required: true },
                { name: "level", label: "Level", type: "select", options: ["Beginner to Pro", "Intermediate", "All Levels", "Advanced"], required: true },
                { name: "description", label: "Description", type: "textarea", required: true },
                { name: "syllabusUrl", label: "Syllabus URL", type: "text" },
                { name: "imageUrl", label: "Image URL", type: "text" },
                { name: "order", label: "Order", type: "number" },
              ]}
              emptyItem={{ title: "", slug: "", durationWeeks: 8, level: "", description: "", syllabusUrl: "", imageUrl: "", order: 0, isPublished: true }}
            />
          }
        />

        <Route
          path="projects"
          element={
            <AdminResourceList
              resource="projects"
              title="Portfolio Projects"
              columns={[{ key: "title", label: "Title" }, { key: "category", label: "Category" }]}
              fields={[
                { name: "title", label: "Title", type: "text", required: true },
                { name: "slug", label: "Slug", type: "text", required: true },
                { name: "category", label: "Category", type: "text", required: true },
                { name: "summary", label: "Summary", type: "textarea", required: true },
                { name: "caseStudyUrl", label: "Case Study URL", type: "text" },
                { name: "imageUrl", label: "Image", type: "image" },
                { name: "order", label: "Order", type: "number" },
              ]}
              emptyItem={{ title: "", slug: "", category: "", summary: "", caseStudyUrl: "", imageUrl: "", order: 0 }}
            />
          }
        />

        <Route
          path="team"
          element={
            <AdminResourceList
              resource="team"
              title="Team"
              columns={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }]}
              fields={[
                { name: "name", label: "Name", type: "text", required: true },
                { name: "role", label: "Role", type: "text", required: true },
                { name: "photoUrl", label: "Photo", type: "image" },
                { name: "order", label: "Order", type: "number" },
              ]}
              emptyItem={{ name: "", role: "", photoUrl: "", order: 0 }}
            />
          }
        />

        <Route
          path="blog"
          element={
            <AdminResourceList
              resource="blog"
              title="Blog Posts"
              columns={[{ key: "title", label: "Title" }, { key: "isPublished", label: "Published" }]}
              fields={[
                { name: "title", label: "Title", type: "text", required: true },
                { name: "slug", label: "Slug", type: "text", required: true },
                { name: "excerpt", label: "Excerpt", type: "textarea", required: true },
                { name: "content", label: "Content", type: "textarea", required: true },
                { name: "coverImageUrl", label: "Cover Image", type: "image" },
              ]}
              emptyItem={{ title: "", slug: "", excerpt: "", content: "", coverImageUrl: "", isPublished: true }}
            />
          }
        />

        <Route
          path="testimonials"
          element={
            <AdminResourceList
              resource="testimonials"
              title="Testimonials"
              columns={[{ key: "authorName", label: "Author" }, { key: "authorTitle", label: "Title" }]}
              fields={[
                { name: "quote", label: "Quote", type: "textarea", required: true },
                { name: "authorName", label: "Author Name", type: "text", required: true },
                { name: "authorTitle", label: "Author Title", type: "text", required: true },
                { name: "authorPhotoUrl", label: "Author Photo", type: "image" },
                { name: "order", label: "Order", type: "number" },
              ]}
              emptyItem={{ quote: "", authorName: "", authorTitle: "", authorPhotoUrl: "", order: 0 }}
            />
          }
        />

        <Route
          path="gallery"
          element={
            <AdminResourceList
              resource="gallery"
              title="Gallery (Carousel Media)"
              columns={[{ key: "type", label: "Type" }, { key: "caption", label: "Caption" }]}
              fields={[
                { name: "type", label: "Type", type: "select", options: ["image", "video"], required: true },
                { name: "url", label: "Media URL (paste — image uploads via any other Gallery item's upload button work too; the upload endpoint only accepts image files, so video URLs must be pasted from an external host)", type: "text", required: true },
                { name: "caption", label: "Caption", type: "text" },
                { name: "order", label: "Order", type: "number" },
              ]}
              emptyItem={{ type: "image", url: "", caption: "", order: 0 }}
            />
          }
        />

        <Route path="contact" element={<AdminContact />} />
        <Route path="newsletter" element={<AdminNewsletter />} />
        <Route path="settings" element={<AdminSettings />} />
      </Routes>
    </AdminLayout>
  );
}
