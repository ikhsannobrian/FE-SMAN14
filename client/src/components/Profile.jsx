import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const majors = ["Informatika", "Sistem Informasi", "Teknik Komputer"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full min-h-screen flex flex-col px-10 py-8 bg-base-100">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaUser className="mr-2" />
        My Profile
      </h2>

      <form className="flex flex-col gap-6 w-full">
        {/* Nama */}
        <div>
          <label className="label">
            <span className="label-text">Nama</span>
          </label>
          <input
            type="text"
            name="nama"
            placeholder="Ikhsan Nobrian"
            value=""
            className="input input-bordered w-full"
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
            placeholder="ikhsannobrian@gmail.com"
            value=""
            className="input input-bordered w-full"
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
            placeholder="XII IPA 3"
            value=""
            className="input input-bordered w-full"
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
            placeholder="14"
            value=""
            className="input input-bordered w-full"
          />
        </div>
        {/* No Telepon */}
        <div>
          <label className="label">
            <span className="label-text">Nomor Telepon</span>
          </label>
          <input
            type="text"
            name="noTelps"
            placeholder="08123456789"
            value=""
            className="input input-bordered w-full"
          />
        </div>

        {/* Buttons */}
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
