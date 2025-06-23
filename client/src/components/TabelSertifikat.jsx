import { useState, useEffect } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { api } from "../../service/api";
import { deleteSertifikat } from "../../service/sertifikat";

// Fungsi format tanggal ke dd-mm-yyyy
const formatTanggal = (tanggalString) => {
  if (!tanggalString) return "-";
  const tanggal = new Date(tanggalString);
  const dd = String(tanggal.getDate()).padStart(2, "0");
  const mm = String(tanggal.getMonth() + 1).padStart(2, "0");
  const yyyy = tanggal.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const TabelSertifikat = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    kelas: "",
    angkatan: "",
    jenissertifikat: "",
    penyelenggaralomba: "",
    bidanglomba: "",
    mulailomba: "",
    selesailomba: "",
    tingkatlomba: "",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchData = async () => {
    try {
      const response = await api.get("/api/sertifikat");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data sertifikat:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus sertifikat ini?"
    );
    if (!confirmDelete) return;
    try {
      await deleteSertifikat(id);
      alert("Sertifikat berhasil dihapus.");
      fetchData(); // refresh data
    } catch (error) {
      console.error("Gagal menghapus sertifikat:", error);
      alert("Terjadi kesalahan saat menghapus.");
    }
  };

  const filtered = data.filter((item) =>
    Object.entries(search).every(([key, val]) => {
      if (!val) return true;
      if (["name", "kelas", "angkatan"].includes(key)) {
        return item.siswa?.[key]?.toLowerCase().includes(val.toLowerCase());
      }
      return item[key]?.toLowerCase().includes(val.toLowerCase());
    })
  );

  const displayedData =
    rowsPerPage === "all" ? filtered : filtered.slice(0, Number(rowsPerPage));

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Sertifikat</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="rows" className="text-sm font-medium">
            Show
          </label>
          <select
            id="rows"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">All</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full text-sm text-left rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-blue-400 text-white text-sm">
              <th className="px-3 py-2 font-semibold">No</th>
              <th className="px-3 py-2 font-semibold">
                Nama
                <div>
                  <input
                    type="text"
                    placeholder="Masukkan Nama"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, name: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Kelas
                <div>
                  <input
                    type="text"
                    placeholder="Masukkan Kelas"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, kelas: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Angkatan
                <div>
                  <input
                    type="text"
                    placeholder="Masukkan Angkatan"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, angkatan: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Jenis Sertifikat
                <div>
                  <select
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, jenissertifikat: e.target.value })
                    }
                  >
                    <option value="">Pilih</option>
                    <option value="Akademik">Akademik</option>
                    <option value="Non-Akademik">Non-Akademik</option>
                  </select>
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Bidang Lomba
                <div>
                  <input
                    type="text"
                    placeholder="Masukkan Bidang"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, bidanglomba: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Penyelenggara
                <div>
                  <input
                    type="text"
                    placeholder="Masukkan Penyelenggara"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({
                        ...search,
                        penyelenggaralomba: e.target.value,
                      })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Mulai Lomba
                <div>
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, mulailomba: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Selesai Lomba
                <div>
                  <input
                    type="text"
                    placeholder="DD-MM-YYYY"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, selesailomba: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Tingkat
                <div>
                  <select
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, tingkatlomba: e.target.value })
                    }
                  >
                    <option value="">Pilih</option>
                    <option value="Kota">Kota</option>
                    <option value="Provinsi">Provinsi</option>
                    <option value="Nasional">Nasional</option>
                    <option value="Internasional">Internasional</option>
                  </select>
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, idx) => (
              <tr
                key={`${item._id}-${idx}`}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2">{item.siswa?.name || "-"}</td>
                <td className="px-3 py-2">{item.siswa?.kelas || "-"}</td>
                <td className="px-3 py-2">{item.siswa?.angkatan || "-"}</td>
                <td className="px-3 py-2">{item.jenissertifikat}</td>
                <td className="px-3 py-2">{item.bidanglomba}</td>
                <td className="px-3 py-2">{item.penyelenggaralomba}</td>
                <td className="px-3 py-2">{formatTanggal(item.mulailomba)}</td>
                <td className="px-3 py-2">
                  {formatTanggal(item.selesailomba)}
                </td>
                <td className="px-3 py-2">{item.tingkatlomba}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <EyeIcon
                      className="h-5 w-5 text-blue-600 cursor-pointer"
                      title="Lihat Gambar"
                      onClick={() =>
                        window.open(item.uploadSertifikat || "", "_blank")
                      }
                    />
                    <Link to={`/admin/updatesertifikat/${item._id}`}>
                      <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-blue-800 cursor-pointer" />
                    </Link>
                    <TrashIcon
                      className="h-5 w-5 text-red-600 cursor-pointer"
                      title="Hapus Sertifikat"
                      onClick={() => handleDelete(item._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {displayedData.length === 0 && (
              <tr>
                <td colSpan={11} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelSertifikat;
