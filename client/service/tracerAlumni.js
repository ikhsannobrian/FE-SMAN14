import { api } from "./api";

export const createTracerAlumni = async (data) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }

  const response = await api.post("/api/tracerAlumni", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getAllTracerAlumni = async () => {
  const response = await api.get("/api/tracerAlumni");
  return response.data.data; // karena response-nya: { message, data }
};

export const updateTracerAlumni = async (id, data) => {
  const response = await api.put(`/api/tracerAlumni/${id}`, data);
  return response.data;
};

export const deleteTracerAlumni = async (id) => {
  const response = await api.delete(`/api/tracerAlumni/${id}`);
  return response.data;
};
