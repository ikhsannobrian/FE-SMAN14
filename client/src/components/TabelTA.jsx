import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const TabelTA = () => {
  const [search, setSearch] = useState({
    nama: "",
    angkatan: "",
    tahunlulus: "",
    kategori: "",
    instansi: "",
    programstudi: "",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = [
    {
      id: 1,
      nama: "Fauzan Arbhi",
      angkatan: "15",
      tahunlulus: "2021",
      kategori: "Sekolah Kedinasan",
      instansi: "UPN VETERAN JAKARTA",
      programstudi: "Sistem Informasi",
    },
    {
      id: 2,
      nama: "Fanisa Rizki",
      angkatan: "14",
      tahunlulus: "2021",
      kategori: "Perguruan Tinggi Swasta",
      instansi: "UPN VETERAN JAKARTA",
      programstudi: "Teknik Mesin",
      image: "",
    },
    {
      id: 3,
      nama: "Fauzan Arbhi",
      angkatan: "16",
      tahunlulus: "2022",
      kategori: "Perguruan Tinggi Negeri",
      instansi: "Universitas Pembangunan Nasional Veteran Jawa Timur",
      programstudi: "Teknik Mesin",
      image: "",
    },
    {
      id: 4,
      nama: "Fanisa Rizki",
      angkatan: "14",
      tahunlulus: "2023",
      kategori: "Perguruan Tinggi Negeri",
      instansi: "UPN VETERAN JAKARTA",
      programstudi: "Sistem Informasi",
      image: "",
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
        <h1 className="text-2xl font-bold">Tracer Alumni</h1>
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
                Tahun Lulus
                <div>
                  <input
                    type="text"
                    placeholder="Tahun Lulus"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, tahunlulus: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Kategori
                <div>
                  <select
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, kategori: e.target.value })
                    }
                  >
                    <option value="">Pilih</option>
                    <option value="Sekolah-Kedinasan">Sekolah Kedinasan</option>
                    <option value="Perguruan Tinggi Swasta">
                      Perguruan Tinggi Swasta
                    </option>
                    <option value="Perguruan Tinggi Negeri">
                      Perguruan Tinggi Negeri
                    </option>
                    <option value="Pegawai-Negeri">Pegawai Negeri</option>
                    <option value="KaryawanSwasta">Karyawan Swasta</option>
                  </select>
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Instansi
                <div>
                  <input
                    type="text"
                    placeholder="Instansi"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, instansi: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Program Studi
                <div>
                  <input
                    type="text"
                    placeholder="Program Studi"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, programstudi: e.target.value })
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
                key={`${item.id}-${idx}`}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3  py-2">{idx + 1}</td>
                <td className="px-3  py-2">{item.nama}</td>
                <td className="px-3  py-2">{item.angkatan}</td>
                <td className="px-3  py-2">{item.tahunlulus}</td>
                <td className="px-3  py-2">{item.kategori}</td>
                <td className="px-3  py-2">{item.instansi}</td>
                <td className="px-3  py-2">{item.programstudi}</td>
                <td className="px-3  py-2">
                  <div className="flex items-center gap-2">
                    <EyeIcon
                      className="h-5 w-5 text-blue-600 cursor-pointer"
                      title="Lihat Gambar"
                      onClick={() => window.open(item.image || "", "_blank")}
                    />
                    <Link to={`/admin/updateta/${item.id}`}>
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

export default TabelTA;
