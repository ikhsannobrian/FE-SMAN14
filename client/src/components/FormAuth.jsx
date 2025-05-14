import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormInput from "./Form/FormInput";
import Logo from "../assets/logo.png";
import Alert from "./Alert";

const FormAuth = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAdminLogin = location.pathname === "/login-admin";
  const isRegister = location.pathname === "/register";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      // Proses register
      setAlertVisible(true); // Tampilkan alert
    } else {
      // Proses login
      if (isAdminLogin) {
        navigate("/admin");
      } else {
        navigate("/layanan-konseling");
      }
    }
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
    // Tetap di halaman register setelah alert ditutup
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-10 bg-white">
      {/* Alert untuk register berhasil */}
      {alertVisible && (
        <Alert
          type="success"
          title="Registrasi Berhasil"
          message="Akun Anda berhasil dibuat"
          buttonLabel="OK"
          onClose={handleAlertClose}
        />
      )}

      {/* Form kiri */}
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm md:mr-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center md:text-left">
          Sistem Informasi Manajemen
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
          SMAN 14 BEKASI
        </p>
        <h4 className="text-3xl font-bold mb-4 text-center md:text-left">
          {isRegister ? "Register" : "Login"}
        </h4>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          {isRegister && (
            <FormInput
              Label="Name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <FormInput
            Label="Username"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormInput
            Label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Link to="/" className="text-sm hover:underline text-blue-500">
            Back to home page
          </Link>

          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            {isRegister ? "Register" : "Login"}
          </button>

          {!isAdminLogin && (
            <p className="text-sm text-center text-gray-600">
              {isRegister ? (
                <>
                  Sudah ada akun?
                  <Link
                    to="/login"
                    className="ml-1 text-blue-500 hover:underline"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  Belum punya akun?
                  <Link
                    to="/register"
                    className="ml-1 text-blue-500 hover:underline"
                  >
                    Register
                  </Link>
                </>
              )}
            </p>
          )}
        </form>
      </div>

      {/* Logo kanan */}
      <div className="w-full max-w-sm mt-6 md:mt-0">
        <img src={Logo} alt="Logo SMAN 14" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default FormAuth;
