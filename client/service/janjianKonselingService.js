import { api } from "./api";
import axios from "axios";

export const createJanjiKonseling = async (formData) => {
  const response = await api.post("/api/janjiKonseling", formData);
  return response.data;
};

export const getAllJanjiKonseling = async () => {
  const response = await api.get("/api/janjiKonseling");
  return response.data;
};

export const updateStatusJanjiKonseling = async (id, status) => {
  const response = await api.patch(`/api/janjiKonseling/${id}/status`, {
    status,
  });
  return response.data;
};

export const deleteJanjiKonseling = async (id) => {
  const response = await api.delete(`/api/janjiKonseling/${id}`);
  return response.data;
};

export const updateJanjiKonseling = async (id, formData) => {
  const response = await api.put(`/api/janjiKonseling/${id}`, formData);
  return response.data;
};

export const getJanjiKonselingBySiswaLogin = async () => {
  const response = await api.get("/api/janjiKonseling/siswa");
  return response.data.data;
};

export const getJamTersedia = async (tanggal) => {
  const response = await api.get(
    `/api/janjiKonseling/jam-tersedia?tanggal=${tanggal}`
  );
  return response.data.jamTersedia;
};
