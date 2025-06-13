import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Siswa from "../models/Siswa.js";
import Admin from "../models/Admin.js";
import { config } from "../config.js";


// Register Siswa
export const registerSiswa = async (req, res) => {
  const { name, email, password, kelas, angkatan, alamat, noTelp } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: "SISWA" });
    await user.save();

    const siswa = new Siswa({ user: user._id, name, email, kelas, angkatan, alamat, noTelp });
    await siswa.save();

    res.status(201).json({ message: "Siswa registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Register Admin
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role: "ADMIN" });
    await user.save();

    const admin = new Admin({ user: user._id, name, email });
    await admin.save();
    console.log(admin);
    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      token,
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
