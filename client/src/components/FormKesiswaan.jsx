import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const FormKesiswaan = ({ isEdit = false, initialData = {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    tanggal: "",
    pelanggaran: "",
    penjelasan: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (isEdit && initialData && Object.keys(initialData).length > 0) {
      console.log("Initial data received:", initialData);
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [isEdit, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      console.log("Updating data:", formData);
      // Tambahkan logika update di sini
      setAlertMessage("Data pelanggaran berhasil diperbarui!");
    } else {
      console.log("Submitting data:", formData);
      // Tambahkan logika tambah di sini
      setAlertMessage("Data pelanggaran berhasil ditambahkan!");
    }
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate(isEdit ? "/admin/tabelpelanggaran" : "/admin/formkesiswaan");
  };

  return (
    <div className="py-6 px-4 bg-gray-50">
      {showAlert && (
        <Alert
          type="success"
          message={alertMessage}
          onClose={handleCloseAlert}
          showCloseButton={true}
        />
      )}

      <h1 className="text-2xl font-bold mb-6 text-center">
        {isEdit ? "Form Update Kesiswaan" : "Form Kesiswaan"}
      </h1>

      <form
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium mb-2">Nama</label>
          <input
            type="text"
            name="nama"
            placeholder="Anisa Rahmah Kusuma"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kelas</label>
          <input
            type="text"
            placeholder="12.5"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tanggal Pelanggaran
          </label>
          <input
            type="date"
            name="tanggal"
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Pelanggaran</label>
          <select
            name="pelanggaran"
            value={formData.pelanggaran}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="">Pilih Pelanggaran</option>
            <option value="Tidak Menggunakan Atribut">
              Tidak Menggunakan Atribut
            </option>
            <option value="Datang Terlambat">Datang Terlambat</option>
            <option value="Tidak Mengikuti Upacara">
              Tidak Mengikuti Upacara
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Penjelasan</label>
          <input
            type="text"
            placeholder="Atribut tidak lengkap"
            name="penjelasan"
            value={formData.penjelasan}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {isEdit && (
          <div className="text-right">
            <a
              href="/admin/tabelpelanggaran"
              className="inline-block text-black-500 hover:text-blue-700 mb-2"
            >
              Kembali ke Tabel Pelanggaran
            </a>
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
          >
            {isEdit ? "Ubah" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormKesiswaan;
