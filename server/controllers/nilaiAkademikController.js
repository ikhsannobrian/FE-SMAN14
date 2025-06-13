import NilaiAkademik from "../models/NilaiAkademik.js";

// CREATE nilai akademik
export const createNilaiAkademik = async (req, res) => {
  try {
    const { semester1, semester2, semester3, semester4, semester5, siswa } =
      req.body;

    const rataRata = Number(
      (semester1 + semester2 + semester3 + semester4 + semester5) / 5
    ).toFixed(2);
    const nilaiAkademik = new NilaiAkademik({
      siswa,
      semester1,
      semester2,
      semester3,
      semester4,
      semester5,
      rataRata, 
    });

    await nilaiAkademik.save();
    res.status(201).json({
      message: "Nilai berhasil ditambahkan",
      data: nilaiAkademik,
    });
  } catch (err) {
    res.status(400).json({
      message: "Gagal menambahkan nilai",
      error: err.message,
    });
  }
};

// READ semua nilai akademik
export const getAllNilaiAkademik = async (req, res) => {
  try {
    const data = await NilaiAkademik.find().populate("siswa");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error: err.message,
    });
  }
};

// READ nilai akademik berdasarkan ID siswa
export const getNilaiSiswaById = async (req, res) => {
  try {
    const data = await NilaiAkademik.findOne({ siswa: req.params.id }).populate(
      "siswa"
    );
    if (!data) {
      return res
        .status(404)
        .json({ message: "Nilai akademik tidak ditemukan" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Gagal mengambil data",
      error: err.message,
    });
  }
};

// UPDATE nilai akademik
export const updateNilaiAkademik = async (req, res) => {
  try {
    const existing = await NilaiAkademik.findById(req.params.id);
    if (!existing) {
      return res
        .status(404)
        .json({ message: "Nilai akademik tidak ditemukan" });
    }

    // Gabungkan data lama dengan data baru
    const semester1 = req.body.semester1 ?? existing.semester1;
    const semester2 = req.body.semester2 ?? existing.semester2;
    const semester3 = req.body.semester3 ?? existing.semester3;
    const semester4 = req.body.semester4 ?? existing.semester4;
    const semester5 = req.body.semester5 ?? existing.semester5;

    // Hitung rata-rata baru
    const rataRata = Number(
      ((semester1 + semester2 + semester3 + semester4 + semester5) / 5).toFixed(
        2
      )
    );

    // Update data
    const updated = await NilaiAkademik.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        semester1,
        semester2,
        semester3,
        semester4,
        semester5,
        rataRata,
      },
      { new: true }
    );

    // Bersihkan _id dan __v dari response
    const { _id, __v, ...dataTanpaId } = updated.toObject();

    res.status(200).json({
      message: "Nilai akademik berhasil diupdate",
      data: dataTanpaId,
    });
  } catch (error) {
    res.status(400).json({
      message: "Gagal memperbarui nilai",
      error: error.message,
    });
  }
};

// DELETE nilai akademik berdasarkan ID siswa
export const deleteNilaiAkademik = async (req, res) => {
  try {
    const deleted = await NilaiAkademik.findOneAndDelete({
      siswa: req.params.id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Nilai akademik tidak ditemukan" });
    }

    res.status(200).json({
      message: "Nilai akademik berhasil dihapus",
      data: deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus nilai",
      error: error.message,
    });
  }
};
