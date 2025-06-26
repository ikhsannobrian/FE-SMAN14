import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "./Alert";
import {
  registerAdmin,
  updateAdmin,
  getAllAdmin,
} from "../../service/authService";

const CreateAkunAdmin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // ambil ID dari URL jika ada
  const isUpdate = !!id;

  useEffect(() => {
    if (isUpdate) {
      const fetchAdmin = async () => {
        try {
          const response = await getAllAdmin();
          const admin = response.data.find((a) => a._id === id);

          if (admin) {
            setFormData({
              name: admin.name || "",
              email: admin.user?.email || "",
              password: "", // kosongkan saat update
            });
          } else {
            setErrorMessage("Admin tidak ditemukan");
          }
        } catch (err) {
          console.error("Gagal ambil admin:", err);
          setErrorMessage("Gagal memuat data admin.");
        }
      };

      fetchAdmin();
    }
  }, [id, isUpdate]);

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
      if (isUpdate) {
        await updateAdmin(id, formData);
      } else {
        await registerAdmin(formData);
        setFormData({ name: "", email: "", password: "" });
      }

      setShowAlert(true);
      setErrorMessage("");

      if (isUpdate) {
        navigate("/admin/adminlist");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setErrorMessage(
        error?.response?.data?.message ||
          "Gagal memproses permintaan. Coba lagi."
      );
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="py-6 px-4 bg-gray-50">
      {showAlert && (
        <Alert
          type="success"
          message={
            isUpdate
              ? "Akun admin berhasil diperbarui!"
              : "Akun admin berhasil dibuat!"
          }
          onClose={handleCloseAlert}
          showCloseButton={true}
        />
      )}

      {errorMessage && (
        <Alert type="error" message={errorMessage} showCloseButton={true} />
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
      >
        <div>
          <label className="block text-sm font-medium mb-2">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nama Admin"
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
            placeholder="admin123@gmail.com"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={
              isUpdate ? "Biarkan kosong jika tidak diubah" : "admin123"
            }
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
            {...(!isUpdate && { required: true })}
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
          >
            {isUpdate ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAkunAdmin;
