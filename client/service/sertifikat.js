import { api } from "./api";

export const createSertifikat = async (formData) => {
  const response = await api.post("/api/sertifikat", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// sertifikat.js
export const getAllSertifikat = async () => {
  const response = await api.get("/api/sertifikat"); // pastikan endpoint ini tersedia di backend
  return response.data;
};

// Update Sertifikat
export const updateSertifikat = async (id, formData) => {
  const response = await api.put(`/api/sertifikat/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete Sertifikat
export const deleteSertifikat = async (id) => {
  const response = await api.delete(`/api/sertifikat/${id}`);
  return response.data;
};
