import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  getAllJanjiKonseling,
  updateStatusJanjiKonseling,
  deleteJanjiKonseling,
} from "../../service/janjianKonselingService";

// Fungsi untuk ubah ISO date ke dd-mm-yyyy
const formatTanggal = (tanggal) => {
  const date = new Date(tanggal);
  return new Intl.DateTimeFormat("id-ID").format(date); // output: dd/mm/yyyy
};

const TabelJK = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    nama: "",
    kelas: "",
    tanggalJanji: "",
    guruBK: "",
    status: "",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllJanjiKonseling();
        setData(result);
      } catch (err) {
        console.error("Gagal mengambil data janji konseling:", err);
      }
    };
    fetchData();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateStatusJanjiKonseling(id, newStatus);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  };

  const filtered = data.filter((item) =>
    Object.entries(search).every(([key, val]) => {
      if (key === "nama")
        return item.siswa?.name?.toLowerCase().includes(val.toLowerCase());
      if (key === "kelas")
        return item.siswa?.kelas?.toLowerCase().includes(val.toLowerCase());
      if (key === "tanggalJanji")
        return formatTanggal(item.tanggalJanji)
          .toLowerCase()
          .includes(val.toLowerCase());
      return item[key]?.toLowerCase().includes(val.toLowerCase());
    })
  );
  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirm) return;

    try {
      await deleteJanjiKonseling(id);
      // Refresh data setelah delete
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const displayedData =
    rowsPerPage === "all" ? filtered : filtered.slice(0, Number(rowsPerPage));

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Konseling</h1>
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
                    placeholder="Masukan Nama"
                    className="w-24 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, nama: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Kelas
                <div>
                  <input
                    type="text"
                    placeholder="XII.2"
                    className="w-24 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, kelas: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Tanggal
                <div>
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    className="w-24 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, tanggalJanji: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Guru BK
                <div>
                  <select
                    className="w-24 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, guruBK: e.target.value })
                    }
                  >
                    <option value="">Pilih</option>
                    <option value="Dini-Nursyahida">Dini Nursyahida</option>
                    <option value="Lina-Erliana">Lina Erliana</option>
                    <option value="Tari">Tari</option>
                  </select>
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Status
                <div>
                  <input
                    type="text"
                    placeholder="Status"
                    className="w-24 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, status: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">Jam</th>
              <th className="px-3 py-2 font-semibold">No. Telp</th>
              <th className="px-3 py-2 font-semibold">Pesan</th>
              <th className="px-3 py-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, idx) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2">{item.siswa?.name || "-"}</td>
                <td className="px-3 py-2">{item.siswa?.kelas || "-"}</td>
                <td className="px-3 py-2">
                  {formatTanggal(item.tanggalJanji)}
                </td>
                <td className="px-3 py-2">{item.guruBK}</td>
                <td className="px-3 py-2">
                  {item.status === "Menunggu" ? (
                    <div className="flex gap-1">
                      <button
                        onClick={() =>
                          handleStatusUpdate(item._id, "Disetujui")
                        }
                        className="bg-green-500 text-white px-2 py-1 rounded-full text-xs"
                      >
                        Setujui
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(item._id, "Tidak Disetujui")
                        }
                        className="bg-red-500 text-white px-2 py-1 rounded-full text-xs"
                      >
                        Tolak
                      </button>
                    </div>
                  ) : item.status === "Disetujui" ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Disetujui
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Tidak Disetujui
                    </span>
                  )}
                </td>
                <td className="px-3 py-2">{item.waktuJanji}</td>
                <td className="px-3 py-2">{item.siswa?.noTelp || "-"}</td>
                <td className="px-3 py-2">{item.keperluan}</td>
                <td className="px-3 py-2 flex gap-2">
                  <Link to={`/admin/updatejk/${item._id}`}>
                    <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                  </Link>
                  <TrashIcon
                    className="h-5 w-5 text-red-600 cursor-pointer"
                    onClick={() => handleDelete(item._id)}
                  />
                </td>
              </tr>
            ))}
            {displayedData.length === 0 && (
              <tr>
                <td colSpan={10} className="text-center py-4 text-gray-500">
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

export default TabelJK;
