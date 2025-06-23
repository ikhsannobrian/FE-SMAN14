import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { getAllTracerAlumni } from "../../service/tracerAlumni";
import { deleteTracerAlumni } from "../../service/tracerAlumni";

const TabelTA = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    name: "",
    angkatan: "",
    tahunLulus: "",
    kategori: "",
    instansi: "",
    programstudi: "",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hasil = await getAllTracerAlumni();
        setData(hasil);
      } catch (err) {
        console.error("Gagal ambil data tracer alumni:", err);
      }
    };
    fetchData();
  }, []);

  const filtered = data.filter((item) =>
    Object.entries(search).every(([key, val]) => {
      if (!val) return true;

      if (key === "name")
        return item.siswa?.name?.toLowerCase().includes(val.toLowerCase());
      if (key === "angkatan")
        return item.siswa?.angkatan?.toString().includes(val);
      if (key === "programstudi")
        return item.programStudi?.toLowerCase().includes(val.toLowerCase());
      if (key === "instansi")
        return item.namaInstansi?.toLowerCase().includes(val.toLowerCase());
      if (key === "kategori") return item.kategori === val;
      if (key === "tahunLulus")
        return item.tahunLulus?.toString().includes(val);

      return true;
    })
  );
  const toTitleCase = (str) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirm) return;

    try {
      await deleteTracerAlumni(id);
      // Refresh data setelah delete
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

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
                    className="w-40 mt-1 px-2 py-1 text-xs rounded"
                    onChange={(e) =>
                      setSearch({ ...search, name: e.target.value })
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
                    className="w-40 mt-1 px-2 py-1 text-xs rounded"
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
                    className="w-40 mt-1 px-2 py-1 text-xs rounded"
                    onChange={(e) =>
                      setSearch({ ...search, tahunLulus: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Kategori
                <div>
                  <select
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black"
                    value={search.kategori}
                    onChange={(e) =>
                      setSearch({ ...search, kategori: e.target.value })
                    }
                  >
                    <option value="">Pilih kategori</option>
                    <option value="perguruan tinggi negeri">
                      Perguruan Tinggi Negeri
                    </option>
                    <option value="perguruan tinggi swasta">
                      Perguruan Tinggi Swasta
                    </option>
                    <option value="wirausaha">Wirausaha</option>
                    <option value="sekolah kedinasan">Sekolah Kedinasan</option>
                    <option value="karyawan swasta">Karyawan Swasta</option>
                    <option value="pegawai negeri">Pegawai Negeri</option>
                  </select>
                </div>
              </th>

              <th className="px-3 py-2 font-semibold">
                Instansi
                <div>
                  <input
                    type="text"
                    placeholder="Instansi"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded"
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
                    className="w-40 mt-1 px-2 py-1 text-xs rounded"
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
                key={item._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-3 py-2">{idx + 1}</td>
                <td className="px-3 py-2">{item.siswa?.name}</td>
                <td className="px-3 py-2">{item.siswa?.angkatan}</td>
                <td className="px-3 py-2">{item.tahunLulus}</td>
                <td className="px-3 py-2">{toTitleCase(item.kategori)}</td>
                <td className="px-3 py-2">{item.namaInstansi}</td>
                <td className="px-3 py-2">{item.programStudi}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <EyeIcon
                      className="h-5 w-5 text-blue-600 cursor-pointer"
                      title="Lihat Gambar"
                      onClick={() => window.open(item.uploadBukti, "_blank")}
                    />
                    <Link to={`/admin/updateta/${item._id}`}>
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
                <td colSpan={8} className="text-center py-4 text-gray-500">
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
