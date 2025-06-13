import express from "express";
import {
  getTracerAlumniById,
  createTracerAlumni,
  updateTracerAlumni,
  deleteTracerAlumni,
  getAllTracerAlumni,
} from "../controllers/tracerAlumniController.js";
import { upload } from "../utils/uploadFileHandler.js";
import {
  authMiddleware,
  adminMiddleware,
  siswaMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  siswaMiddleware,
  upload.single("uploadBukti"),
  createTracerAlumni
);

// READ - GET ALL
router.get("/", authMiddleware, adminMiddleware, getAllTracerAlumni);

// READ - GET BY ID
router.get("/:id", authMiddleware, adminMiddleware, getTracerAlumniById);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("uploadBukti"),
  updateTracerAlumni
);

// DELETE
router.delete("/:id", authMiddleware, adminMiddleware, deleteTracerAlumni);

export default router;
