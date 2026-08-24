import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { sendNewsletterWelcome } from "../lib/email";

export const publicNewsletterRouter = Router();
export const adminNewsletterRouter = Router();

const schema = Joi.object({ email: Joi.string().email().required() });

publicNewsletterRouter.post("/subscribe", async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const sub = await prisma.newsletterSubscriber.upsert({
      where: { email: value.email },
      update: {},
      create: { email: value.email },
    });

    sendNewsletterWelcome(value.email).catch((err) => console.error("Welcome email failed:", err));

    res.status(201).json({ success: true, data: sub });
  } catch (err) { next(err); }
});

adminNewsletterRouter.use(requireAdmin);
adminNewsletterRouter.get("/", async (_req, res, next) => {
  try {
    const data = await prisma.newsletterSubscriber.findMany({ orderBy: { subscribedAt: "desc" } });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});
