import mongoose from "mongoose";

const nilaiAkademikSchema = new mongoose.Schema({
  siswa: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Siswa",
    required: true,
    unique: true,
  },
  semester1: {
    type: Number,
    required: [true, "Nilai semester 1 harus diisi"],
  },
  semester2: {
    type: Number,
    required: [true, "Nilai semester 2 harus diisi"],
  },
  semester3: {
    type: Number,
    required: [true, "Nilai semester 3 harus diisi"],
  },
  semester4: {
    type: Number,
    required: [true, "Nilai semester 4 harus diisi"],
  },
  semester5: {
    type: Number,
    required: [true, "Nilai semester 5 harus diisi"],
  },
  rataRata: {
    type: Number,
    required: true,
  },
});

const NilaiAkademik = mongoose.model("NilaiAkademik", nilaiAkademikSchema);
export default NilaiAkademik;
