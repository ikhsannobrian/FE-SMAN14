import { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "./Form/FormInput";
import Alert from "./Alert";

const FormUpdateAS = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika update akun siswa bisa ditambahkan di sini
    setShowAlert(true);

    // Reset form (opsional)
    // setEmail("");
    // setPassword("");
    // setName("");
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-4 pt-6 bg-white">
      {showAlert && (
        <Alert
          type="success"
          message="Akun siswa berhasil diperbarui!"
          onClose={handleCloseAlert}
          showCloseButton={true}
        />
      )}

      {/* Form kiri */}
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm md:mr-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center md:text-left">
          UPDATE AKUN SISWA
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center md:text-left">
          SMAN 14 BEKASI
        </p>

        <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
          <FormInput
            Label="Name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormInput
            Label="Username"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            Label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Ubah
          </button>

          <Link to="/admin/userlist">
            <p className="text-sm text-center text-gray-600 hover:text-blue-500 hover:underline transition-all">
              Kembali Ke User List
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default FormUpdateAS;
