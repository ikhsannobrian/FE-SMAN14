import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Alert from "./Alert";
import { getAllSiswa, updateSiswa } from "../../service/authService";

const FormUpdateAS = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    noTelp: "",
    kelas: "",
    angkatan: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // ambil id dari URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const res = await getAllSiswa();
        const siswa = res.data.data.find((item) => item._id === id);
        if (siswa) {
          setFormData({
            name: siswa.name,
            email: siswa.user?.email || "",
            password: "",
            noTelp: siswa.noTelp,
            kelas: siswa.kelas,
            angkatan: siswa.angkatan,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
        setLoading(false);
      }
    };

    fetchSiswa();
  }, [id]);

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
      await updateSiswa(id, formData);
      setShowAlert(true);
    } catch (error) {
      console.error("Gagal update akun siswa:", error);
    }
  };

  const handleCloseAlert = () => {
    navigate("/admin/userlist"); // ⬅️ Navigasi ke userlist
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="py-6 px-4 bg-gray-50 min-h-screen">
      {showAlert && (
        <Alert
          type="success"
          message="Akun siswa berhasil diperbarui!"
          onClose={handleCloseAlert}
          showCloseButton={true}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-1">
          UPDATE AKUN SISWA
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">SMAN 14 BEKASI</p>

        <div>
          <label className="block text-sm font-medium mb-2">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Siswa"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="siswa123@gmail.com"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Kosongkan jika tidak ingin mengubah"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">No. Telepon</label>
          <input
            type="text"
            name="noTelp"
            value={formData.noTelp}
            onChange={handleChange}
            placeholder="08xxxxxxxxxx"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kelas</label>
          <input
            type="text"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            placeholder="Contoh: XII.1"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Angkatan</label>
          <input
            type="text"
            name="angkatan"
            value={formData.angkatan}
            onChange={handleChange}
            placeholder="Contoh: 14"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <Link
            to="/admin/userlist"
            className="text-sm text-gray-600 hover:text-blue-500 hover:underline"
          >
            Kembali ke User List
          </Link>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
          >
            Ubah
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUpdateAS;
