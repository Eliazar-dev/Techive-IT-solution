import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicBlogRouter = Router();
export const adminBlogRouter = Router();

const schema = Joi.object({
  slug: Joi.string().required(),
  title: Joi.string().required(),
  excerpt: Joi.string().required(),
  content: Joi.string().required(),
  coverImageUrl: Joi.string().allow(null, ""),
  publishedAt: Joi.date().default(() => new Date()),
  isPublished: Joi.boolean().default(true),
});

publicBlogRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.blogPost.findMany({ where: { isPublished: true }, orderBy: { publishedAt: "desc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminBlogRouter.use(requireAdmin);
adminBlogRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});
adminBlogRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.blogPost.create({ data: value });
    res.status(201).json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2002") return res.status(400).json({ error: "Slug already exists." });
    next(err);
  }
});
adminBlogRouter.put("/:id", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.blogPost.update({ where: { id: parseInt(req.params.id, 10) }, data: value });
    res.json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
adminBlogRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.blogPost.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
