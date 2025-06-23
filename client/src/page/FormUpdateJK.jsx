import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormJK from "../components/FormJK";
import { updateJanjiKonseling } from "../../service/janjianKonselingService";
import { api } from "../../service/api";

const FormUpdateJK = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const res = await api.get(`/api/janjiKonseling/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Gagal mengambil data Janjian Konseling:", err);
      }
    };
    fetchDataById();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateJanjiKonseling(id, updatedData);
      return Promise.resolve(); // penting agar alert bisa muncul di FormSertifikat
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return data ? (
    <FormJK initialData={data} onSubmit={handleUpdate} />
  ) : (
    <div className="text-center py-10">Loading data Janji Konseling...</div>
  );
};

export default FormUpdateJK;
