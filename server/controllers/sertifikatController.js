import Sertifikat from "../models/Sertifikat.js";

// Tambah Sertifikat
export const createSertifikat = async (req, res) => {
  try {
    const {
      siswa,
      jenissertifikat,
      bidanglomba,
      penyelenggaralomba,
      mulailomba,
      selesailomba,
      tingkatlomba,
    } = req.body;

    const uploadSertifikat = req.file ? req.file.filename : null;

    const newSertifikat = new Sertifikat({
      siswa,
      jenissertifikat,
      bidanglomba,
      penyelenggaralomba,
      mulailomba,
      selesailomba,
      tingkatlomba,
      uploadSertifikat,
    });

    await newSertifikat.save();
    res.status(201).json({
      message: "Sertifikat berhasil disimpan",
      data: newSertifikat,
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal membuat sertifikat", error });
  }
};

// Ambil Semua Sertifikat
export const getAllSertifikat = async (req, res) => {
  try {
    const sertifikat = await Sertifikat.find();
    res.status(200).json(sertifikat);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data sertifikat", error });
  }
};

// Ambil Sertifikat Berdasarkan ID
export const getSertifikatById = async (req, res) => {
  try {
    const { id } = req.params;
    const sertifikat = await Sertifikat.findById(id);

    if (!sertifikat) {
      return res.status(404).json({ message: "Sertifikat tidak ditemukan" });
    }

    res.status(200).json(sertifikat);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data sertifikat", error });
  }
};

// Update Sertifikat
export const updateSertifikat = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      siswa,
      jenissertifikat,
      bidanglomba,
      penyelenggaralomba,
      mulailomba,
      selesailomba,
      tingkatlomba,
    } = req.body;

    const updateData = {
      siswa,
      jenissertifikat,
      bidanglomba,
      penyelenggaralomba,
      mulailomba,
      selesailomba,
      tingkatlomba,
    };

    // Jika file baru diupload, ganti file
    if (req.file) {
      updateData.uploadSertifikat = req.file.filename;
    }

    const updated = await Sertifikat.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Sertifikat tidak ditemukan" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengupdate sertifikat", error });
  }
};

// Hapus Sertifikat
export const deleteSertifikat = async (req, res) => {
  try {
    const { id } = req.params;
    await Sertifikat.findByIdAndDelete(id);
    res.status(200).json({ message: "Sertifikat berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: "Gagal menghapus sertifikat", error });
  }
};
