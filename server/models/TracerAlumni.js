import mongoose from "mongoose";

const TracerAlumniSchema = new mongoose.Schema(
  {
    siswa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Siswa",
      required: true,
      unique: true,
    },
    tahunLulus: {
      type: String,
      required: [true, "Tahun lulus harus diisi"],
    },
    kategori: {
      type: String,
      enum: [
        "perguruan tinggi negeri",
        "perguruan tinggi swasta",
        "wirausaha",
        "sekolah kedinasan",
        "karyawan swasta",
        "pegawai negeri",
      ],
      required: [true, "Kategori harus diisi"],
    },
    namaInstansi: {
      type: String,
      required: [true, "Nama instansi harus diisi"],
    },
    programStudi: {
      type: String,
      required: [true, "Program studi harus diisi"],
    },
    uploadBukti: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("TracerAlumni", TracerAlumniSchema);
