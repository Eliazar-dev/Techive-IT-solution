import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";

export const publicSettingsRouter = Router();
export const adminSettingsRouter = Router();

const schema = Joi.object({
  companyName: Joi.string().required(),
  companyEmail: Joi.string().email().required(),
  companyPhone: Joi.string().required(),
  companyAddress: Joi.string().required(),
  twitterUrl: Joi.string().allow("", null),
  linkedinUrl: Joi.string().allow("", null),
  facebookUrl: Joi.string().allow("", null),
  githubUrl: Joi.string().allow("", null),
});

publicSettingsRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.settings.findUnique({ where: { id: 1 } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminSettingsRouter.use(requireAdmin);
adminSettingsRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.settings.findUnique({ where: { id: 1 } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});
adminSettingsRouter.put("/", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const data = await prisma.settings.upsert({
      where: { id: 1 },
      update: value,
      create: { id: 1, ...value },
    });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});
