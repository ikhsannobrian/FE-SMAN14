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
      return Promise.reject(error); // Gunakan ini agar FormNA tetap bisa menampilkan alert
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
