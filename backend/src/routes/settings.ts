import { Router } from "express";
import Joi from "joi";
import bcrypt from "bcryptjs";
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

adminSettingsRouter.post("/password", async (req, res, next) => {
  try {
    const { error, value } = Joi.object({
      currentPassword: Joi.string().required(),
      newPassword: Joi.string().min(6).required(),
    }).validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const admin = await prisma.adminUser.findFirst();
    if (!admin) return res.status(404).json({ error: "Admin not found." });

    const valid = await bcrypt.compare(value.currentPassword, admin.passwordHash);
    if (!valid) return res.status(401).json({ error: "Current password is incorrect." });

    const hash = await bcrypt.hash(value.newPassword, 12);
    await prisma.adminUser.update({ where: { id: admin.id }, data: { passwordHash: hash } });
    res.json({ success: true, message: "Password updated." });
  } catch (err) { next(err); }
});
