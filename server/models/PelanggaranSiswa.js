import mongoose from "mongoose";

const pelanggaranSiswaSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
      unique: false,
    },
    nama: {
      type: String,
      required: [true, "Nama siswa harus diisi"],
    },
    kelas: {
      type: String,
      required: [true, "Kelas harus diisi"],
    },
    tanggal: {
      type: String,
      required: [true, "Tanggal harus diisi"],
    },
    pelanggaran: {
      type: String,
      required: [true, "Jenis pelanggaran harus diisi"],
      enum: [
        "Tidak hadir di Sekolah atau di Kelas tanpa keterangan yang jelas dan dapat dipertanggungjawabkan",
        "Acuh saat Kegiatan Belajar Mengajar di Kelas",
        "Berbicara yang tidak perlu pada saat KBM sehingga mengganggu ketertiban kelas",
        "Makan dan minum di dalam kelas saat berlangsung pelajaran tanpa seizin guru",
        "Melakukan aktivitas yang tidak ada hubungannya dengan Kegiatan Belajar Mengajar (Tidur, Main Game, Main Kartu dll)",
        "Mengecat rambut dan kuku (kutek) dengan warna lain.",
        "Berambut panjang (Tidak sesuai aturan) memakai kalung, gelang, anting, cincin, dan berkumis bagi peserta didik putra",
        "Merokok selama berada di sekolah atau di luar lingkungan sekolah dengan menggunakan seragam",
        "Tidak mengikuti Apel/Upacara",
        "Mengambil tanpa izin barang milik siapapun dan di manapun tanpa alasan yang dapat dipertanggungjawabkan",
      ],
    },
    penjelasan: {
      type: String,
      required: [true, "Penjelasan pelanggaran harus diisi"],
    },
    poin: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PelanggaranSiswa = mongoose.model(
  "PelanggaranSiswa",
  pelanggaranSiswaSchema
);
export default PelanggaranSiswa;
