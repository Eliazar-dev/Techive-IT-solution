// src/index.ts
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

import { publicServicesRouter, adminServicesRouter } from "./routes/services";
import { publicSolutionsRouter, adminSolutionsRouter } from "./routes/solutions";
import { publicCoursesRouter, adminCoursesRouter } from "./routes/courses";
import { publicProjectsRouter, adminProjectsRouter } from "./routes/projects";
import { publicTeamRouter, adminTeamRouter } from "./routes/team";
import { publicBlogRouter, adminBlogRouter } from "./routes/blog";
import { publicTestimonialsRouter, adminTestimonialsRouter } from "./routes/testimonials";
import { publicContactRouter, adminContactRouter } from "./routes/contact";
import { publicNewsletterRouter, adminNewsletterRouter } from "./routes/newsletter";
import { publicSettingsRouter, adminSettingsRouter } from "./routes/settings";
import { publicGalleryRouter, adminGalleryRouter } from "./routes/gallery";
import { publicChatRouter } from "./routes/chat";
import { adminUploadRouter } from "./routes/upload";
import { authRouter } from "./routes/auth";

const app = express();

app.use(express.json());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.FRONTEND_URL as string]
    : ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({ origin: allowedOrigins, credentials: true }));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 10000 : 300,
});
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 10000 : 5,
  message: { error: "Too many login attempts, please try again in 15 minutes." },
});
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: process.env.NODE_ENV === "development" ? 10000 : 10,
  message: { error: "Too many requests, please try again in 1 hour." },
});

app.use("/api", globalLimiter);
app.use("/api/admin/auth/login", authLimiter);
app.use("/api/contact", contactLimiter);
app.use("/api/newsletter/subscribe", contactLimiter);
app.use("/api/chat", contactLimiter);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/services", publicServicesRouter);
app.use("/api/solutions", publicSolutionsRouter);
app.use("/api/courses", publicCoursesRouter);
app.use("/api/projects", publicProjectsRouter);
app.use("/api/team", publicTeamRouter);
app.use("/api/blog", publicBlogRouter);
app.use("/api/testimonials", publicTestimonialsRouter);
app.use("/api/contact", publicContactRouter);
app.use("/api/newsletter", publicNewsletterRouter);
app.use("/api/settings", publicSettingsRouter);
app.use("/api/gallery", publicGalleryRouter);
app.use("/api/chat", publicChatRouter);

app.use("/api/admin/auth", authRouter);
app.use("/api/admin/services", adminServicesRouter);
app.use("/api/admin/solutions", adminSolutionsRouter);
app.use("/api/admin/courses", adminCoursesRouter);
app.use("/api/admin/projects", adminProjectsRouter);
app.use("/api/admin/team", adminTeamRouter);
app.use("/api/admin/blog", adminBlogRouter);
app.use("/api/admin/testimonials", adminTestimonialsRouter);
app.use("/api/admin/contact", adminContactRouter);
app.use("/api/admin/newsletter", adminNewsletterRouter);
app.use("/api/admin/settings", adminSettingsRouter);
app.use("/api/admin/gallery", adminGalleryRouter);
app.use("/api/admin/upload", adminUploadRouter);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || "Internal server error." });
});

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`API running on port ${PORT}`));
}

export default app;
