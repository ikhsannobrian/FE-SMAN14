import { useState, useEffect } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { getAllAdmin, deleteAdmin } from "../../service/authService";

const AdminList = () => {
  const [adminList, setAdminList] = useState([]);
  const [search, setSearch] = useState({ name: "", email: "" });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const response = await getAllAdmin();
      console.log("Respons Admin:", response.data);
      setAdminList(response.data);
    } catch (error) {
      console.error("Gagal mengambil data admin:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      await deleteAdmin(id);
      setAdminList((prevData) => prevData.filter((admin) => admin._id !== id));
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  const filtered = adminList.filter((admin) =>
    Object.entries(search).every(([key, val]) => {
      if (key === "email") {
        return admin.user?.email?.toLowerCase().includes(val.toLowerCase());
      }
      return admin[key]?.toLowerCase().includes(val.toLowerCase());
    })
  );

  const displayedData =
    rowsPerPage === "all" ? filtered : filtered.slice(0, Number(rowsPerPage));

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Daftar Admin</h1>
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
                    placeholder="Masukan Email"
                    className="w-40 max-w-full mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, email: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((admin, idx) => (
              <tr
                key={`${admin._id}-${idx}`}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2">{admin.name}</td>
                <td className="px-3 py-2">{admin.user?.email ?? "-"}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/updateadmin/${admin._id}`}>
                      <PencilSquareIcon className="h-5 w-5 text-green-600 hover:text-blue-800 cursor-pointer" />
                    </Link>
                    <TrashIcon
                      className="h-5 w-5 text-red-600 cursor-pointer"
                      onClick={() => handleDelete(admin._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {displayedData.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  Tidak ada data admin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
