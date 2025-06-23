import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerSiswa } from "../../service/authService";
import Alert from "./Alert";

const FormRegister = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kelas, setKelas] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelp, setNoTelp] = useState("");

  const [alertConfig, setAlertConfig] = useState(null);
  const navigate = useNavigate();

  const closeAlert = () => setAlertConfig(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: nama,
        email,
        password,
        kelas,
        angkatan,
        alamat,
        noTelp,
      };

      await registerSiswa(payload);

      setAlertConfig({
        type: "success",
        title: "Registrasi Berhasil",
        message: "Akun siswa berhasil dibuat!",
        onClose: () => {
          closeAlert();
          navigate("/"); // navigasi ke halaman login
        },
      });
    } catch (error) {
      if (error.response) {
        setAlertConfig({
          type: "error",
          title: "Registrasi Gagal",
          message: error.response.data.message,
          onClose: closeAlert,
        });
      } else if (error.request) {
        setAlertConfig({
          type: "error",
          title: "Tidak Ada Respon",
          message: "Server tidak merespon. Coba lagi nanti.",
          onClose: closeAlert,
        });
      } else {
        setAlertConfig({
          type: "error",
          title: "Kesalahan",
          message: error.message,
          onClose: closeAlert,
        });
      }
    }
  };

  return (
    <div className="min-h-screen pt-8 flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-2 bg-white">
      {alertConfig && <Alert {...alertConfig} />}

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
          onSubmit={handleRegister}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

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

      <div className="w-full max-w-sm mt-6 md:mt-0">
        <img src={Logo} alt="Logo SMAN 14" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default FormRegister;
