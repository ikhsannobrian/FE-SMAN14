import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const FormTA = ({ initialData = {}, onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdate = location.pathname.includes("/admin");

  const [formData, setFormData] = useState({
    nama: "",
    angkatan: "",
    tahunlulus: "",
    kategori: "",
    instansi: "",
    programstudi: "",
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
      setFormData({ ...formData, bukti: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
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
    navigate(isUpdate ? "/admin/tabelta" : "/form-ta");
  };

  return (
    <div className="py-6 px-4 bg-gray-50">
      {isUpdate && (
        <h1 className="text-2xl font-bold text-center mb-6">
          Form Update Data Tracer Alumni
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
              ? "Data Tracer Alumni berhasil diperbarui."
              : "Data Tracer Alumni berhasil dikirim."
          }
          buttonLabel="OK"
          onClose={handleAlertClose}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
      >

        <div>
          <label className="block text-sm font-medium mb-5">Tahun Lulus</label>
          <input
            type="text"
            name="tahunlulus"
            value={formData.tahunlulus}
            onChange={handleChange}
            placeholder="2021"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Kategori</label>
          <select
            name="kategori"
            value={formData.kategori}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            <option value="Perguruan-Tinggi-Negri">
              Perguruan Tinggi Negeri
            </option>
            <option value="Perguruan-Tinggi-Swasta">
              Perguruan Tinggi Swasta
            </option>
            <option value="Sekolah-Kedinasan">Sekolah Kedinasan</option>
            <option value="Wirausaha">Wirausaha</option>
            <option value="Karyawan-Swasta">Karyawan Swasta</option>
            <option value="Pegawai-Negeri">Pegawai Negeri</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Instansi</label>
          <input
            type="text"
            name="instansi"
            value={formData.instansi}
            onChange={handleChange}
            placeholder="Universitas Indonesia"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">
            Program Studi / Bidang
          </label>
          <input
            type="text"
            name="programstudi"
            value={formData.programstudi}
            onChange={handleChange}
            placeholder="Teknik Mesin"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Upload bukti</label>
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

        <div className="text-right">
          <Link
            to={isUpdate ? "/admin/tabelta" : "/layanan-konseling"}
            className="inline-block text-black-500 hover:text-blue-700 mb-2"
          >
            {isUpdate
              ? "Kembali ke tabel tracer alumni"
              : "Kembali ke halaman layanan"}
          </Link>
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow disabled:opacity-50"
          >
            {isUpdate ? "Ubah" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTA;
