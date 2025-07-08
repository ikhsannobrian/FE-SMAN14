import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "email sudah pernah didaftarkan"],
      match: /.+\@.+\..+/,
      minlength: 5,
      maxlength: 100,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      maxlength: 100,
    },
    role: {
      type: String,
      enum: ["USER", "SISWA", "ADMIN"],
      default: "USER",
    },
    // ✅ Tambahkan untuk reset password
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
