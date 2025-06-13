import express from "express";
import {
  getJanjiKonselingById,
  createJanjiKonseling,
  updateJanjiKonseling,
  deleteJanjiKonseling,
  getAllJanjiKonseling,
} from "../controllers/janjiKonselingController.js";
import {
  authMiddleware,
  adminMiddleware,
  siswaMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", authMiddleware, adminMiddleware, getJanjiKonselingById);
router.get("/", authMiddleware, adminMiddleware, getAllJanjiKonseling);
router.post("/", authMiddleware, siswaMiddleware, createJanjiKonseling);
router.put("/:id", authMiddleware, adminMiddleware, updateJanjiKonseling);
router.delete("/:id", authMiddleware, adminMiddleware, deleteJanjiKonseling);

export default router;
