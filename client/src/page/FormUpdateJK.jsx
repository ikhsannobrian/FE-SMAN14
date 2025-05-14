import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormJK from "../components/FormJK";

const FormUpdateJK = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Ambil data berdasarkan ID dari backend
    const dummy = {
      nama: "Anisa Rahmah Kusuma",
      kelas: "12 IPA 5",
      telp: "08123456789",
      tanggal: "2025-05-20",
      jam: "10:00",
      guru: "Dini-Nursyahida",
      pesan: "Saya ingin konseling mengenai tekanan belajar.",
    };
    setData(dummy);
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      console.log("Data Janjian Konseling diperbarui:", updatedData);
      // Simulasikan API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Return true untuk menandakan sukses
      return true;
    } catch (error) {
      console.error("Gagal memperbarui data:", error);
      return false;
    }
  };

  return <FormJK initialData={data} onSubmit={handleUpdate} />;
};

export default FormUpdateJK;
