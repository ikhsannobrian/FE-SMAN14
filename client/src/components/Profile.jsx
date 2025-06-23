import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { getProfileSiswa, updateProfileSiswa } from "../../service/authService";
import Alert from "./Alert";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    kelas: "",
    angkatan: "",
    noTelp: "",
    password: "",
  });

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfileSiswa(); // tidak perlu pakai ID
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          kelas: res.data.kelas || "",
          angkatan: res.data.angkatan || "",
          noTelp: res.data.noTelp || "",
          password: "", // default kosong
        });
      } catch (err) {
        console.error("Gagal mengambil profil siswa:", err);
      }
    };

    fetchProfile();
  }, []);

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
      await updateProfileSiswa(formData); // tidak pakai ID
      setShowAlert(true);
    } catch (err) {
      console.error("Gagal update profil:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col px-10 py-8 bg-base-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaUser className="mr-2" />
        My Profile
      </h2>

      {showAlert && (
        <Alert
          type="success"
          message="Profil berhasil diperbarui!"
          showCloseButton={true}
          onClose={() => setShowAlert(false)}
        />
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        {/* Nama */}
        <div>
          <label className="label">
            <span className="label-text">Nama</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Kelas */}
        <div>
          <label className="label">
            <span className="label-text">Kelas</span>
          </label>
          <input
            type="text"
            name="kelas"
            value={formData.kelas}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Angkatan */}
        <div>
          <label className="label">
            <span className="label-text">Angkatan</span>
          </label>
          <input
            type="text"
            name="angkatan"
            value={formData.angkatan}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Nomor Telepon */}
        <div>
          <label className="label">
            <span className="label-text">Nomor Telepon</span>
          </label>
          <input
            type="text"
            name="noTelp"
            value={formData.noTelp}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="label">
            <span className="label-text">Password (opsional)</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Kosongkan jika tidak ingin diubah"
            className="input input-bordered w-full"
          />
        </div>

        <div className="flex justify-end pt-6">
          <button type="submit" className="btn btn-success text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
