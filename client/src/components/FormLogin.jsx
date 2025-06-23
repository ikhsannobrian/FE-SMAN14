import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../service/authService";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      const { token, user } = res.data;

      console.log("User login:", user);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // redirect ke halaman dashboard atau sesuai role
      if (user.role.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/layanan-konseling");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 px-4 py-2 bg-white">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm md:mr-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center md:text-left">
          Sistem Informasi Manajemen
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
          SMAN 14 BEKASI
        </p>
        <h4 className="text-3xl font-bold mb-4 text-center md:text-left">
          Login
        </h4>

        <form onSubmit={handleLogin} className="flex flex-col gap-y-4">
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
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
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
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              // required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-600">
            Belum punya akun?
            <Link to="/register" className="ml-1 text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className="w-full max-w-sm mt-6 md:mt-0">
        <img src={Logo} alt="Logo SMAN 14" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default FormLogin;
