import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormSertifikat from "../components/FormSertifikat";
import { api } from "../../service/api";
import { updateSertifikat } from "../../service/sertifikat";

const FormUpdateSertifikat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const res = await api.get(`/api/sertifikat/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Gagal mengambil data sertifikat:", err);
      }
    };
    fetchDataById();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await updateSertifikat(id, updatedData);
      return Promise.resolve(); // penting agar alert bisa muncul di FormSertifikat
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return data ? (
    <FormSertifikat initialData={data} onSubmit={handleUpdate} />
  ) : (
    <div className="text-center py-10">Loading data sertifikat...</div>
  );
};

export default FormUpdateSertifikat;
