import { useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const UserList = () => {
  const [search, setSearch] = useState({
    nama: "",
    username: "",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const data = [
    {
      id: 1,
      nama: "Fauzan Arbhi",
      username: "fauzan123",
    },
    {
      id: 2,
      nama: "Fanisa Rizki",
      username: "fanisa123",
    },
    {
      id: 3,
      nama: "Nur Afra Fadhilah",
      username: "afra123",
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
        <h1 className="text-2xl font-bold">User List</h1>
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
                Username
                <div>
                  <input
                    type="text"
                    placeholder="Angkatan"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, username: e.target.value })
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
                <td className="px-3  py-2">{item.username}</td>
                <td className="px-3  py-2">
                  <div className="flex items-center gap-2">
                    <EyeIcon
                      className="h-5 w-5 text-blue-600 cursor-pointer"
                      title="Lihat Gambar"
                      onClick={() => window.open(item.image || "", "_blank")}
                    />
                    <Link to={`/admin/updateas/${item.id}`}>
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

export default UserList;
