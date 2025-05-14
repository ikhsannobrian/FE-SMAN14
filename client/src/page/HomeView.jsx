import React from "react";
import CardItem from "../components/CardItem";
import Logo6 from "../assets/logo6.png";
import Logo2 from "../assets/logo2.png";

const cardData = [
  {
    title: "Siswa",
    description:
      "Siswa yang ingin menggunakan layanan BK SMAN 14 Bekasi harus melakukan login atau register",
    image: Logo6,
  },
  {
    title: "Admin",
    description: "Admin melayani layanan BK SMAN 14 Bekasi dengan sangat ramah",
    image: Logo2,
  },
];

const HomeView = () => {
  return (
    <>
      <div className="flex justify-end">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cardData.map((card, index) => (
            <CardItem
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeView;
