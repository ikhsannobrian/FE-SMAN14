import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import nilaiAkademikRoutes from "./routes/nilaiAkademikRoutes.js";
import janjiKonselingRoutes from "./routes/janjiKonselingRoutes.js";
import tracerAlumni from "./routes/tracerAlumniRoutes.js";
import sertifikat from "./routes/sertifikatRoutes.js";
import PelanggaranSiswa from "./routes/pelanggaranSiswaRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/nilaiAkademik", nilaiAkademikRoutes);
app.use("/api/janjiKonseling", janjiKonselingRoutes);
app.use("/api/tracerAlumni", tracerAlumni);
app.use("/api/sertifikat", sertifikat);
app.use("/api/pelanggaranSiswa", PelanggaranSiswa);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  })
  .catch((err) => console.error(err));
