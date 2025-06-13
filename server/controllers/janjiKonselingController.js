import janjiKonseling from "../models/janjiKonseling.js";

// Get all
export const getAllJanjiKonseling = async (req, res) => {
  try {
    const data = await janjiKonseling.find();
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
