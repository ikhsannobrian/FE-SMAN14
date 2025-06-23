import React from "react";
import FormJK from "../components/FormJK";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { createJanjiKonseling } from "../../service/janjianKonselingService";

const FormJkView = () => {
  // Fungsi untuk handle pembuatan janji baru
  const handleCreate = async (newData) => {
    try {
      await createJanjiKonseling(newData);
      return Promise.resolve(); // agar alert success bisa muncul
    } catch (error) {
      return Promise.reject(error); // agar alert error bisa muncul juga
    }
  };

  return (
    <main>
      <Header />
      <Nav />
      <FormJK onSubmit={handleCreate} />
      <Footer />
    </main>
  );
};

export default FormJkView;
