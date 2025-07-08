import React from "react";
import {
  FaUser,
  FaBook,
  FaChalkboardTeacher,
  FaBookOpen,
} from "react-icons/fa";

const DashboardView = () => {
  const cards = [
    {
      title: "Siswa",
      count: 1080,
      icon: <FaUser className="text-white text-3xl" />,
      bg: "bg-orange-500",
    },
    {
      title: "Kelas",
      count: 33,
      icon: <FaChalkboardTeacher className="text-white text-3xl" />,
      bg: "bg-blue-500",
    },
    {
      title: "Mata Pelajaran",
      count: 32,
      icon: <FaBook className="text-white text-3xl" />,
      bg: "bg-green-500",
    },
    {
      title: "Ekstrakulikuler",
      count: 15,
      icon: <FaBookOpen className="text-white text-3xl" />,
      bg: "bg-green-500",
    },
  ];

  return (
    <div className="flex flex-col h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between"
          >
            <div className={`p-3 rounded-full ${card.bg}`}>{card.icon}</div>
            <div className="ml-4 text-right">
              <h2 className="text-xl font-bold">{card.count}</h2>
              <p className="text-lg font-semibold">{card.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardView;
