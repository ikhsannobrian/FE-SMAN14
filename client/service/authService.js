import { api } from "./api";
import axios from "axios";

export const login = async (email, password) => {
  return api.post("/api/auth/login", { email, password });
};

export const registerSiswa = async (data) => {
  return api.post("/api/auth/register/siswa", data);
};

export const registerAdmin = async (data) => {
  return api.post("/api/auth/register/admin", data);
};

export const getAllSiswa = async () => {
  return api.get("/api/auth/siswa");
};

export const updateSiswa = async (id, data) => {
  return api.put(`/api/auth/siswa/${id}`, data);
};

export const deleteSiswa = async (id) => {
  return api.delete(`/api/auth/siswa/${id}`);
};

export const getProfileSiswa = () => {
  return api.get("/api/auth/siswa/profile");
};

export const updateProfileSiswa = async (profileData) => {
  return api.put("/api/auth/siswa/profile", profileData);
};

export const updateAdmin = async (id, data) => {
  return api.put(`/api/auth/admin/${id}`, data);
};

export const getAllAdmin = async () => {
  return api.get("/api/auth/admin");
};

export const deleteAdmin = async (id) => {
  return api.delete(`/api/auth/admin/${id}`);
};
