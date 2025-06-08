import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const FormJK = ({ initialData = {}, onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdate = location.pathname.includes("/admin");

  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    telp: "",
    tanggal: "",
    jam: "",
    guru: "",
    pesan: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (onSubmit) {
        // Pastikan onSubmit tidak melakukan redirect/navigate sendiri
        await onSubmit(formData);
      }

      // Tampilkan alert setelah submit berhasil
      setAlertVisible(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    // Navigasi hanya setelah user menutup alert
    navigate(isUpdate ? "/admin/tabeljk" : "/form-jk");
  };

  return (
    <div className="py-6 px-4 bg-gray-50">
      {isUpdate && (
        <h1 className="text-2xl font-bold text-center mb-6">
          Form Update Janjian Konseling
        </h1>
      )}

      {alertVisible && (
        <Alert
          type="success"
          title={isUpdate ? "Data Diperbarui" : "Berhasil"}
          message={
            isUpdate
              ? "Data Janjian Konseling berhasil diperbarui."
              : "Janjian Konseling berhasil dibuat."
          }
          buttonLabel="OK"
          onClose={handleAlertClose}
          duration={3000} // Alert akan otomatis tutup setelah 3 detik
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
      >

        {/* Tanggal */}
        <div>
          <label className="block text-sm font-medium mb-5">Tanggal</label>
          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Jam */}
        <div>
          <label className="block text-sm font-medium mb-2">Jam</label>
          <input
            type="time"
            name="jam"
            value={formData.jam}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Guru BK */}
        <div>
          <label className="block text-sm font-medium mb-5">Guru BK</label>
          <select
            name="guru"
            value={formData.guru}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Pilih Guru BK
            </option>
            <option value="Dini-Nursyahida">Dini Nursyahida</option>
            <option value="Lina-Erliana">Lina Erliana</option>
            <option value="Tari">Tari</option>
          </select>
        </div>

        {/* Pesan */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Pesan (Keluhan)
          </label>
          <textarea
            name="pesan"
            rows="3"
            value={formData.pesan}
            onChange={handleChange}
            placeholder="Tulis pesan atau keluhanmu di sini"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        {/* Navigasi dan Submit */}
        <div className="text-right">
          <Link
            to={isUpdate ? "/admin/tabeljk" : "/layanan-konseling"}
            className="inline-block text-black-500 hover:text-blue-700 mb-2"
          >
            {isUpdate
              ? "Kembali ke tabel janjian konseling"
              : "Kembali ke halaman layanan bimbingan"}
          </Link>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow disabled:opacity-50"
          >
            {isUpdate ? "Ubah" : "Kirim"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormJK;
