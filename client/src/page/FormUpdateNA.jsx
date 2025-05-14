import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormNA from "../components/FormNA";

const FormUpdateNA = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Ambil data dari API (simulasi)
    const dummyData = {
      nama: "Anisa Rahmah Kusuma",
      angkatan: "15",
      kelas: "12 IPA 5",
      semester1: "90",
      semester2: "90",
      semester3: "90",
      semester4: "90",
      semester5: "90",
      average: "90",
    };
    setData(dummyData);
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

  if (!data) return null; // Atau pesan sederhana jika data kosong

  return <FormNA initialData={data} onSubmit={handleUpdate} />;
};

export default FormUpdateNA;
