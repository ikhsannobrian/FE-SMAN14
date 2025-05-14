import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "./Alert";

const CreateAkunAdmin = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lakukan proses pembuatan akun di sini (misalnya API call)
    // Setelah berhasil, tampilkan alert
    setShowAlert(true);

    // Reset form
    setFormData({
      nama: "",
      username: "",
      password: "",
    });
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="py-6 px-4 bg-gray-50">
      {showAlert && (
        <Alert
          type="success"
          message="Akun berhasil dibuat!"
          onClose={handleCloseAlert}
          showCloseButton={true} // Pastikan Alert component mendukung prop ini
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
            placeholder="chanis14"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium mb-5">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="chanis14"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-5">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="chaniscantik"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit */}
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
