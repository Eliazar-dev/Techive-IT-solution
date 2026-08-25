import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicTeamRouter = Router();
export const adminTeamRouter = Router();

const schema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().required(),
  photoUrl: Joi.string().allow(null, ""),
  order: Joi.number().integer().default(0),
});

publicTeamRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminTeamRouter.use(requireAdmin);
adminTeamRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.teamMember.findMany({ orderBy: { order: "asc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});
adminTeamRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.teamMember.create({ data: value });
    res.status(201).json({ success: true, data });
  } catch (err) { next(err); }
});
adminTeamRouter.put("/:id", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.teamMember.update({ where: { id: parseInt(req.params.id, 10) }, data: value });
    res.json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
adminTeamRouter.delete("/:id", async (req, res, next) => {
  try {
    await prisma.teamMember.delete({ where: { id: parseInt(req.params.id, 10) } });
    res.json({ success: true });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
