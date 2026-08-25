import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicTestimonialsRouter = Router();
export const adminTestimonialsRouter = Router();

const schema = Joi.object({
  quote: Joi.string().required(),
  authorName: Joi.string().required(),
  authorTitle: Joi.string().required(),
  authorPhotoUrl: Joi.string().allow(null, ""),
  order: Joi.number().integer().default(0),
});

publicTestimonialsRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminTestimonialsRouter.use(requireAdmin);
adminTestimonialsRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});
adminTestimonialsRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.testimonial.create({ data: value });
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
});
adminTestimonialsRouter.put("/:id", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.testimonial.update({ where: { id: parseInt(req.params.id, 10) }, data: value });
    res.json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
adminTestimonialsRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.testimonial.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
