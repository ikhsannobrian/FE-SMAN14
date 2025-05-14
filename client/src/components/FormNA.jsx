import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const FormNA = ({ initialData = {}, onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdate = location.pathname.includes("/admin");

  const [formData, setFormData] = useState({
    nama: "",
    angkatan: "",
    kelas: "",
    semester1: "",
    semester2: "",
    semester3: "",
    semester4: "",
    semester5: "",
    average: "",
  });

  const [alertVisible, setAlertVisible] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    }

    setAlertVisible(true); // Tampilkan alert setelah submit
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    navigate(isUpdate ? "/admin/tabelna" : "/form-na");
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
          type="success"
          title={isUpdate ? "Data Diperbarui" : "Berhasil"}
          message={
            isUpdate
              ? "Data Nilai Akademik berhasil diperbarui."
              : "Data Nilai Akademik berhasil dikirim."
          }
          buttonLabel="OK"
          onClose={handleAlertClose}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
      >
        {/* Input fields tetap sama persis seperti sebelumnya */}
        <div>
          <label className="block text-sm font-medium mb-5">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            placeholder="Anisa Rahmah Kusuma"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Angkatan</label>
          <input
            type="text"
            name="angkatan"
            value={formData.angkatan}
            onChange={handleChange}
            placeholder="14"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Kelas</label>
          <input
            type="text"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            placeholder="12.5"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Semester 1</label>
          <input
            type="text"
            name="semester1"
            value={formData.semester1}
            onChange={handleChange}
            placeholder="85.6"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Semester 2</label>
          <input
            type="text"
            name="semester2"
            value={formData.semester2}
            onChange={handleChange}
            placeholder="88.6"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Semester 3</label>
          <input
            type="text"
            name="semester3"
            value={formData.semester3}
            onChange={handleChange}
            placeholder="89.6"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Semester 4</label>
          <input
            type="text"
            name="semester4"
            value={formData.semester4}
            onChange={handleChange}
            placeholder="87.6"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Semester 5</label>
          <input
            type="text"
            name="semester5"
            value={formData.semester5}
            onChange={handleChange}
            placeholder="90.6"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">
            Rata-rata Nilai
          </label>
          <input
            type="text"
            name="average"
            value={formData.average}
            onChange={handleChange}
            placeholder="99.6"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

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
