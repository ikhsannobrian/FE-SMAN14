import express from "express";
import {
  getJanjiKonselingById,
  createJanjiKonseling,
  updateJanjiKonseling,
  deleteJanjiKonseling,
  getAllJanjiKonseling,
  getJamTersedia,
  updateStatusJanjiKonseling,
  getJanjiKonselingBySiswaLogin,
} from "../controllers/janjiKonselingController.js";
import {
  authMiddleware,
  adminMiddleware,
  siswaMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/jam-tersedia",
  authMiddleware,
  siswaMiddleware,
  adminMiddleware,
  getJamTersedia
);

router.get(
  "/siswa",
  authMiddleware,
  siswaMiddleware,
  getJanjiKonselingBySiswaLogin
);

router.get("/:id", authMiddleware, adminMiddleware, getJanjiKonselingById);
router.get("/", authMiddleware, adminMiddleware, getAllJanjiKonseling);
router.post("/", authMiddleware, siswaMiddleware, createJanjiKonseling);
router.put("/:id", authMiddleware, adminMiddleware, updateJanjiKonseling);
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  updateStatusJanjiKonseling
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteJanjiKonseling);

export default router;
