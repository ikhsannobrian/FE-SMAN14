import axios from "axios";

export const api = axios.create({
  baseURL: "fe-sman14-production.up.railway.app",
});

// ⬇️ Tambahkan interceptor untuk otomatis menyisipkan token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // atau sessionStorage jika kamu menyimpan di sana
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
