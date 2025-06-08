import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavLogin from "../components/NavLogin";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <NavLogin />
      <main className="mx-auto max-w-6xl px-8 py-2 flex-grow">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
