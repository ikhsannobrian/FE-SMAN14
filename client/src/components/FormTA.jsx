import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ pastikan axios diimport
import Alert from "./Alert";
import { createTracerAlumni } from "../../service/tracerAlumni";

const FormTA = ({ initialData = {}, onSubmit = createTracerAlumni }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdate = location.pathname.includes("/admin");

  const [formData, setFormData] = useState({
    tahunLulus: "",
    kategori: "",
    namaInstansi: "",
    programStudi: "",
    uploadBukti: null,
    siswa: "", // tambahkan field siswa default
  });

  const [siswa, setSiswa] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Ambil user dari localStorage sekali saja
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Hanya ambil data siswa satu kali saat mount jika bukan update dan user SISWA
  useEffect(() => {
    const fetchSiswa = async () => {
      console.log("User dari localStorage:", user);
      try {
        if (!isUpdate && user?.role === "SISWA") {
          const res = await axios.get(
            `http://localhost:8080/api/auth/siswa/${user.siswaId}`
          );
          setSiswa(res.data);
          setFormData((prev) => ({
            ...prev,
            siswa: res.data._id, // ✅ tambahkan id siswa langsung
          }));
        }
      } catch (err) {
        console.error("Gagal ambil siswa:", err);
      }
    };

    fetchSiswa();
  }, []); // ✅ hanya jalan sekali saat mount

  // ✅ Set data awal hanya sekali kalau `initialData` tersedia (mode update)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "uploadBukti") {
      setFormData({ ...formData, uploadBukti: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const finalData = {
        ...formData,
        name: siswa.name,
        kelas: siswa.kelas,
        angkatan: siswa.angkatan,
      };

      await onSubmit(finalData);
      setAlertVisible(true);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Gagal menyimpan data. Silakan coba lagi.";
      setError(msg);
      console.error("Submit error:", msg);
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
            name="tahunLulus"
            required
            value={formData.tahunLulus}
            onChange={handleChange}
            placeholder="2021"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Kategori</label>
          <select
            name="kategori"
            required
            value={formData.kategori}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Pilih kategori
            </option>
            <option value="perguruan tinggi negeri">
              Perguruan Tinggi Negeri
            </option>
            <option value="perguruan tinggi swasta">
              Perguruan Tinggi Swasta
            </option>
            <option value="wirausaha">Wirausaha</option>
            <option value="sekolah kedinasan">Sekolah Kedinasan</option>
            <option value="karyawan swasta">Karyawan Swasta</option>
            <option value="pegawai negeri">Pegawai Negeri</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Instansi</label>
          <input
            type="text"
            name="namaInstansi"
            required
            value={formData.namaInstansi}
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
            name="programStudi"
            required
            value={formData.programStudi}
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
            name="uploadBukti"
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
