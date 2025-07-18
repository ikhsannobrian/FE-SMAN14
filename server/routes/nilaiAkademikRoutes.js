import express from "express";
import {
  getNilaiSiswaById,
  createNilaiAkademik,
  updateNilaiAkademik,
  deleteNilaiAkademik,
  getAllNilaiAkademik,
  getNilaiAkademikById,
} from "../controllers/nilaiAkademikController.js";
import {
  authMiddleware,
  adminMiddleware,
  siswaMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/by-siswa/:id",
  authMiddleware,
  adminMiddleware,
  getNilaiAkademikById
);
router.get("/:id", authMiddleware, adminMiddleware, getNilaiSiswaById);
router.get("/", authMiddleware, adminMiddleware, getAllNilaiAkademik);
router.post("/", authMiddleware, siswaMiddleware, createNilaiAkademik);
router.put("/:id", authMiddleware, adminMiddleware, updateNilaiAkademik);
router.delete("/:id", authMiddleware, adminMiddleware, deleteNilaiAkademik);

export default router;
