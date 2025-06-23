import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormTA from "../components/FormTA";
import { api } from "../../service/api";
import { updateTracerAlumni } from "../../service/tracerAlumni";

const FormUpdateTA = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/api/tracerAlumni/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Data Tracer Alumni berhasil diambil:", res.data);
        setData(res.data.data); // ✅ Perbaikan di sini
      } catch (err) {
        console.error("Gagal mengambil data Tracer Alumni:", err);
      }
    };
    fetchDataById();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateTracerAlumni(id, updatedData);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return data ? (
    <FormTA initialData={data} onSubmit={handleUpdate} />
  ) : (
    <div className="text-center py-10">Loading data Tracer Alumni...</div>
  );
};

export default FormUpdateTA;
