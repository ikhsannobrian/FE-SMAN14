import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import axios from "axios";

const FormNA = ({ initialData = {}, onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdate = location.pathname.includes("/admin");

  const [formData, setFormData] = useState({
    siswa: "",
    semester1: "",
    semester2: "",
    semester3: "",
    semester4: "",
    semester5: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "success",
    title: "",
    message: "",
  });

  // Ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  // Fetch siswaId berdasarkan user login
  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/auth/siswa/${userId}`
        );
        setFormData((prev) => ({ ...prev, siswa: res.data._id }));
      } catch (error) {
        console.error("Gagal ambil siswa:", error);
      }
    };

    if (!isUpdate && user?.role === "SISWA") {
      fetchSiswa();
    }
  }, [userId, isUpdate]);

  // Isi nilai lama jika update
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [JSON.stringify(initialData)]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataSiapKirim = {
      ...formData,
      semester1: Number(formData.semester1),
      semester2: Number(formData.semester2),
      semester3: Number(formData.semester3),
      semester4: Number(formData.semester4),
      semester5: Number(formData.semester5),
    };

    try {
      if (onSubmit) {
        await onSubmit(dataSiapKirim);

        // ✅ Tampilkan alert sukses
        setAlertData({
          type: "success",
          title: isUpdate ? "Data Diperbarui" : "Berhasil",
          message: isUpdate
            ? "Data Nilai Akademik berhasil diperbarui."
            : "Data Nilai Akademik berhasil dikirim.",
        });
        setAlertVisible(true);
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || "";

      // ❌ Tampilkan alert gagal
      setAlertData({
        type: "error",
        title: "Gagal",
        message:
          errorMsg.includes("duplicate") ||
          errorMsg.toLowerCase().includes("sudah pernah")
            ? "Anda sudah pernah mengumpulkan nilai."
            : "Terjadi kesalahan saat mengirim data.",
      });
      setAlertVisible(true);
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    if (alertData.type === "success") {
      navigate(isUpdate ? "/admin/tabelna" : "/form-na");
    }
  };

  return (
    <div className="py-6 px-4 bg-gray-50">
      {isUpdate && (
        <h1 className="text-2xl font-bold text-center mb-6">
          Form Update Nilai Akademik
        </h1>
      )}

      {alertVisible && (
        <Alert
          type={alertData.type}
          title={alertData.title}
          message={alertData.message}
          buttonLabel="OK"
          onClose={handleAlertClose}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
      >
        {["semester1", "semester2", "semester3", "semester4", "semester5"].map(
          (field, idx) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-5">
                Semester {idx + 1}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Nilai semester ${idx + 1}`}
                required
                className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          )
        )}

        <div className="text-right">
          <Link
            to={isUpdate ? "/admin/tabelna" : "/layanan-konseling"}
            className="inline-block text-black-500 hover:text-blue-700 mb-2"
          >
            {isUpdate
              ? "Kembali ke tabel nilai akademik"
              : "Kembali ke halaman layanan"}
          </Link>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
          >
            {isUpdate ? "Ubah" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormNA;
