// src/page/FormUpdateAkunAdmin.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateAkunAdmin from "../components/CreateAkunAdmin";
import { getAllAdmin } from "../../service/authService";

const FormUpdateAkunAdmin = () => {
  const { id } = useParams();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getAllAdmin();
        const admin = res.data.find((item) => item._id === id);
        if (admin) {
          setAdminData(admin);
        }
      } catch (error) {
        console.error("Gagal ambil data admin:", error);
      }
    };

    fetchAdmin();
  }, [id]);

  if (!adminData) {
    return <p className="text-center mt-10">Memuat data admin...</p>;
  }

  return (
    <div>
      <CreateAkunAdmin initialData={adminData} isUpdate={true} />
    </div>
  );
};

export default FormUpdateAkunAdmin;
