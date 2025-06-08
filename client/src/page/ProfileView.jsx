import React from "react";
import Profile from "../components/Profile";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const ProfileView = () => {
  return (
    <main>
      <Header />
      <Nav />
      <Profile />
      <Footer />
    </main>
  );
};

export default ProfileView;
