import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

const TabelJK = () => {
  const [search, setSearch] = useState({
    nama: "",
    kelas: "",
    tanggal: "",
    guru: "",
    status: "",
  });

  // ✅ Tambah state untuk jumlah baris ditampilkan
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = [
    {
      id: 1,
      nama: "Fauzan Arbhi",
      kelas: "XII.3",
      tanggal: "12/06/2025",
      guru: "Bu Dini",
      status: "Accept",
      jam: "10.00–11.00",
      telp: "0853454983",
      pesan: "Curhat",
    },
    {
      id: 2,
      nama: "Fanisa Rizki",
      kelas: "XII.3",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "08127883439",
      pesan: "Perkembangan Pribadi",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
    {
      id: 3,
      nama: "Nur Afra F.",
      kelas: "XII.7",
      tanggal: "29/02/2025",
      guru: "Bu Salina",
      status: "Disetujui",
      jam: "10.00–11.00",
      telp: "0883824893",
      pesan: "Konsul PT",
    },
  ];

  const filtered = data.filter((item) =>
    Object.entries(search).every(([key, val]) =>
      item[key]?.toLowerCase().includes(val.toLowerCase())
    )
  );

  // ✅ Ambil data sesuai jumlah rows yang dipilih
  const displayedData =
    rowsPerPage === "all" ? filtered : filtered.slice(0, Number(rowsPerPage));

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Konseling</h1>
        {/* ✅ Dropdown untuk memilih jumlah data yang ditampilkan */}
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
                    className="w-24 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                    className="w-24 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                    className="w-24 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, tanggal: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Guru BK
                <div>
                  <select
                    className="w-24 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, guru: e.target.value })
                    }
                  >
                    <option value="">Pilih</option>
                    <option value="Bu Dini">Bu Dini</option>
                    <option value="Bu Salina">Bu Salina</option>
                  </select>
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Status
                <div>
                  <input
                    type="text"
                    placeholder="Status"
                    className="w-24 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                key={`${item.id}-${idx}`}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3  py-2">{idx + 1}</td>
                <td className="px-3  py-2">{item.nama}</td>
                <td className="px-3  py-2">{item.kelas}</td>
                <td className="px-3  py-2">{item.tanggal}</td>
                <td className="px-3  py-2">{item.guru}</td>
                <td className="px-3  py-2">
                  {item.status === "Accept" ? (
                    <button className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                      Accept
                    </button>
                  ) : (
                    item.status
                  )}
                </td>
                <td className="px-3  py-2">{item.jam}</td>
                <td className="px-3  py-2">{item.telp}</td>
                <td className="px-3  py-2">{item.pesan}</td>
                <td className="px-3 py-2 flex gap-2">
                  <Link to={`/admin/updatejk/${item.id}`}>
                    <PencilSquareIcon className="h-5 w-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                  </Link>
                  <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800 cursor-pointer" />
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

export default TabelJK;
