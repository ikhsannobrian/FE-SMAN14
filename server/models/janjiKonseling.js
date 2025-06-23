import mongoose from "mongoose";

const janjiKonselingSchema = new mongoose.Schema({
  siswa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Siswa",
    required: true,
  },
  tanggalJanji: {
    type: String,
    required: [true, "Tanggal janji harus diisi"],
  },
  status: {
    type: String,
    enum: ["Disetujui", "Tidak Disetujui", "Menunggu"],
    default: "Menunggu",
  },
  waktuJanji: {
    type: String,
    required: [true, "Waktu janji harus diisi"],
  },
  guruBK: {
    type: String,
    required: [true, "Guru BK harus diisi"],
  },
  keperluan: {
    type: String,
    required: [true, "Keperluan janji harus diisi"],
  },
});

const janjiKonseling = mongoose.model("janjiKonseling", janjiKonselingSchema);
export default janjiKonseling;
