import { api } from "./api";

export const createPelanggaranSiswa = async (data) => {
  return api.post("/api/pelanggaranSiswa/", data);
};

export const getAllPelanggaranSiswa = async () => {
  return api.get("/api/pelanggaranSiswa/");
};

export const deletePelanggaranSiswa = async (id) => {
  return api.delete(`/api/pelanggaranSiswa/${id}`);
};

export const updatePelanggaranSiswa = async (id, data) => {
  return api.put(`/api/pelanggaranSiswa/${id}`, data);
};
