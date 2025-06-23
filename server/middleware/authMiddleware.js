import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    // console.log("✅ Token decoded:", decoded); // 🔍 DEBUG INI
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }
};
export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

export const siswaMiddleware = (req, res, next) => {
  if (req.user.role !== "SISWA") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};
