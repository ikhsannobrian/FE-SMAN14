import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { createJanjiKonseling } from "../../service/janjianKonselingService";
import axios from "axios";

const FormJK = ({ initialData = {}, onSubmit }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isUpdate = location.pathname.includes("/admin");

  const [formData, setFormData] = useState({
    tanggalJanji: "",
    waktuJanji: "",
    guruBK: "",
    keperluan: "",
    status: "", // ✅ Tambahkan status ke formData
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [siswaId, setSiswaId] = useState("");
  const [formError, setFormError] = useState(""); // nampung error form

  useEffect(() => {
    const fetchSiswaId = async () => {
      try {
        if (!isUpdate) {
          const user = JSON.parse(localStorage.getItem("user"));
          const res = await axios.get(
            `http://localhost:5000/api/auth/siswa/${user.siswaId}`
          );
          setSiswaId(res.data._id);
        } else {
          const siswa = initialData?.siswa?._id || initialData?.siswa || null;
          if (siswa) setSiswaId(siswa);
        }
      } catch (err) {
        console.error("Gagal mengambil siswaId:", err);
      }
    };

    fetchSiswaId();
  }, [initialData, isUpdate]);

  useEffect(() => {
    if (isUpdate && initialData) {
      setFormData({
        tanggalJanji: initialData.tanggalJanji || "",
        waktuJanji: initialData.waktuJanji || "",
        guruBK: initialData.guruBK || "",
        keperluan: initialData.keperluan || "",
        status: initialData.status || "", // ✅ Inisialisasi status dari data awal
      });
    }
  }, [initialData, isUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi semua field wajib diisi
    const { tanggalJanji, waktuJanji, guruBK, keperluan } = formData;

    if (
      tanggalJanji.trim() === "" ||
      waktuJanji.trim() === "" ||
      guruBK.trim() === "" ||
      keperluan.trim() === ""
    ) {
      setFormError("Semua field wajib diisi.");
      return;
    }

    // Jika mode update, status juga wajib diisi
    if (isUpdate && formData.status.trim() === "") {
      setFormError("Status wajib diisi.");
      return;
    }

    try {
      setFormError("");
      const payload = {
        siswa: siswaId,
        ...formData,
      };

      await onSubmit(payload);
      setAlertVisible(true);
    } catch (error) {
      setFormError("Terjadi kesalahan saat mengirim data.");
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    navigate(isUpdate ? "/admin/tabeljk" : "/layanan-konseling");
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
          duration={3000}
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
            name="tanggalJanji"
            value={formData.tanggalJanji}
            min={
              new Date(Date.now() + 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const day = selectedDate.getDay();
              // 0 = Sunday, 6 = Saturday
              if (day === 0 || day === 6) {
                alert("Hanya bisa memilih hari kerja (Senin - Jumat)");
                return;
              }
              handleChange(e);
            }}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Jam */}
        <div>
          <label className="block text-sm font-medium mb-2">Jam</label>
          <input
            type="time"
            name="waktuJanji"
            value={formData.waktuJanji}
            onChange={handleChange}
            min="07:00"
            max="16:00"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <small className="text-gray-500">
            Pilih waktu antara 07:00 dan 16:00 (interval 15 menit)
          </small>
        </div>

        {/* Guru BK */}
        <div>
          <label className="block text-sm font-medium mb-5">Guru BK</label>
          <select
            name="guruBK"
            value={formData.guruBK}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="" disabled>
              Pilih Guru BK
            </option>
            <option value="Dini Nursyahida">Dini Nursyahida</option>
            <option value="Lina Erliana">Lina Erliana</option>
            <option value="Tari">Tari</option>
          </select>
        </div>

        {/* Pesan */}
        <div>
          <label className="block text-sm font-medium mb-5">
            Pesan (Keluhan)
          </label>
          <textarea
            name="keperluan"
            rows="3"
            value={formData.keperluan}
            onChange={handleChange}
            placeholder="Tulis pesan atau keluhanmu di sini"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        {/* ✅ Status hanya ditampilkan saat update */}
        {isUpdate && (
          <div>
            <label className="block text-sm font-medium mb-5">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
            >
              <option value="">Pilih Status</option>
              <option value="Disetujui">Disetujui</option>
              <option value="Tidak Disetujui">Tidak Disetujui</option>
            </select>
          </div>
        )}

        {/* Error message */}
        {formError && (
          <div className="text-red-500 text-sm mb-2">{formError}</div>
        )}

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
