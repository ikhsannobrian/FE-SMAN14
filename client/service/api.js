import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true
});

// ⬇️ Tambahkan interceptor untuk otomatis menyisipkan token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // atau sessionStorage jika kamu menyimpan di sana
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
