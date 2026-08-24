import { Router } from "express";
import Joi from "joi";
import { prisma } from "../lib/prisma";

export const publicChatRouter = Router();

const chatSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow("", null),
  message: Joi.string().required(),
});

publicChatRouter.post("/", async (req, res, next) => {
  try {
    const { error, value } = chatSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const chat = await prisma.chatMessage.create({ data: value });
    res.status(201).json({ success: true, data: chat });
  } catch (err) { next(err); }
});
