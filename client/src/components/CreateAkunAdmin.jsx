import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { registerAdmin } from "../../service/authService"; // pastikan path ini sesuai struktur project kamu

const CreateAkunAdmin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "", // diganti dari nama ke name
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
      await registerAdmin(formData); // kirim data dengan field name
      setShowAlert(true);
      setErrorMessage("");

      // reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // redirect setelah 2 detik
      setTimeout(() => {
        navigate("/admin/createadmin"); // sesuaikan dengan route kamu
      }, 2000);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error?.response?.data?.message || "Gagal membuat akun admin."
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
          message="Akun admin berhasil dibuat!"
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
            name="name" // harus "name", bukan "nama"
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
            placeholder="admin123"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAkunAdmin;
