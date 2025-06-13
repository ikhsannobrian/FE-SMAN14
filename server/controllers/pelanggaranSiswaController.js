import PelanggaranSiswa from "../models/PelanggaranSiswa.js";

// GET semua pelanggaran
export const getAllPelanggaranSiswa = async (req, res) => {
  try {
    const data = await PelanggaranSiswa.find().populate("admin", "nama email"); // Optional: sesuaikan field admin yang ingin ditampilkan
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET pelanggaran berdasarkan ID
export const getPelanggaranSiswaById = async (req, res) => {
  try {
    const data = await PelanggaranSiswa.findById(req.params.id).populate(
      "admin",
      "nama email"
    );
    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPelanggaranSiswa = async (req, res) => {
  try {
    const data = req.body; // ← Ini adalah array!

    const poinMapping = {
      terlambat: 10,
      "atribut tidak lengkap": 20,
      "senjata tajam": 30,
    };

    const formattedData = data.map((item) => {
      const pelanggaranLower = item.pelanggaran?.toLowerCase();

      if (!poinMapping[pelanggaranLower]) {
        throw new Error("Jenis pelanggaran tidak valid");
      }

      return {
        admin: item.admin,
        nama: item.nama,
        kelas: item.kelas,
        pelanggaran: pelanggaranLower,
        penjelasan: item.penjelasan,
        poin: poinMapping[pelanggaranLower],
      };
    });

    const savedData = await PelanggaranSiswa.insertMany(formattedData);
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update pelanggaran
export const updatePelanggaranSiswa = async (req, res) => {
  try {
    const updated = await PelanggaranSiswa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE pelanggaran
export const deletePelanggaranSiswa = async (req, res) => {
  try {
    const deleted = await PelanggaranSiswa.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
