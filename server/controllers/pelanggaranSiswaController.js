import PelanggaranSiswa from "../models/PelanggaranSiswa.js";

// GET semua pelanggaran
export const getAllPelanggaranSiswa = async (req, res) => {
  try {
    const data = await PelanggaranSiswa.find().populate("admin", "nama email");
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
    if (!data) return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST buat pelanggaran baru (array input)
export const createPelanggaranSiswa = async (req, res) => {
  try {
    const data = req.body; // ← array of pelanggaran

    const poinMapping = {
      "Tidak hadir di Sekolah atau di Kelas tanpa keterangan yang jelas dan dapat dipertanggungjawabkan": 10,
      "Acuh saat Kegiatan Belajar Mengajar di Kelas": 5,
      "Berbicara yang tidak perlu pada saat KBM sehingga mengganggu ketertiban kelas": 5,
      "Makan dan minum di dalam kelas saat berlangsung pelajaran tanpa seizin guru": 5,
      "Melakukan aktivitas yang tidak ada hubungannya dengan Kegiatan Belajar Mengajar (Tidur, Main Game, Main Kartu dll)": 5,
      "Mengecat rambut dan kuku (kutek) dengan warna lain.": 5,
      "Berambut panjang (Tidak sesuai aturan) memakai kalung, gelang, anting, cincin, dan berkumis bagi peserta didik putra": 5,
      "Merokok selama berada di sekolah atau di luar lingkungan sekolah dengan menggunakan seragam": 50,
      "Tidak mengikuti Apel/Upacara": 5,
      "Mengambil tanpa izin barang milik siapapun dan di manapun tanpa alasan yang dapat dipertanggungjawabkan": 75,
    };

    const formattedData = data.map((item) => {
      const jenis = item.pelanggaran;

      if (!poinMapping[jenis]) {
        throw new Error(`Jenis pelanggaran "${jenis}" tidak valid`);
      }

      return {
        admin: item.admin,
        nama: item.nama,
        kelas: item.kelas,
        tanggal: item.tanggal,
        pelanggaran: jenis,
        penjelasan: item.penjelasan,
        poin: poinMapping[jenis],
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
    if (!updated)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE pelanggaran
export const deletePelanggaranSiswa = async (req, res) => {
  try {
    const deleted = await PelanggaranSiswa.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Data tidak ditemukan" });
    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET rekap poin siswa per bulan
export const getRekapPoinBulanan = async (req, res) => {
  const { bulan, tahun } = req.query;

  try {
    const start = new Date(tahun, bulan - 1, 1);
    const end = new Date(tahun, bulan, 0, 23, 59, 59);

    const result = await PelanggaranSiswa.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: "$nama",
          totalPelanggaran: { $sum: 1 },
          totalPoin: { $sum: "$poin" },
        },
      },
      {
        $sort: { totalPoin: -1 },
      },
    ]);

    const data = result.map((item, index) => ({
      no: index + 1,
      nama: item._id,
      totalPelanggaran: item.totalPelanggaran,
      totalPoin: item.totalPoin,
    }));

    res.status(200).json(data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Gagal mengambil rekap", error: err.message });
  }
};
