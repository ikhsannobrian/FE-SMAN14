import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  getAllJanjiKonseling,
  updateStatusJanjiKonseling,
  deleteJanjiKonseling,
} from "../../service/janjianKonselingService";

const formatTanggal = (tanggal) => {
  const date = new Date(tanggal);
  return new Intl.DateTimeFormat("id-ID").format(date);
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

  const handleStatusUpdate = useCallback(async (id, newStatus) => {
    try {
      await updateStatusJanjiKonseling(id, newStatus);
      setData((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Gagal update status:", error);
    }
  }, []);

  const handleDelete = useCallback(async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await deleteJanjiKonseling(id);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  }, []);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const namaMatch = search.nama
        ? item.siswa?.name?.toLowerCase().includes(search.nama.toLowerCase())
        : true;

      const kelasMatch = search.kelas
        ? item.siswa?.kelas?.toLowerCase().includes(search.kelas.toLowerCase())
        : true;

      const tanggalMatch = search.tanggalJanji
        ? formatTanggal(item.tanggalJanji).includes(search.tanggalJanji)
        : true;

      const guruBKMatch = search.guruBK
        ? item.guruBK?.toLowerCase().includes(search.guruBK.toLowerCase())
        : true;

      const statusMatch = search.status
        ? item.status?.toLowerCase() === search.status.toLowerCase()
        : true;

      return (
        namaMatch && kelasMatch && tanggalMatch && guruBKMatch && statusMatch
      );
    });
  }, [data, search]);

  const displayedData = useMemo(() => {
    return rowsPerPage === "all"
      ? filtered
      : filtered.slice(0, Number(rowsPerPage));
  }, [filtered, rowsPerPage]);

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
                <input
                  type="text"
                  className="w-full mt-1 px-2 py-1 text-xs rounded text-black"
                  placeholder="Cari nama"
                  onChange={(e) =>
                    setSearch((prev) => ({ ...prev, nama: e.target.value }))
                  }
                />
              </th>
              <th className="px-3 py-2 font-semibold">
                Kelas
                <input
                  type="text"
                  className="w-full mt-1 px-2 py-1 text-xs rounded text-black"
                  placeholder="Cari kelas"
                  onChange={(e) =>
                    setSearch((prev) => ({ ...prev, kelas: e.target.value }))
                  }
                />
              </th>
              <th className="px-3 py-2 font-semibold">
                Tanggal
                <input
                  type="text"
                  className="w-full mt-1 px-2 py-1 text-xs rounded text-black"
                  placeholder="dd/mm/yyyy"
                  onChange={(e) =>
                    setSearch((prev) => ({
                      ...prev,
                      tanggalJanji: e.target.value,
                    }))
                  }
                />
              </th>
              <th className="px-3 py-2 font-semibold">
                Guru BK
                <select
                  className="w-full mt-1 px-2 py-1 text-xs rounded text-black"
                  onChange={(e) =>
                    setSearch((prev) => ({ ...prev, guruBK: e.target.value }))
                  }
                >
                  <option value="">Semua</option>
                  <option value="Dini Nursyahida">Dini Nursyahida</option>
                  <option value="Lina Erliana">Lina Erliana</option>
                  <option value="Tari">Tari</option>
                </select>
              </th>
              <th className="px-3 py-2 font-semibold">
                Status
                <select
                  className="w-full mt-1 px-2 py-1 text-xs rounded text-black"
                  onChange={(e) =>
                    setSearch((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="">Semua</option>
                  <option value="Menunggu">Menunggu</option>
                  <option value="Disetujui">Disetujui</option>
                  <option value="Tidak Disetujui">Tidak Disetujui</option>
                </select>
              </th>
              <th className="px-3 py-2 font-semibold">Jam</th>
              <th className="px-3 py-2 font-semibold">No. Telp</th>
              <th className="px-3 py-2 font-semibold">Pesan</th>
              <th className="px-3 py-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.length > 0 ? (
              displayedData.map((item, idx) => (
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
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-white ${
                          item.status === "Disetujui"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {item.status}
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
              ))
            ) : (
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
