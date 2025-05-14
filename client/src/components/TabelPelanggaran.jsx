import { useState } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const TabelPelanggaran = () => {
  const [search, setSearch] = useState({
    nama: "",
    kelas: "",
    pelanggaran: "",
    tanggalpelanggaran: "",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = [
    {
      id: 1,
      nama: "Fauzan Arbhi",
      kelas: "XII.2",
      pelanggaran: "Terlambat",
      tanggalpelanggaran: "23-04-2023",
      poin: "20",
      penjelasan: "Terlambat masuk sekolah sekitar 10 menit",
    },
    {
      id: 2,
      nama: "Fanisa Rizki",
      kelas: "XII.3",
      pelanggaran: "Atribut tidak lengkap",
      tanggalpelanggaran: "24-04-2023",
      poin: "30",
      penjelasan: "Terlambat masuk sekolah sekitar 10 menit",
    },
    {
      id: 3,
      nama: "Fauzan Arbhi",
      kelas: "XII.2",
      pelanggaran: "Membawa Senjata Tajam",
      tanggalpelanggaran: "25-04-2023",
      poin: "40",
      penjelasan: "Terlambat masuk sekolah sekitar 10 menit",
    },
    {
      id: 4,
      nama: "Fanisa Rizki",
      kelas: "XII.2",
      pelanggaran: "Mencuri Uang Kas",
      tanggalpelanggaran: "26-04-2023",
      poin: "50",
      penjelasan: "Terlambat masuk sekolah sekitar 10 menit",
    },
  ];

  const filtered = data.filter((item) =>
    Object.entries(search).every(([key, val]) =>
      item[key]?.toLowerCase().includes(val.toLowerCase())
    )
  );

  const displayedData =
    rowsPerPage === "all" ? filtered : filtered.slice(0, Number(rowsPerPage));

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Pelanggaran Siswa</h1>
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
                Kelas
                <div>
                  <input
                    type="text"
                    placeholder="Angkatan"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, kelas: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Pelanggaran
                <div>
                  <input
                    type="text"
                    placeholder="Terlambat"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, pelanggaran: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Tanggal Pelanggaran
                <div>
                  <input
                    type="text"
                    placeholder="Terlambat"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({
                        ...search,
                        tanggalpelanggaran: e.target.value,
                      })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">Poin</th>
              <th className="px-3 py-2 font-semibold">Penjelasan</th>
              <th className="px-3 py-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, idx) => (
              <tr
                key={`${item.id}-${idx}`}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3  py-2">{idx + 1}</td>
                <td className="px-3  py-2">{item.nama}</td>
                <td className="px-3  py-2">{item.kelas}</td>
                <td className="px-3  py-2">{item.pelanggaran}</td>
                <td className="px-3  py-2">{item.tanggalpelanggaran}</td>
                <td className="px-3  py-2">{item.poin}</td>
                <td className="px-3  py-2">{item.penjelasan}</td>
                <td className="px-3  py-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/updatekesiswaan/${item.id}`}>
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

export default TabelPelanggaran;
