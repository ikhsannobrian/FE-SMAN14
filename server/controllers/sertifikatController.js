import Sertifikat from "../models/Sertifikat.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import Siswa from "../models/Siswa.js";

// 🔼 Fungsi upload ke Cloudinary
const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
        resource_type: "image",
      },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// ➕ Tambah Sertifikat
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

    if (!siswa) {
      return res.status(400).json({
        message:
          "ID siswa tidak ditemukan. Pastikan field 'siswa' dikirim dari frontend.",
      });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "File sertifikat harus diupload." });
    }

    const result = await streamUpload(req.file.buffer);
    const uploadSertifikat = result.secure_url;

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
    console.error("ERROR SAAT CREATE SERTIFIKAT:", error.message);
    res.status(500).json({
      message: "Gagal membuat sertifikat",
      error: error.message,
    });
  }
};

// 📥 Ambil Semua Sertifikat
export const getAllSertifikat = async (req, res) => {
  try {
    const sertifikat = await Sertifikat.find().populate(
      "siswa",
      "name kelas angkatan"
    );
    res.status(200).json(sertifikat);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data sertifikat",
      error: error.message,
    });
  }
};

// 📥 Ambil Berdasarkan ID
export const getSertifikatById = async (req, res) => {
  try {
    const { id } = req.params;
    const sertifikat = await Sertifikat.findById(id).populate(
      "siswa",
      "name kelas angkatan"
    );

    if (!sertifikat) {
      return res.status(404).json({ message: "Sertifikat tidak ditemukan" });
    }

    res.status(200).json(sertifikat);
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data sertifikat",
      error: error.message,
    });
  }
};

// ✏️ Update Sertifikat
export const updateSertifikat = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jenissertifikat,
      bidanglomba,
      penyelenggaralomba,
      mulailomba,
      selesailomba,
      tingkatlomba,
    } = req.body;

    const updateData = {
      jenissertifikat,
      bidanglomba,
      penyelenggaralomba,
      mulailomba,
      selesailomba,
      tingkatlomba,
    };

    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      updateData.uploadSertifikat = result.secure_url;
    }

    const updated = await Sertifikat.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Sertifikat tidak ditemukan" });
    }

    res.status(200).json({
      message: "Sertifikat berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengupdate sertifikat",
      error: error.message,
    });
  }
};

// 🗑️ Hapus Sertifikat
export const deleteSertifikat = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Sertifikat.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Sertifikat tidak ditemukan" });
    }

    res.status(200).json({ message: "Sertifikat berhasil dihapus" });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus sertifikat",
      error: error.message,
    });
  }
};
