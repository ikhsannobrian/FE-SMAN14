import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// ✅ Tambahkan baris ini
import { registerSW } from "virtual:pwa-register";
registerSW(); // Registrasi service worker

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
