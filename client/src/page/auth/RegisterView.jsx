import React from "react";
import FormAuth from "../../components/FormAuth";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const RegisterView = () => {
  return (
    <main>
      <Header />
      <FormAuth isRegister={true} />
      <Footer />
    </main>
  );
};

export default RegisterView;
