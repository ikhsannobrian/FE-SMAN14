import React from "react";
import FormNA from "../components/FormNA";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { createNilaiAkademik } from "../../service/nilaiAkademik";

const FormNAView = () => {
  const handleFormSubmit = async (formData) => {
    try {
      await createNilaiAkademik(formData);
      console.log("Data nilai akademik berhasil dikirim!");
    } catch (error) {
      console.error(
        "❌ Gagal kirim data:",
        error?.response?.data || error.message
      );
      throw error; // ⬅️ Tambahkan baris ini agar FormNA.jsx tahu bahwa request gagal
    }
  };

  return (
    <main>
      <Header />
      <Nav />
      <FormNA onSubmit={handleFormSubmit} />
      <Footer />
    </main>
  );
};

export default FormNAView;
