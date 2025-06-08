import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const TabelSertifikat = () => {
  const [search, setSearch] = useState({
    nama: "",
    jenissertifikat: "",
    penyelenggaralomba: "",
    bidanglomba: "",
    mulailomba: "",
    selesailomba: "",
    tingkatlomba: "",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = [
    {
      id: 1,
      nama: "Fauzan Arbhi",
      jenissertifikat: "Akademik",
      penyelenggaralomba: "POPDA JAWA BARAT 2024",
      bidanglomba: "Matematika",
      mulailomba: "01-01-2023",
      selesailomba: "31-12-2023",
      tingkatlomba: "Nasional",
      image: "",
    },
    {
      id: 2,
      nama: "Fanisa Rizki",
      jenissertifikat: "Non-Akademik",
      penyelenggaralomba: "PPOP JAWA BARAT 2024",
      bidanglomba: "Basket",
      mulailomba: "01-03-2023",
      selesailomba: "32-12-2023",
      tingkatlomba: "Kota",
      image: "",
    },
    {
      id: 3,
      nama: "Nur Afra Fadhillah",
      jenissertifikat: "Akademik",
      penyelenggaralomba: "POPDA JAWA BARAT 2024",
      bidanglomba: "Sejarah",
      mulailomba: "01-01-2023",
      selesailomba: "31-12-2023",
      tingkatlomba: "Nasional",
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
                    placeholder="Masukan Nama"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, nama: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Jenis Sertifikat
                <div>
                  <select
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                Jenis Olahraga / Akademik
                <div>
                  <input
                    type="text"
                    placeholder="Angkatan"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, bidanglomba: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Penyelenggara Lomba
                <div>
                  <input
                    type="text"
                    placeholder="Penyelenggara Lomba"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                    placeholder="Mulai Lomba"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                    placeholder="Selesai Lomba"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, selesailomba: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Tingkat Lomba
                <div>
                  <select
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                key={`${item.id}-${idx}`}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3  py-2">{idx + 1}</td>
                <td className="px-3  py-2">{item.nama}</td>
                <td className="px-3  py-2">{item.jenissertifikat}</td>
                <td className="px-3  py-2">{item.bidanglomba}</td>
                <td className="px-3  py-2">{item.penyelenggaralomba}</td>
                <td className="px-3  py-2">{item.mulailomba}</td>
                <td className="px-3  py-2">{item.selesailomba}</td>
                <td className="px-3  py-2">{item.tingkatlomba}</td>
                <td className="px-3  py-2">
                  <div className="flex items-center gap-2">
                    <EyeIcon
                      className="h-5 w-5 text-blue-600 cursor-pointer"
                      title="Lihat Gambar"
                      onClick={() => window.open(item.image || "", "_blank")}
                    />
                    <Link to={`/admin/updatesertifikat/${item.id}`}>
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

export default TabelSertifikat;
