import express from "express";
import {
  getPelanggaranSiswaById,
  createPelanggaranSiswa,
  updatePelanggaranSiswa,
  deletePelanggaranSiswa,
  getAllPelanggaranSiswa,
} from "../controllers/pelanggaranSiswaController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, adminMiddleware, getPelanggaranSiswaById);
router.get("/", authMiddleware, adminMiddleware, getAllPelanggaranSiswa);
router.post("/", authMiddleware, adminMiddleware, createPelanggaranSiswa);
router.put("/:id", authMiddleware, adminMiddleware, updatePelanggaranSiswa);
router.delete("/:id", authMiddleware, adminMiddleware, deletePelanggaranSiswa);

export default router;
