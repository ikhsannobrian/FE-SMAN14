import mongoose from "mongoose";

const siswaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    kelas: {
      type: String,
      required: true,
    },
    angkatan: {
      type: String,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    noTelp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Siswa = mongoose.model("Siswa", siswaSchema);

export default Siswa;
