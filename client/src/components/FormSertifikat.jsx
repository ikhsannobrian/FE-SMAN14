import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { createSertifikat } from "../../service/sertifikat";
import axios from "axios";

const FormSertifikat = ({ initialData = {}, onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdate = location.pathname.includes("/admin");

  const [formData, setFormData] = useState({
    jenissertifikat: "",
    bidanglomba: "",
    penyelenggaralomba: "",
    mulailomba: "",
    selesailomba: "",
    tingkatlomba: "",
    uploadSertifikat: null,
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState(null);
  const [siswaId, setSiswaId] = useState("");

  // Ambil siswaId hanya jika BUKAN update
  useEffect(() => {
    const fetchSiswaId = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.siswaId) return;

        const res = await axios.get(
          `http://localhost:5000/api/auth/siswa/${user.siswaId}`
        );
        setSiswaId(res.data._id);
      } catch (err) {
        console.error("Gagal mengambil siswaId:", err);
      }
    };

    if (!isUpdate) {
      fetchSiswaId();
    }
  }, [isUpdate]);

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        jenissertifikat: initialData.jenissertifikat || "",
        bidanglomba: initialData.bidanglomba || "",
        penyelenggaralomba: initialData.penyelenggaralomba || "",
        mulailomba: initialData.mulailomba
          ? new Date(initialData.mulailomba).toISOString().split("T")[0]
          : "",
        selesailomba: initialData.selesailomba
          ? new Date(initialData.selesailomba).toISOString().split("T")[0]
          : "",
        tingkatlomba: initialData.tingkatlomba || "",
        uploadSertifikat: null,
      }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "uploadSertifikat") {
      setFormData((prev) => ({ ...prev, uploadSertifikat: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!siswaId && !isUpdate) {
      setError("Siswa ID belum tersedia.");
      return;
    }

    try {
      const finalFormData = new FormData();
      if (!isUpdate) {
        finalFormData.append("siswa", siswaId);
      }
      finalFormData.append("jenissertifikat", formData.jenissertifikat);
      finalFormData.append("bidanglomba", formData.bidanglomba);
      finalFormData.append("penyelenggaralomba", formData.penyelenggaralomba);
      finalFormData.append("mulailomba", formData.mulailomba);
      finalFormData.append("selesailomba", formData.selesailomba);
      finalFormData.append("tingkatlomba", formData.tingkatlomba);

      if (formData.uploadSertifikat) {
        finalFormData.append("uploadSertifikat", formData.uploadSertifikat);
      }

      if (onSubmit) {
        await onSubmit(finalFormData);
      } else {
        await createSertifikat(finalFormData);
      }

      setAlertVisible(true);
      setFormData({
        jenissertifikat: "",
        bidanglomba: "",
        penyelenggaralomba: "",
        mulailomba: "",
        selesailomba: "",
        tingkatlomba: "",
        uploadSertifikat: null,
      });
    } catch (err) {
      console.error("Submit error:", err);
      setError("Gagal menyimpan data. Silakan coba lagi.");
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
        <div>
          <label className="block text-sm font-medium mb-5">
            Jenis Sertifikat
          </label>
          <select
            name="jenissertifikat"
            required
            value={formData.jenissertifikat}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled></option>
            <option value="Akademik">Akademik</option>
            <option value="Non-Akademik">Non-Akademik</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">Bidang Lomba</label>
          <input
            type="text"
            name="bidanglomba"
            required
            value={formData.bidanglomba}
            onChange={handleChange}
            placeholder="Futsal / Matematika"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">
            Penyelenggara Perlombaan
          </label>
          <input
            type="text"
            name="penyelenggaralomba"
            required
            value={formData.penyelenggaralomba}
            onChange={handleChange}
            placeholder="VISCO 2022 by AL-AZHAR SUMMARECON"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">
            Mulai Perlombaan
          </label>
          <input
            type="date"
            name="mulailomba"
            required
            value={formData.mulailomba}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">
            Selesai Perlombaan
          </label>
          <input
            type="date"
            name="selesailomba"
            required
            value={formData.selesailomba}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-5">
            Tingkat Lomba
          </label>
          <select
            name="tingkatlomba"
            required
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

        <div>
          <label className="block text-sm font-medium mb-5">
            Upload Sertifikat
          </label>
          <input
            type="file"
            accept="image/*"
            name="uploadSertifikat"
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
            to={isUpdate ? "/admin/tabelsertifikat" : "/layanan-konseling"}
            className="inline-block text-black-500 hover:text-blue-700 mb-2"
          >
            {isUpdate
              ? "Kembali ke Tabel Sertifikat"
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

export default FormSertifikat;
