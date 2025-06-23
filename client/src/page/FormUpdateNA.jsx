import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormNA from "../components/FormNA";
import {
  getNilaiSiswaById,
  updateNilaiAkademik,
} from "../../service/nilaiAkademik";

const FormUpdateNA = () => {
  const { id } = useParams(); // id ini = siswaId
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getNilaiSiswaById(id);
        setData(res.data); // isi form dengan data dari DB
      } catch (err) {
        console.error("Gagal ambil data nilai:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateNilaiAkademik(data._id, updatedData); // pakai ID dokumen nilai akademik
    } catch (error) {
      console.error("Update gagal:", error);
      throw error; // biar ditangani di FormNA
    }
  };

  if (!data) return <p>Loading...</p>; // loading state

  return <FormNA initialData={data} onSubmit={handleUpdate} />;
};

export default FormUpdateNA;
