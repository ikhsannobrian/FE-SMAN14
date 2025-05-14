import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const TabelNA = () => {
  const [search, setSearch] = useState({
    nama: "",
    angkatan: "",
    kelas: "",
    average: "",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

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

  const data = [
    {
      id: 1,
      nama: "Fauzan Arbhi",
      angkatan: "15",
      kelas: "XII.5",
      semester1: "85",
      semester2: "89",
      semester3: "87",
      semester4: "90",
      semester5: "92",
      average: "86",
    },
    {
      id: 2,
      nama: "Fanisa Rizki",
      angkatan: "15",
      kelas: "XII.5",
      semester1: "85",
      semester2: "89",
      semester3: "87",
      semester4: "90",
      semester5: "92",
      average: "87",
    },
    {
      id: 3,
      nama: "Nur Afra Fadhillah",
      angkatan: "15",
      kelas: "XII.5",
      semester1: "85",
      semester2: "89",
      semester3: "87",
      semester4: "90",
      semester5: "92",
      average: "89",
    },
    {
      id: 4,
      nama: "Ikhsan Nobrian",
      angkatan: "15",
      kelas: "XII.5",
      semester1: "85",
      semester2: "89",
      semester3: "87",
      semester4: "90",
      semester5: "92",
      average: "89",
    },
    {
      id: 5,
      nama: "Syakira Zahra",
      angkatan: "14",
      kelas: "XII.6",
      semester1: "85",
      semester2: "89",
      semester3: "87",
      semester4: "90",
      semester5: "92",
      average: "89",
    },
    {
      id: 6,
      nama: "Khairunnisa Rahmah",
      angkatan: "14",
      kelas: "XII.6",
      semester1: "85",
      semester2: "89",
      semester3: "87",
      semester4: "90",
      semester5: "92",
      average: "88",
    },
  ];

  const filtered = data.filter((item) =>
    Object.entries(search).every(([key, val]) =>
      item[key]?.toLowerCase().includes(val.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortConfig.key === "average") {
      const aVal = parseFloat(a[sortConfig.key]);
      const bVal = parseFloat(b[sortConfig.key]);

      if (sortConfig.direction === "ascending") return aVal - bVal;
      if (sortConfig.direction === "descending") return bVal - aVal;
    }
    return 0;
  });

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
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                    placeholder="XII.5"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
              <th
                className="px-3 py-2 font-semibold cursor-pointer"
                onClick={() => handleSort("average")}
              >
                Rata-rata
                {sortConfig.key === "average" &&
                  (sortConfig.direction === "ascending" ? (
                    <ChevronUpIcon className="inline h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDownIcon className="inline h-4 w-4 ml-1" />
                  ))}
                <div>
                  <input
                    type="text"
                    placeholder="Rata-rata"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, average: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, idx) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2">{item.nama}</td>
                <td className="px-3 py-2">{item.angkatan}</td>
                <td className="px-3 py-2">{item.kelas}</td>
                <td className="px-3 py-2">{item.semester1}</td>
                <td className="px-3 py-2">{item.semester2}</td>
                <td className="px-3 py-2">{item.semester3}</td>
                <td className="px-3 py-2">{item.semester4}</td>
                <td className="px-3 py-2">{item.semester5}</td>
                <td className="px-3 py-2">{item.average}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/updatena/${item.id}`}>
                      <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-blue-800 cursor-pointer" />
                    </Link>
                    <TrashIcon className="h-5 w-5 text-red-600 cursor-pointer" />
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
