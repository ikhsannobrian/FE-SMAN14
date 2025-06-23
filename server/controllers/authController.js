import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Siswa from "../models/Siswa.js";
import Admin from "../models/Admin.js";
import { config } from "../config.js";

// ==================== REGISTER SISWA ====================
export const registerSiswa = async (req, res) => {
  const { name, email, password, kelas, angkatan, alamat, noTelp } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: "SISWA" });
    await user.save();

    const siswa = new Siswa({
      user: user._id,
      name,
      email,
      kelas,
      angkatan,
      alamat,
      noTelp,
    });
    await siswa.save();

    res.status(201).json({ message: "Siswa registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== REGISTER ADMIN ====================
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: "ADMIN" });
    await user.save();

    const admin = new Admin({ user: user._id, name, email });
    await admin.save();

    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==================== LOGIN ====================
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email tidak terdaftar" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: "1d" }
    );

    let siswa = null;
    if (user.role === "SISWA") {
      siswa = await Siswa.findOne({ user: user._id });
    }

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        siswaId: siswa ? siswa._id : null, // ⬅️ Tambahan penting
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSiswaById = async (req, res) => {
  try {
    const siswa = await Siswa.findById(req.params.id); // cari berdasarkan _id
    if (!siswa) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }
    res.status(200).json(siswa);
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};

// ==================== GET ALL SISWA ====================
export const getAllSiswa = async (req, res) => {
  try {
    const siswaList = await Siswa.find().populate("user", "email role");
    // populate agar dapat info email dan role dari User
    res.status(200).json({ message: "Data siswa ditemukan", data: siswaList });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil data siswa",
      error: error.message,
    });
  }
};

// ==================== UPDATE SISWA ====================
export const updateSiswa = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    email,
    password, // optional
    kelas,
    angkatan,
    alamat,
    noTelp,
  } = req.body;

  try {
    const siswa = await Siswa.findById(id);
    if (!siswa) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }

    // Update data siswa
    siswa.name = name || siswa.name;
    siswa.email = email || siswa.email;
    siswa.kelas = kelas || siswa.kelas;
    siswa.angkatan = angkatan || siswa.angkatan;
    siswa.alamat = alamat || siswa.alamat;
    siswa.noTelp = noTelp || siswa.noTelp;
    await siswa.save();

    // Update data user yang terhubung
    const user = await User.findById(siswa.user);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      await user.save();
    }

    res.status(200).json({ message: "Akun siswa berhasil diperbarui" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal update akun siswa", error: error.message });
  }
};

// ==================== DELETE SISWA ====================
export const deleteSiswa = async (req, res) => {
  const { id } = req.params;

  try {
    const siswa = await Siswa.findById(id);
    if (!siswa) {
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }

    // Hapus user terkait
    await User.findByIdAndDelete(siswa.user);

    // Hapus data siswa
    await siswa.deleteOne();

    res.status(200).json({ message: "Akun siswa berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus akun siswa", error: error.message });
  }
};

// ==================== UPDATE PROFILE SISWA ====================
export const updateProfileSiswa = async (req, res) => {
  const userId = req.user.id; // dari token login (middleware auth)
  const { name, email, password, kelas, angkatan, noTelp } = req.body;

  try {
    // Update ke collection User
    const userUpdate = {
      name,
      email,
    };
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      userUpdate.password = hashed;
    }
    await User.findByIdAndUpdate(userId, userUpdate);

    // Update ke collection Siswa
    await Siswa.findOneAndUpdate(
      { user: userId },
      { name, email, kelas, angkatan, noTelp }
    );

    res.status(200).json({ message: "Profile siswa berhasil diperbarui" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal update profile", error: error.message });
  }
};

// ==================== GET PROFILE SISWA BY TOKEN ====================
export const getProfileSiswa = async (req, res) => {
  try {
    console.log("✅ Token payload:", req.user);

    const userId = req.user?.id;

    if (!userId) {
      console.log("Tidak ada userId dalam token");
      return res
        .status(401)
        .json({ message: "User ID tidak ditemukan dalam token" });
    }

    console.log("🔍 Cari siswa berdasarkan user ID:", userId);

    const siswa = await Siswa.findOne({ user: userId }).populate(
      "user",
      "email"
    );

    if (!siswa) {
      console.log("Siswa tidak ditemukan untuk user ID:", userId);
      return res.status(404).json({ message: "Siswa tidak ditemukan" });
    }

    console.log("✅ Siswa ditemukan:", siswa);

    res.status(200).json({
      name: siswa.name,
      email: siswa.user?.email,
      kelas: siswa.kelas,
      angkatan: siswa.angkatan,
      noTelp: siswa.noTelp,
    });
  } catch (error) {
    console.error(" ERROR DI getProfileSiswa:", error);
    res.status(500).json({
      message: "Gagal mengambil profile siswa",
      error: error.message,
    });
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const admin = await Admin.find().populate("user", "email name");
    console.log("Admin Data:", admin); // Tambahkan log untuk melihat data
    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching data", error: error.message });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    await admin.deleteOne();
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting admin", error: error.message });
  }
};
