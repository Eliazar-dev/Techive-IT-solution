// src/routes/services.ts
// REFERENCE PATTERN — replicate this exact structure for:
// solutions, courses, projects, team, blog, testimonials
import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicServicesRouter = Router();
export const adminServicesRouter = Router();

const serviceSchema = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  icon: Joi.string().required(),
  order: Joi.number().integer().default(0),
});

// ── PUBLIC ──────────────────────────────────────────
publicServicesRouter.get("/", async (_req, res, next) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
});

// ── ADMIN (all routes below require a valid JWT) ────
adminServicesRouter.use(requireAdmin);

adminServicesRouter.get("/", async (_req, res, next) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
});

adminServicesRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = serviceSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const service = await prisma.service.create({ data: value });
    res.status(201).json({ success: true, data: service });
  } catch (err: any) {
    if (err.code === "P2002") return res.status(400).json({ error: "Slug already exists." });
    next(err);
  }
});

adminServicesRouter.put("/:id", async (req, res, next) => {
  try {
    const { error, value } = serviceSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const service = await prisma.service.update({
      where: { id: parseInt(req.params.id, 10) },
      data: value,
    });
    res.json({ success: true, data: service });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Service not found." });
    next(err);
  }
});

adminServicesRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.service.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Service not found." });
    next(err);
  }
});
