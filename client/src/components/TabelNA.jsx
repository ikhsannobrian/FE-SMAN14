import { useState, useEffect } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { api } from "../../service/api";
import { deleteNilaiAkademik } from "../../service/nilaiAkademik";

const TabelNA = () => {
  const [search, setSearch] = useState({
    nama: "",
    angkatan: "",
    kelas: "",
    rataRata: "",
  });

  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/nilaiAkademik");
        console.log("Data Nilai Akademik:", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      }
      return { key, direction: "ascending" };
    });
  };

  const filtered = data.filter((item) => {
    const siswa = item.siswa || {};
    const name = siswa.name || "";
    const angkatan = siswa.angkatan || "";
    const kelas = siswa.kelas || "";
    const rataRata = item.rataRata?.toString() || "";

    return (
      name.toLowerCase().includes(search.nama.toLowerCase()) &&
      angkatan.toLowerCase().includes(search.angkatan.toLowerCase()) &&
      kelas.toLowerCase().includes(search.kelas.toLowerCase()) &&
      rataRata.includes(search.rataRata)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortConfig.key === "rataRata") {
      const aVal = parseFloat(a[sortConfig.key]);
      const bVal = parseFloat(b[sortConfig.key]);
      if (sortConfig.direction === "ascending") return aVal - bVal;
      if (sortConfig.direction === "descending") return bVal - aVal;
    }
    return 0;
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirm) return;

    try {
      await deleteNilaiAkademik(id);
      // Refresh data setelah delete
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const displayedData =
    rowsPerPage === "all" ? sorted : sorted.slice(0, Number(rowsPerPage));

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Nilai Akademik</h1>
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
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black"
                    onChange={(e) =>
                      setSearch({ ...search, nama: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Angkatan
                <div>
                  <input
                    type="text"
                    placeholder="Angkatan"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black"
                    onChange={(e) =>
                      setSearch({ ...search, angkatan: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Kelas
                <div>
                  <input
                    type="text"
                    placeholder="Kelas"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black"
                    onChange={(e) =>
                      setSearch({ ...search, kelas: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">Semester 1</th>
              <th className="px-3 py-2 font-semibold">Semester 2</th>
              <th className="px-3 py-2 font-semibold">Semester 3</th>
              <th className="px-3 py-2 font-semibold">Semester 4</th>
              <th className="px-3 py-2 font-semibold">Semester 5</th>
              <th className="px-3 py-2 font-semibold">
                Rata-rata
                <div className="relative mt-1 w-40">
                  <input
                    type="text"
                    placeholder="Rata-rata"
                    className="w-full px-2 py-1 text-xs rounded bg-white text-black pr-6"
                    onChange={(e) =>
                      setSearch({ ...search, rataRata: e.target.value })
                    }
                  />
                  <div
                    className="absolute inset-y-0 right-1 flex items-center cursor-pointer"
                    onClick={() => handleSort("rataRata")}
                  >
                    {sortConfig.key === "rataRata" ? (
                      sortConfig.direction === "ascending" ? (
                        <ChevronUpIcon className="h-4 w-4 text-black" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4 text-black" />
                      )
                    ) : (
                      // Optional: show both icons if not sorted
                      <ChevronDownIcon className="h-4 w-4 text-black opacity-50" />
                    )}
                  </div>
                </div>
              </th>

              <th className="px-3 py-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, idx) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-3 py-2">{idx + 1}</td>
                <td>{item.siswa?.name || "-"}</td>
                <td>{item.siswa?.angkatan || "-"}</td>
                <td>{item.siswa?.kelas || "-"}</td>
                <td className="px-3 py-2">{item.semester1}</td>
                <td className="px-3 py-2">{item.semester2}</td>
                <td className="px-3 py-2">{item.semester3}</td>
                <td className="px-3 py-2">{item.semester4}</td>
                <td className="px-3 py-2">{item.semester5}</td>
                <td className="px-3 py-2">{item.rataRata}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/updatena/${item._id}`}>
                      <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-blue-800 cursor-pointer" />
                    </Link>
                    <TrashIcon
                      className="h-5 w-5 text-red-600 cursor-pointer"
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

export default TabelNA;
