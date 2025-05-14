import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormSertifikat from "../components/FormSertifikat";

import React from "react";

const FormUpdateSertifikat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Ambil data berdasarkan ID dari backend
    const dummy = {
      nama: "Fauzan Arbhi",
      jenissertifikat: "Akademik",
      penyelenggaralomba: "POPDA JAWA BARAT 2024",
      jenislomba: "Matematika",
      mulailomba: "01-01-2023",
      selesailomba: "31-12-2023",
      tingkatlomba: "Nasional",
      image: "",
    };
    setData(dummy);
  }, [id]);
  const handleUpdate = async (updatedData) => {
    try {
      console.log("Data diperbarui:", updatedData);
      // Simulasi API call (ganti dengan API nyata)
      // await updateNilaiAkademikAPI(id, updatedData);
      return Promise.resolve(); // Penting untuk sync dengan FormNA
    } catch (error) {
      console.error("Update gagal:", error);
      return Promise.reject(error);
    }
  };

  return <FormSertifikat initialData={data} onSubmit={handleUpdate} />;
};

export default FormUpdateSertifikat;
