import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import { config } from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import nilaiAkademikRoutes from "./routes/nilaiAkademikRoutes.js";
import janjiKonselingRoutes from "./routes/janjiKonselingRoutes.js";
import tracerAlumni from "./routes/tracerAlumniRoutes.js";
import sertifikat from "./routes/sertifikatRoutes.js";
import PelanggaranSiswa from "./routes/pelanggaranSiswaRoutes.js";

dotenv.config(); // ← pastikan environment variables bisa dipakai

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const allowedOrigins = [
  "http://localhost:5173",
  "https://sman14-one.vercel.app",          // ganti sesuai domain FE jika pakai Vercel
  "https://be-sman14.up.railway.app"       
];

// 🔧 Custom CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log("CORS request from:", origin);

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/nilaiAkademik", nilaiAkademikRoutes);
app.use("/api/janjiKonseling", janjiKonselingRoutes);
app.use("/api/tracerAlumni", tracerAlumni);
app.use("/api/sertifikat", sertifikat);
app.use("/api/pelanggaranSiswa", PelanggaranSiswa);

// Frontend serving (jika bundle di dalam project)
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Connect MongoDB dan run server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch((err) => console.error(err));
