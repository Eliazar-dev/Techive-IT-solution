import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicCoursesRouter = Router();
export const adminCoursesRouter = Router();

const schema = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  durationWeeks: Joi.number().integer().required(),
  level: Joi.string().valid("Beginner to Pro", "Intermediate", "All Levels", "Advanced").required(),
  description: Joi.string().required(),
  syllabusUrl: Joi.string().allow(null, ""),
  isPublished: Joi.boolean().default(true),
  order: Joi.number().integer().default(0),
});

publicCoursesRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.course.findMany({ where: { isPublished: true }, orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminCoursesRouter.use(requireAdmin);

adminCoursesRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.course.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminCoursesRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.course.create({ data: value });
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2002") return res.status(400).json({ error: "Slug already exists." });
    next(err);
  }
});

adminCoursesRouter.put("/:id", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.course.update({ where: { id: parseInt(req.params.id, 10) }, data: value });
    res.json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});

adminCoursesRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.course.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
