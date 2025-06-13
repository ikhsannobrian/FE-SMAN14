import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
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
