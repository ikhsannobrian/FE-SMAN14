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
      required: [true, "Name is required"],
    },
    kelas: {
      type: String,
      required: [true, "kelas is required"],
    },
    angkatan: {
      type: String,
      required: [true, "Angkatan is required"],
    },
    alamat: {
      type: String,
      required: [true, "Alamat is required"],
    },
    noTelp: {
      type: String,
      required: [true, "No telp is required"],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const Siswa = mongoose.model("Siswa", siswaSchema);

export default Siswa;
