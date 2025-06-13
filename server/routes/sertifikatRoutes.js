import express from "express";
import {
  createSertifikat,
  getAllSertifikat,
  getSertifikatById,
  updateSertifikat,
  deleteSertifikat,
} from "../controllers/sertifikatController.js";
import { upload } from "../utils/uploadFileHandler.js";
import {
  authMiddleware,
  adminMiddleware,
  siswaMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  siswaMiddleware,
  upload.single("uploadSertifikat"),
  createSertifikat
);
router.get("/", authMiddleware, adminMiddleware, getAllSertifikat);
router.get("/:id", authMiddleware, adminMiddleware, getSertifikatById);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("uploadSertifikat"),
  updateSertifikat
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteSertifikat);

export default router;
