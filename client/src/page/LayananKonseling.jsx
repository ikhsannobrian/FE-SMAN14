import React from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CardLayanan from "../components/CardLayanan";
import Logo8 from "../assets/logo8.png";
import Logo13 from "../assets/logo13.jpg";
import Logo15 from "../assets/logo15.jpg";
import Logo16 from "../assets/logo16.png";

const cardData = [
  {
    title: "Konseling",
    description: "Siswa yang ingin melakukan konseling bersama guru BK",
    image: Logo8,
    path: "/form-jk", // Tambahkan path untuk routing
  },
  {
    title: "Tracer Alumni",
    description:
      "Alumni yang lolos Perguruan Tinggi, Sekolah Kedinasan, dan Dunia Kerja",
    image: Logo13,
    path: "/form-ta",
  },
  {
    title: "Nilai Akademik",
    description: "Siswa kelas 12 mengumpulkan nilai 5 semester",
    image: Logo15,
    path: "/form-na",
  },
  {
    title: "Sertifikat",
    description: "Siswa yang mendapatkan sertifikat tingkat kota/kabupaten",
    image: Logo16,
    path: "/form-sertifikat",
  },
];

const LayananKonseling = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Nav />
      <div className="flex justify-center my-10 px-4 flex-grow">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cardData.map((card, index) => (
            <CardLayanan
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              onClick={() => {
                if (card.path) navigate(card.path);
              }}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LayananKonseling;
