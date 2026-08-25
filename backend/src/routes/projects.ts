import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicProjectsRouter = Router();
export const adminProjectsRouter = Router();

const schema = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  category: Joi.string().required(),
  summary: Joi.string().required(),
  caseStudyUrl: Joi.string().allow(null, ""),
  imageUrl: Joi.string().allow(null, ""),
  order: Joi.number().integer().default(0),
});

publicProjectsRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.project.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminProjectsRouter.use(requireAdmin);
adminProjectsRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.project.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});
adminProjectsRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.project.create({ data: value });
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2002") return res.status(400).json({ error: "Slug already exists." });
    next(err);
  }
});
adminProjectsRouter.put("/:id", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.project.update({ where: { id: parseInt(req.params.id, 10) }, data: value });
    res.json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
adminProjectsRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.project.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
