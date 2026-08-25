import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";
import { requireAdmin } from "../middleware/auth";
import { sendContactNotification, sendContactAutoReply } from "../lib/email";

export const publicContactRouter = Router();
export const adminContactRouter = Router();

const submitSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow("", null),
  message: Joi.string().required(),
});

publicContactRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = submitSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const submission = await prisma.contactSubmission.create({ data: value });

    // Non-blocking: don't fail the request if email sending has a hiccup.
    Promise.allSettled([
      sendContactNotification(value),
      sendContactAutoReply(value),
    ]).then((results) => {
      results.forEach((r) => {
        if (r.status === "rejected") console.error("Email send failed:", r.reason);
      });
    });

    res.status(201).json({ success: true, data: submission });
  } catch (err) { next(err); }
});

adminContactRouter.use(requireAdmin);

adminContactRouter.get("/", async (req, res, next) => {
  try {
    const status = req.query.status as string | undefined;
    const data = await prisma.contactSubmission.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
    res.json({ success: true, data });
  } catch (err) { next(err); }
});

adminContactRouter.patch("/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!["new", "in_progress", "resolved", "closed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status." });
    }
    const data = await prisma.contactSubmission.update({
      where: { id: parseInt(req.params.id, 10) },
      data: { status },
    });
    res.json({ success: true, data });
  } catch (err: any) {
    if (err.code === "P2025") return res.status(404).json({ error: "Not found." });
    next(err);
  }
});
