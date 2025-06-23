import mongoose from "mongoose";

const SertifikatSchema = new mongoose.Schema(
  {
    siswa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Siswa",
      required: true,
      // unique: true,
    },
    jenissertifikat: {
      type: String,
      required: [true, "Jenis sertifikat harus diisi"],
    },
    bidanglomba: {
      type: String,
      required: [true, "Bidang lomba harus diisi"],
    },
    penyelenggaralomba: {
      type: String,
      required: [true, "Penyelenggara lomba harus diisi"],
    },
    mulailomba: {
      type: Date,
      required: [true, "Mulai lomba harus diisi"],
    },
    selesailomba: {
      type: Date,
      required: [true, "Selesai lomba harus diisi"],
    },
    tingkatlomba: {
      type: String,
      required: [true, "Tingkat lomba harus diisi"],
    },
    uploadSertifikat: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Sertifikat = mongoose.model("Sertifikat", SertifikatSchema);
export default Sertifikat;
