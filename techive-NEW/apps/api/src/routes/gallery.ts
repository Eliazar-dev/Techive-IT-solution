import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicGalleryRouter = Router();
export const adminGalleryRouter = Router();

const schema = Joi.object({
  type: Joi.string().valid("image", "video").required(),
  url: Joi.string().required(),
  caption: Joi.string().allow("", null),
  order: Joi.number().integer().default(0),
});

publicGalleryRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminGalleryRouter.use(requireAdmin);
adminGalleryRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});
adminGalleryRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.galleryItem.create({ data: value });
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
});
adminGalleryRouter.put("/:id", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.galleryItem.update({ where: { id: parseInt(req.params.id, 10) }, data: value });
    res.json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
adminGalleryRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.galleryItem.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
