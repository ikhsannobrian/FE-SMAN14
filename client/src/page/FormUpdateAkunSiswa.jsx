import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormAuth from "../components/FormAuth";

import React from "react";

const FormUpdateAkunSiswa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Ambil data berdasarkan ID dari backend
    const dummy = {
      nama: "Anisa Rahmah Kusuma",
      username: "anisa123",
    };
    setData(dummy);
  }, [id]);

  const handleUpdate = (updatedData) => {
    console.log("Data diperbarui:", updatedData);
    // Kirim ke backend
    navigate("/admin/tabeljk");
  };

  return data ? (
    <FormAuth initialData={data} onSubmit={handleUpdate} />
  ) : (
    <p>Loading...</p>
  );
};

export default FormUpdateAkunSiswa;
