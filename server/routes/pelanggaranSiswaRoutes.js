import express from "express";
import {
  getPelanggaranSiswaById,
  createPelanggaranSiswa,
  updatePelanggaranSiswa,
  deletePelanggaranSiswa,
  getAllPelanggaranSiswa,
  getRekapPoinBulanan,
} from "../controllers/pelanggaranSiswaController.js";
import {
  authMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Rekap per bulan
router.get("/rekap", authMiddleware, adminMiddleware, getRekapPoinBulanan);

// CRUD
router.get("/", authMiddleware, adminMiddleware, getAllPelanggaranSiswa);
router.get("/:id", authMiddleware, adminMiddleware, getPelanggaranSiswaById);
router.post("/", authMiddleware, adminMiddleware, createPelanggaranSiswa);
router.put("/:id", authMiddleware, adminMiddleware, updatePelanggaranSiswa);
router.delete("/:id", authMiddleware, adminMiddleware, deletePelanggaranSiswa);

export default router;
