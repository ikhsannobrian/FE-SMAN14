import { useEffect, useState } from "react";
import { getJanjiKonselingBySiswaLogin } from "../../service/janjianKonselingService";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// Format tanggal
const formatTanggal = (tanggal) => {
  const parsed = dayjs(
    tanggal,
    ["YYYY-MM-DD", "DD-MM-YYYY", "DD/MM/YYYY"],
    true
  );
  return parsed.isValid() ? parsed.format("DD-MM-YYYY") : "Tanggal tidak valid";
};
const StatusKonseling = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState({
    tanggalJanji: "",
    guruBK: "",
    status: "",
  });
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getJanjiKonselingBySiswaLogin();
        setData(result);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }
    };
    fetchData();
  }, []);

  const filtered = data.filter((item) =>
    Object.entries(search).every(([key, val]) => {
      if (key === "tanggalJanji")
        return formatTanggal(item.tanggalJanji)
          .toLowerCase()
          .includes(val.toLowerCase());
      return item[key]?.toLowerCase().includes(val.toLowerCase());
    })
  );

  const displayedData =
    rowsPerPage === "all" ? filtered : filtered.slice(0, Number(rowsPerPage));

  return (
    <div className="p-4 rounded-2xl shadow-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Status Konseling Saya</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="rows" className="text-sm font-medium">
            Tampilkan
          </label>
          <select
            id="rows"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            className="border px-3 py-2 rounded text-sm"
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value="all">Semua</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-gray-200">
        <table className="min-w-full text-sm text-left">
          <thead>
            <tr className="bg-blue-400 text-white text-sm">
              <th className="px-4 py-2 font-semibold">No</th>
              <th className="px-4 py-2 font-semibold">
                Tanggal
                <div>
                  <input
                    type="text"
                    placeholder="dd/mm/yyyy"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, tanggalJanji: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-4 py-2 font-semibold">
                Guru BK
                <div>
                  <select
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, guruBK: e.target.value })
                    }
                  >
                    <option value="">Pilih</option>
                    <option value="Dini-Nursyahida">Dini Nursyahida</option>
                    <option value="Lina-Erliana">Lina Erliana</option>
                    <option value="Tari">Tari</option>
                  </select>
                </div>
              </th>
              <th className="px-4 py-2 font-semibold">
                Status
                <div>
                  <input
                    type="text"
                    placeholder="Status"
                    className="w-40 mt-1 px-2 py-1 text-xs rounded bg-white text-black focus:outline-none"
                    onChange={(e) =>
                      setSearch({ ...search, status: e.target.value })
                    }
                  />
                </div>
              </th>
              <th className="px-4 py-2 font-semibold">Jam</th>
              <th className="px-4 py-2 font-semibold">No. Telp</th>
              <th className="px-4 py-2 font-semibold">Pesan</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((item, idx) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">
                  {formatTanggal(item.tanggalJanji)}
                </td>
                <td className="px-4 py-2">{item.guruBK}</td>
                <td className="px-4 py-2">
                  {item.status === "Menunggu" ? (
                    <span className="bg-yellow-400 text-white px-2 py-1 rounded-full text-xs">
                      Menunggu
                    </span>
                  ) : item.status === "Disetujui" ? (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Disetujui
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      Tidak Disetujui
                    </span>
                  )}
                </td>
                <td className="px-4 py-2">{item.waktuJanji}</td>
                <td className="px-4 py-2">{item.siswa?.noTelp || "-"}</td>
                <td className="px-4 py-2">{item.keperluan}</td>
              </tr>
            ))}
            {displayedData.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
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

export default StatusKonseling;
