import { api } from "./api";

export const createNilaiAkademik = async (data) => {
  return api.post("/api/nilaiAkademik/", data);
};

export const getAllNilaiAkademik = async () => {
  return api.get("/api/nilaiAkademik");
};

export const deleteNilaiAkademik = async (id) => {
  return api.delete(`/api/nilaiAkademik/${id}`);
};

export const updateNilaiAkademik = async (id, data) => {
  return api.put(`/api/nilaiAkademik/${id}`, data);
};
export const getNilaiSiswaById = async (id) => {
  return api.get(`/api/nilaiAkademik/by-siswa/${id}`);
};
