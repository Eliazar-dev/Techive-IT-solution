import { Router } from "express";
import { requireAdmin } from "../middleware/auth";
import { uploader, uploadBufferToCloudinary, handleUploadError } from "../middleware/upload";

export const adminUploadRouter = Router();

adminUploadRouter.use(requireAdmin);

adminUploadRouter.post("/:folder", uploader.single("file"), async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });
    const url = await uploadBufferToCloudinary(req.file.buffer, req.params.folder);
    res.json({ success: true, url });
  } catch (err) { next(err); }
});

adminUploadRouter.use(handleUploadError);
