import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import { createPelanggaranSiswa } from "../../service/pelanggaranSiswaService";
import { jenisPelanggaran } from "../../service/jenisPelanggaran";

const FormKesiswaan = ({ isEdit = false, initialData = {}, onSubmit }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    tanggal: "",
    pelanggaran: "",
    penjelasan: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (isEdit && initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [isEdit, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pelanggaran") {
      const selected = jenisPelanggaran.find((p) => p.nama === value);
      setFormData((prev) => ({
        ...prev,
        pelanggaran: value,
        poin: selected ? selected.poin : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEdit && typeof initialData._id !== "undefined") {
      try {
        await onSubmit(formData);
        setAlertMessage("Data pelanggaran berhasil diperbarui!");
        setShowAlert(true);
      } catch (err) {
        console.error("Gagal memperbarui data pelanggaran:", err);
        setAlertMessage("Gagal memperbarui data pelanggaran.");
        setShowAlert(true);
      }
    } else {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const adminId = user?.id || user?._id;

        const payload = [
          {
            admin: adminId,
            nama: formData.nama,
            kelas: formData.kelas,
            tanggal: formData.tanggal,
            pelanggaran: formData.pelanggaran,
            penjelasan: formData.penjelasan,
          },
        ];

        await createPelanggaranSiswa(payload);
        setAlertMessage("Data pelanggaran berhasil ditambahkan!");
        setShowAlert(true);
      } catch (err) {
        console.error("Gagal submit data pelanggaran:", err);
        setAlertMessage("Gagal menambahkan data pelanggaran.");
        setShowAlert(true);
      }
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    navigate("/admin/formkesiswaan");
  };

  return (
    <div className="py-6 px-4 bg-gray-50">
      {showAlert && (
        <Alert
          type="success"
          message={alertMessage}
          onClose={handleCloseAlert}
          showCloseButton={true}
        />
      )}

      <h1 className="text-2xl font-bold mb-6 text-center">
        {isEdit ? "Form Update Kesiswaan" : "Form Kesiswaan"}
      </h1>

      <form
        className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md space-y-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium mb-2">Nama</label>
          <input
            type="text"
            name="nama"
            placeholder="Anisa Rahmah Kusuma"
            required
            value={formData.nama}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Kelas</label>
          <input
            type="text"
            placeholder="12.5"
            name="kelas"
            required
            value={formData.kelas}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Tanggal Pelanggaran
          </label>
          <input
            type="date"
            name="tanggal"
            required
            value={formData.tanggal}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Pelanggaran</label>
          <select
            name="pelanggaran"
            required
            value={formData.pelanggaran}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="">Pilih Pelanggaran</option>
            {jenisPelanggaran.map((item) => (
              <option key={item.nama} value={item.nama}>
                {item.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Penjelasan</label>
          <input
            type="text"
            placeholder="Atribut tidak lengkap"
            name="penjelasan"
            required
            value={formData.penjelasan}
            onChange={handleChange}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {isEdit && (
          <div className="text-left">
            <button
              type="button"
              onClick={() => navigate("/admin/tabelpelanggaran")}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Kembali ke Tabel Pelanggaran Siswa
            </button>
          </div>
        )}

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow"
          >
            {isEdit ? "Ubah" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormKesiswaan;
