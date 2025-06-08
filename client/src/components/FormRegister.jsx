import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const FormRegister = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kelas, setKelas] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");

  return (
    <div className="min-h-screen pt-8 flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-2 bg-white">
      {/* Form kiri */}
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg md:mr-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center md:text-left">
          Sistem Informasi Manajemen
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
          SMAN 14 BEKASI
        </p>
        <h4 className="text-3xl font-bold mb-4 text-center md:text-left">
          Register
        </h4>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Nama */}
          <div>
            <label
              htmlFor="nama"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama
            </label>
            <input
              type="text"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              required
              placeholder="Nama"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Kelas */}
          <div>
            <label
              htmlFor="kelas"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kelas
            </label>
            <input
              type="text"
              id="kelas"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              required
              placeholder="Kelas"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Angkatan */}
          <div>
            <label
              htmlFor="angkatan"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Angkatan
            </label>
            <input
              type="text"
              id="angkatan"
              value={angkatan}
              onChange={(e) => setAngkatan(e.target.value)}
              required
              placeholder="Angkatan"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* No. Telepon */}
          <div>
            <label
              htmlFor="noTelp"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              No. Telepon
            </label>
            <input
              type="text"
              id="noTelp"
              value={noTelp}
              onChange={(e) => setNoTelp(e.target.value)}
              required
              placeholder="No. Telepon"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Alamat (1 baris penuh) */}
          <div className="md:col-span-2">
            <label
              htmlFor="alamat"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alamat
            </label>
            <input
              type="text"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              required
              placeholder="Alamat lengkap"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Tombol Submit (1 baris penuh) */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Register
            </button>
            <p className="text-sm text-center text-gray-600 pt-4">
              Sudah punya akun?
              <Link to="/" className="ml-1 text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Logo kanan */}
      <div className="w-full max-w-sm mt-6 md:mt-0">
        <img src={Logo} alt="Logo SMAN 14" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default FormRegister;
