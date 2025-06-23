import TracerAlumni from "../models/TracerAlumni.js";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// Daftar kategori valid sesuai schema
const validKategori = [
  "perguruan tinggi negeri",
  "perguruan tinggi swasta",
  "wirausaha",
  "sekolah kedinasan",
  "karyawan swasta",
  "pegawai negeri",
];

// CREATE
export const createTracerAlumni = async (req, res) => {
  try {
    const { siswa, tahunLulus, kategori, namaInstansi, programStudi } =
      req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Bukti upload wajib disertakan" });
    }

    // ✅ CEK APAKAH SUDAH PERNAH MENGISI
    const existing = await TracerAlumni.findOne({ siswa });
    if (existing) {
      return res.status(400).json({
        message:
          "Siswa sudah pernah mengisi data tracer alumni, silahkan hubungi admin, jika ingin merubah data",
      });
    }

    // ✅ UPLOAD KE CLOUDINARY
    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "tracer-alumni" },
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    const newData = new TracerAlumni({
      siswa,
      tahunLulus,
      kategori,
      namaInstansi,
      programStudi,
      uploadBukti: result.secure_url,
    });

    await newData.save();
    res.status(201).json({ message: "Data berhasil disimpan", data: newData });
  } catch (error) {
    console.error("ERROR CREATE:", error);
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: error.message });
  }
};

// GET ALL
export const getAllTracerAlumni = async (req, res) => {
  try {
    const data = await TracerAlumni.find().populate(
      "siswa",
      "name kelas angkatan"
    );
    res.status(200).json({ message: "Data ditemukan", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: error.message });
  }
};

// GET BY ID
export const getTracerAlumniById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TracerAlumni.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Data ditemukan", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: error.message });
  }
};

// UPDATE
export const updateTracerAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const { siswa, tahunLulus, kategori, namaInstansi, programStudi } =
      req.body;

    const dataLama = await TracerAlumni.findById(id);
    if (!dataLama) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    let filePath = dataLama.uploadBukti;

    if (req.file) {
      const streamUpload = () => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "tracer-alumni" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const result = await streamUpload();
      filePath = result.secure_url;
    }

    const normalizedKategori = kategori?.toLowerCase().replace(/-/g, " ");

    const updated = await TracerAlumni.findByIdAndUpdate(
      id,
      {
        siswa,
        tahunLulus,
        kategori: normalizedKategori,
        namaInstansi,
        programStudi,
        uploadBukti: filePath,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Data berhasil diperbarui", data: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui data", error: error.message });
  }
};

// DELETE
export const deleteTracerAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TracerAlumni.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    await TracerAlumni.findByIdAndDelete(id);

    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus data", error: error.message });
  }
};
