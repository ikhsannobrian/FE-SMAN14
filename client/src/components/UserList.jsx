import { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { getAllSiswa, deleteSiswa } from "../../service/authService";

const UserList = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    email: "",
    kelas: "",
    angkatan: "",
    noTelp: "",
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getAllSiswa();
      const siswaList = res.data.data.map((siswa) => ({
        id: siswa._id,
        name: siswa.name,
        email: siswa.user?.email || "-",
        kelas: siswa.kelas,
        angkatan: siswa.angkatan,
        noTelp: siswa.noTelp,
      }));
      setData(siswaList);
    } catch (error) {
      console.error("Gagal mengambil data siswa:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus data siswa ini?");
    if (!confirm) return;

    try {
      await deleteSiswa(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

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
                      setSearch({ ...search, name: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Email
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, email: e.target.value })
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
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
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
                    placeholder="Angkatan"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, angkatan: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Nomor Telepon
                <div>
                  <input
                    type="text"
                    placeholder="No Telp"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, noTelp: e.target.value })
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
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2">{item.name}</td>
                <td className="px-3 py-2">{item.email}</td>
                <td className="px-3 py-2">{item.kelas}</td>
                <td className="px-3 py-2">{item.angkatan}</td>
                <td className="px-3 py-2">{item.noTelp}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/updateas/${item.id}`}>
                      <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-blue-800 cursor-pointer" />
                    </Link>
                    <TrashIcon
                      className="h-5 w-5 text-red-600 cursor-pointer"
                      onClick={() => handleDelete(item.id)}
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

export default UserList;
