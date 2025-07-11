import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { config } from "./config.js";
import authRoutes from "./routes/authRoutes.js";
import nilaiAkademikRoutes from "./routes/nilaiAkademikRoutes.js";
import janjiKonselingRoutes from "./routes/janjiKonselingRoutes.js";
import tracerAlumni from "./routes/tracerAlumniRoutes.js";
import sertifikat from "./routes/sertifikatRoutes.js";
import PelanggaranSiswa from "./routes/pelanggaranSiswaRoutes.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(cors());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  console.log("CORS for:", origin);

  const allowedOrigins = [
  "http://localhost:5173",
  "https://fe-sman14.railway.app"
];
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

  // Untuk menangani preflight request langsung
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

// Serve frontend dist folder
app.use(express.static(path.join(__dirname, "../client/dist")));

// Redirect semua non-API route ke index.html
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// MongoDB connect & start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(config.port, () =>
      console.log(`Server running on port ${config.port}`)
    );
  })
  .catch((err) => console.error(err));
