import express from "express";
import {
  login,
  registerAdmin,
  registerSiswa,
  getSiswaById,
  getAllSiswa,
  updateSiswa,
  deleteSiswa,
  updateProfileSiswa,
  getProfileSiswa,
  getAllAdmin,
  deleteAdmin,
  updateAdmin,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import {
  authMiddleware,
  siswaMiddleware,
  adminMiddleware,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.get("/siswa", getAllSiswa);
router.post("/register/siswa", registerSiswa);
router.post("/register/admin", registerAdmin);
router.get("/admin", getAllAdmin);
router.put("/admin/:id", updateAdmin);
router.delete("/admin/:id", deleteAdmin);

// ✅ Route spesifik HARUS di atas route dinamis
router.get("/siswa/profile", authMiddleware, siswaMiddleware, getProfileSiswa);
router.put(
  "/siswa/profile",
  authMiddleware,
  siswaMiddleware,
  updateProfileSiswa
);

router.get("/siswa/:id", getSiswaById);
router.put("/siswa/:id", authMiddleware, adminMiddleware, updateSiswa);
router.delete("/siswa/:id", authMiddleware, adminMiddleware, deleteSiswa);

export default router;
