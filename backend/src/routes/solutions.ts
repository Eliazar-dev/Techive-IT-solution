import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicSolutionsRouter = Router();
export const adminSolutionsRouter = Router();

const schema = Joi.object({
  slug: Joi.string().required(),
  tag: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().allow(null, ""),
  order: Joi.number().integer().default(0),
});

publicSolutionsRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.solution.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminSolutionsRouter.use(requireAdmin);

adminSolutionsRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.solution.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminSolutionsRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.solution.create({ data: value });
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2002") return res.status(400).json({ error: "Slug already exists." });
    next(err);
  }
});

adminSolutionsRouter.put("/:id", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.solution.update({ where: { id: parseInt(req.params.id, 10) }, data: value });
    res.json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});

adminSolutionsRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.solution.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
