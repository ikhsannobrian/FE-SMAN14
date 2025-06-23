import janjiKonseling from "../models/janjiKonseling.js";
import Siswa from "../models/Siswa.js";

// Get all
export const getAllJanjiKonseling = async (req, res) => {
  try {
    const data = await janjiKonseling
      .find()
      .populate("siswa", "name kelas noTelp");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create new
export const createJanjiKonseling = async (req, res) => {
  try {
    const { siswa, tanggalJanji, waktuJanji, guruBK, keperluan } = req.body;

    const newJanji = new janjiKonseling({
      siswa,
      tanggalJanji,
      waktuJanji,
      guruBK,
      keperluan,
    });

    await newJanji.save();

    res.status(201).json({
      message: "Berhasil membuat janjian konseling",
      data: newJanji,
    });
  } catch (err) {
    res.status(400).json({
      message: "Gagal membuat janjian konseling",
      error: err.message,
    });
  }
};

// Get by ID
export const getJanjiKonselingById = async (req, res) => {
  try {
    const janji = await janjiKonseling.findById(req.params.id);
    if (!janji)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json(janji);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
export const updateJanjiKonseling = async (req, res) => {
  try {
    const updated = await janjiKonseling.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({
      message: "Berhasil merubah data janjian konseling",
      data: updated,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
export const deleteJanjiKonseling = async (req, res) => {
  try {
    const deleted = await janjiKonseling.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Status Only
export const updateStatusJanjiKonseling = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await janjiKonseling
      .findByIdAndUpdate(id, { status }, { new: true })
      .populate("siswa", "name kelas noTelp");

    if (!updated)
      return res.status(404).json({ message: "Data tidak ditemukan" });

    res.json({
      message: "Status berhasil diperbarui",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal memperbarui status",
      error: err.message,
    });
  }
};

export const getJanjiKonselingBySiswaLogin = async (req, res) => {
  try {
    const userId = req.user.id; // ← ini ID dari User login

    // Cari siswa berdasarkan user ID
    const siswa = await Siswa.findOne({ user: userId });

    if (!siswa) {
      return res.status(404).json({ message: "Data siswa tidak ditemukan" });
    }

    // Ambil janji konseling berdasarkan siswa._id
    const data = await janjiKonseling
      .find({ siswa: siswa._id }) // ← yang benar ini
      .sort({ tanggalJanji: -1 })
      .populate("siswa", "name kelas noTelp");

    res.status(200).json({
      message: "Data janji konseling berhasil diambil",
      data,
    });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan", error: err.message });
  }
};
