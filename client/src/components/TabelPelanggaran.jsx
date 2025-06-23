import { useState, useEffect, useRef } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  getAllPelanggaranSiswa,
  deletePelanggaranSiswa,
} from "../../service/pelanggaranSiswaService";

const TabelPelanggaran = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef();
  const [search, setSearch] = useState({
    nama: "",
    kelas: "",
    pelanggaran: "",
    tanggal: "",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [bulan, setBulan] = useState(new Date().getMonth() + 1);
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [rekapData, setRekapData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getAllPelanggaranSiswa();
      setData(response.data);
    } catch (error) {
      console.error("Gagal mengambil data pelanggaran siswa:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTanggal = (tanggalStr) => {
    if (!tanggalStr) return "";
    const [year, month, day] = tanggalStr.split("-");
    return `${day}-${month}-${year}`;
  };

  const filtered = data.filter((item) =>
    Object.entries(search).every(([key, val]) =>
      (key === "tanggal" ? formatTanggal(item.tanggal) : item[key])
        ?.toLowerCase()
        .includes(val.toLowerCase())
    )
  );

  const displayedData =
    rowsPerPage === "all" ? filtered : filtered.slice(0, Number(rowsPerPage));

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pelanggaran siswa ini?")) return;
    try {
      await deletePelanggaranSiswa(id);
      alert("Pelanggaran siswa berhasil dihapus.");
      fetchData();
    } catch (error) {
      console.error("Gagal menghapus pelanggaran siswa:", error);
    }
  };

  const handleRekap = () => {
    const hasil = data
      .filter((item) => {
        const date = new Date(item.tanggal);
        return (
          date.getMonth() + 1 === parseInt(bulan) &&
          date.getFullYear() === parseInt(tahun)
        );
      })
      .reduce((acc, curr) => {
        if (!acc[curr.nama]) {
          acc[curr.nama] = {
            nama: curr.nama,
            totalPelanggaran: 0,
            jumlahPoin: 0,
          };
        }
        acc[curr.nama].totalPelanggaran += 1;
        acc[curr.nama].jumlahPoin += curr.poin;
        return acc;
      }, {});
    setRekapData(Object.values(hasil));
    setShowModal(true);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(
      `Rekapitulasi Poin Siswa Bulan ${new Date(0, bulan - 1).toLocaleString(
        "id-ID",
        { month: "long" }
      )} ${tahun}`,
      14,
      15
    );

    autoTable(doc, {
      startY: 25,
      head: [["No", "Nama", "Total Pelanggaran", "Jumlah Poin"]],
      body: rekapData.map((item, index) => [
        index + 1,
        item.nama,
        item.totalPelanggaran,
        item.jumlahPoin,
      ]),
    });

    doc.save("rekap-pelanggaran.pdf");
  };

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold">Pelanggaran Siswa</h1>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Show</label>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">All</option>
          </select>
          <select
            value={bulan}
            onChange={(e) => setBulan(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("id-ID", { month: "long" })}
              </option>
            ))}
          </select>
          <select
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
            className="border px-2 py-1 rounded text-sm"
          >
            {[2023, 2024, 2025].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <button
            onClick={handleRekap}
            className="px-4 py-1 rounded text-white"
            style={{ backgroundColor: "#3b82f6" }}
          >
            Rekap
          </button>
        </div>
      </div>

      {/* ...tabel utama */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full text-sm text-left rounded-2xl overflow-hidden">
          <thead>
            <tr style={{ backgroundColor: "#60a5fa", color: "#ffffff" }}>
              <th className="px-3 py-2 font-semibold">No</th>
              <th className="px-3 py-2 font-semibold">
                Nama
                <input
                  type="text"
                  className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black"
                  placeholder="Masukkan Nama"
                  onChange={(e) =>
                    setSearch({ ...search, nama: e.target.value })
                  }
                />
              </th>
              <th className="px-3 py-2 font-semibold">
                Kelas
                <input
                  type="text"
                  className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black"
                  placeholder="Masukkan Kelas"
                  onChange={(e) =>
                    setSearch({ ...search, kelas: e.target.value })
                  }
                />
              </th>
              <th className="px-3 py-2 font-semibold">
                <div className="flex flex-col">
                  <span>Pelanggaran</span>
                  <input
                    type="text"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black"
                    placeholder="Jenis Pelanggaran"
                    onChange={(e) =>
                      setSearch({ ...search, pelanggaran: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-3 py-2 font-semibold">
                Tanggal
                <input
                  type="text"
                  className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black"
                  placeholder="DD-MM-YYYY"
                  onChange={(e) =>
                    setSearch({ ...search, tanggal: e.target.value })
                  }
                />
              </th>
              <th className="px-3 py-2 font-semibold">Poin</th>
              <th className="px-3 py-2 font-semibold">Penjelasan</th>
              <th className="px-3 py-2 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : displayedData.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4 text-gray-500">
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              displayedData.map((item, idx) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="px-3 py-2">{idx + 1}</td>
                  <td className="px-3 py-2">{item.nama}</td>
                  <td className="px-3 py-2">{item.kelas}</td>
                  <td className="px-3 py-2">{item.pelanggaran}</td>
                  <td className="px-3 py-2">{formatTanggal(item.tanggal)}</td>
                  <td className="px-3 py-2">{item.poin}</td>
                  <td className="px-3 py-2">{item.penjelasan}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Link to={`/admin/updatekesiswaan/${item._id}`}>
                        <PencilSquareIcon className="h-5 w-5 text-green-600" />
                      </Link>
                      <TrashIcon
                        className="h-5 w-5 text-red-600 cursor-pointer"
                        onClick={() => handleDelete(item._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal rekap */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div
            className="bg-white rounded-lg p-4 w-full max-w-2xl"
            ref={modalRef}
          >
            <div className="mb-4">
              <h2 className="text-lg font-bold text-center">
                Rekapitulasi Poin Siswa Bulan{" "}
                {new Date(0, bulan - 1).toLocaleString("id-ID", {
                  month: "long",
                })}{" "}
                {tahun}
              </h2>
            </div>

            <table className="w-full table-fixed border text-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-blue-400 text-white text-center">
                  <th className="px-2 py-1 w-[10%]">No</th>
                  <th className="px-2 py-1 w-[40%]">Nama</th>
                  <th className="px-2 py-1 w-[25%]">Total Pelanggaran</th>
                  <th className="px-2 py-1 w-[25%]">Jumlah Poin</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {rekapData.map((item, index) => (
                  <tr key={index} className="border">
                    <td className="px-2 py-1">{index + 1}</td>
                    <td className="px-2 py-1">{item.nama}</td>
                    <td className="px-2 py-1">{item.totalPelanggaran}</td>
                    <td className="px-2 py-1">{item.jumlahPoin}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-1 rounded text-white"
                style={{ backgroundColor: "#6b7280" }}
              >
                Selesai
              </button>
              <button
                onClick={downloadPDF}
                className="px-4 py-1 rounded text-white"
                style={{ backgroundColor: "#22c55e" }}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabelPelanggaran;
