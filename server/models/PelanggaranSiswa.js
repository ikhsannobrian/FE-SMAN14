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
    pelanggaran: {
      type: String,
      required: [true, "Jenis pelanggaran harus diisi"],
      enum: ["terlambat", "atribut tidak lengkap", "senjata tajam"],
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
