import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormKesiswaan from "../components/FormKesiswaan";

const FormUpdateKesiswaan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Ambil data berdasarkan ID dari backend (misalnya menggunakan fetch)
    const dummy = {
      nama: "Fanisa Rizki",
      kelas: "XII.3",
      pelanggaran: "Atribut tidak lengkap",
      tanggalpelanggaran: "2023-04-24", // Ganti format tanggal menjadi YYYY-MM-DD
      poin: "30",
      penjelasan: "Terlambat masuk sekolah sekitar 10 menit",
    };
    setData(dummy);
  }, [id]);

  const handleUpdate = (updatedData) => {
    console.log("Data diperbarui:", updatedData);
    // Kirim data ke backend (misalnya menggunakan fetch)
    // Contoh: updateData(updatedData);
    navigate("/admin/tabelpelanggaran");
  };

  return data ? (
    <FormKesiswaan initialData={data} onSubmit={handleUpdate} isEdit={true} />
  ) : (
    <p>Loading...</p>
  );
};

export default FormUpdateKesiswaan;
