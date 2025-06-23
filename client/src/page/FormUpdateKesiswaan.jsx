import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormKesiswaan from "../components/FormKesiswaan";
import {
  updatePelanggaranSiswa,
  getAllPelanggaranSiswa,
} from "../../service/pelanggaranSiswaService";

const FormUpdateKesiswaan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllPelanggaranSiswa();
        const selected = allData.data.find((item) => item._id === id);
        if (selected) {
          // Sesuaikan format tanggal agar bisa langsung diisi ke <input type="date">
          selected.tanggal = selected.tanggal?.slice(0, 10); // ambil 'YYYY-MM-DD'
          setData(selected);
        }
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await updatePelanggaranSiswa(id, updatedData);
      navigate("/admin/tabelpelanggaran");
    } catch (error) {
      console.error("Gagal mengupdate data:", error);
    }
  };

  return data ? (
    <FormKesiswaan initialData={data} onSubmit={handleUpdate} isEdit={true} />
  ) : (
    <p>Loading...</p>
  );
};

export default FormUpdateKesiswaan;
