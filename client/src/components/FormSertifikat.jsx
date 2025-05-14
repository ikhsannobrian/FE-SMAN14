import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const FormSertifikat = ({ initialData = {}, onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdate = location.pathname.includes("/admin");

  const [formData, setFormData] = useState({
    nama: "",
    jenissertifikat: "",
    jenislomba: "",
    penyelenggaralomba: "",
    mulailomba: "",
    selesailomba: "",
    tingkatlomba: "",
    bukti: null,
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bukti") {
      setFormData((prev) => ({ ...prev, bukti: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setAlertVisible(true); // Tampilkan alert setelah submit berhasil
    } catch (err) {
      setError("Gagal menyimpan data. Silakan coba lagi.");
      console.error("Submit error:", err);
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    navigate(isUpdate ? "/admin/tabelsertifikat" : "/form-sertifikat");
  };

  return (
    <div className="py-6 px-4 bg-gray-50">
      {isUpdate && (
        <h1 className="text-2xl font-bold text-center mb-6">
          Form Update Sertifikat
        </h1>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      {alertVisible && (
        <Alert
          type="success"
          title={isUpdate ? "Data Diperbarui" : "Berhasil"}
          message={
            isUpdate
              ? "Sertifikat berhasil diperbarui."
              : "Sertifikat berhasil dikirim."
          }
          buttonLabel="OK"
          onClose={handleAlertClose}
        />
      )}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
      >
        {/* Nama */}
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

        {/* Jenis Sertifikat */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Jenis Sertifikat
          </label>
          <select
            name="jenissertifikat"
            value={formData.jenissertifikat}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled></option>
            <option value="Akademik">Akademik</option>
            <option value="Non-Akademik">Non-Akademik</option>
          </select>
        </div>

        {/* Jenis Olahraga / Akademik */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Jenis Olahraga / Akademik
          </label>
          <input
            type="text"
            name="jenislomba"
            value={formData.jenislomba}
            onChange={handleChange}
            placeholder="Futsal / Matematika"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Penyelenggara */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Penyelenggara Perlombaan
          </label>
          <input
            type="text"
            name="penyelenggaralomba"
            value={formData.penyelenggaralomba}
            onChange={handleChange}
            placeholder="VISCO 2022 by AL-AZHAR SUMMARECON"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Mulai */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Mulai Perlombaan
          </label>
          <input
            type="date"
            name="mulailomba"
            value={formData.mulailomba}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Selesai */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Selesai Perlombaan
          </label>
          <input
            type="date"
            name="selesailomba"
            value={formData.selesailomba}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tingkat Lomba */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Tingkat Lomba
          </label>
          <select
            name="tingkatlomba"
            value={formData.tingkatlomba}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled></option>
            <option value="Kota">Kota</option>
            <option value="Provinsi">Provinsi</option>
            <option value="Nasional">Nasional</option>
            <option value="Internasional">Internasional</option>
          </select>
        </div>

        {/* Upload Sertifikat */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Upload Sertifikat
          </label>
          <input
            type="file"
            accept="image/*"
            name="bukti"
            onChange={handleChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {/* Link kembali */}
        <div className="text-right">
          <Link
            to={isUpdate ? "/tabel-sertifikat" : "/layanan-konseling"}
            className="inline-block text-black-500 hover:text-blue-700 mb-2"
          >
            {isUpdate
              ? "Kembali ke Tabel Sertifikat"
              : "Kembali ke halaman layanan"}
          </Link>
        </div>

        {/* Submit */}
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

export default FormSertifikat;
