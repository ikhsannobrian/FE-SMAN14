import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock } from "react-icons/fa";
import Alert from "../components/Alert"; // Pastikan path-nya benar

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirm: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirm } = formData;

    if (password !== confirm) {
      return setMessage("Password tidak cocok");
    }

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setSuccess(true);
      setMessage("Password berhasil direset!");
      setTimeout(() => navigate("/"), 2000); // Redirect ke login setelah 2 detik
    } catch (err) {
      setMessage(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col px-10 py-8 bg-base-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaLock className="mr-2" />
        Reset Password
      </h2>

      {message && (
        <Alert
          type={success ? "success" : "error"}
          message={message}
          showCloseButton={true}
          onClose={() => setMessage("")}
        />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        {/* Password Baru */}
        <div>
          <label className="label">
            <span className="label-text">Password Baru</span>
          </label>
          <input
            type="password"
            name="password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Konfirmasi Password */}
        <div>
          <label className="label">
            <span className="label-text">Konfirmasi Password</span>
          </label>
          <input
            type="password"
            name="confirm"
            className="input input-bordered w-full"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" className="btn btn-success text-white">
            Simpan Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
