import janjiKonseling from "../models/janjiKonseling.js";
import Siswa from "../models/Siswa.js";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
dayjs.extend(customParseFormat);

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

    // Format tanggal ke dd-MM-YYYY
    const formattedDate = dayjs(tanggalJanji, [
      "YYYY-MM-DD",
      "DD-MM-YYYY",
    ]).format("DD-MM-YYYY");

    const existing = await janjiKonseling.findOne({
      tanggalJanji: formattedDate,
      waktuJanji,
    });

    if (existing) {
      return res.status(400).json({
        message: `Jam ${waktuJanji} pada tanggal ${formattedDate} sudah dibooking`,
      });
    }

    const newJanji = new janjiKonseling({
      siswa,
      tanggalJanji: formattedDate,
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
    if (req.body.tanggalJanji) {
      req.body.tanggalJanji = dayjs(req.body.tanggalJanji, [
        "YYYY-MM-DD",
        "DD-MM-YYYY",
      ]).format("DD-MM-YYYY");
    }

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

// Get by siswa login
export const getJanjiKonselingBySiswaLogin = async (req, res) => {
  try {
    const userId = req.user.id;
    const siswa = await Siswa.findOne({ user: userId });

    if (!siswa) {
      return res.status(404).json({ message: "Data siswa tidak ditemukan" });
    }

    const data = await janjiKonseling
      .find({ siswa: siswa._id })
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

// Get jam tersedia
export const getJamTersedia = async (req, res) => {
  try {
    const { tanggal } = req.query;

    if (!tanggal) {
      return res.status(400).json({ message: "Tanggal wajib diisi" });
    }

    const formatted = dayjs(tanggal, ["YYYY-MM-DD", "DD-MM-YYYY"]).format(
      "DD-MM-YYYY"
    );

    const semuaJam = [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "13:00",
      "14:00",
      "15:00",
    ];

    const existing = await janjiKonseling.find({ tanggalJanji: formatted });
    const jamTerbooking = existing.map((item) => item.waktuJanji);
    const jamTersedia = semuaJam.filter((jam) => !jamTerbooking.includes(jam));

    res.status(200).json({
      tanggal: formatted,
      jamTersedia,
    });
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil jam tersedia",
      error: err.message,
    });
  }
};
