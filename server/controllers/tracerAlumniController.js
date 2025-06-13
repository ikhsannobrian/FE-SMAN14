import TracerAlumni from "../models/TracerAlumni.js";

// CREATE
export const createTracerAlumni = async (req, res) => {
  try {
    const { siswa, tahunLulus, kategori, namaInstansi, programStudi } =
      req.body;
    const filePath = req.file ? `/public/upload/${req.file.filename}` : null;

    if (!filePath) {
      return res.status(400).json({ message: "Bukti upload wajib disertakan" });
    }

    const newData = new TracerAlumni({
      siswa,
      tahunLulus,
      kategori,
      namaInstansi,
      programStudi,
      uploadBukti: filePath,
    });

    await newData.save();
    res.status(201).json({ message: "Data berhasil disimpan", data: newData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menyimpan data", error: error.message });
  }
};

// GET ALL
export const getAllTracerAlumni = async (req, res) => {
  try {
    const data = await TracerAlumni.find();
    res.status(200).json({ message: "Data ditemukan", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: error.message });
  }
};

// GET BY ID
export const getTracerAlumniById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TracerAlumni.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    res.status(200).json({ message: "Data ditemukan", data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal mengambil data", error: error.message });
  }
};

// UPDATE
export const updateTracerAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const { siswa, tahunLulus, kategori, namaInstansi, programStudi } =
      req.body;

    const dataLama = await TracerAlumni.findById(id);
    if (!dataLama) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    let filePath = dataLama.uploadBukti;
    if (req.file) {
      filePath = `/public/upload/${req.file.filename}`;
      // tanpa fs, file lama tidak dihapus
    }

    const updated = await TracerAlumni.findByIdAndUpdate(
      id,
      {
        siswa,
        tahunLulus,
        kategori,
        namaInstansi,
        programStudi,
        uploadBukti: filePath,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Data berhasil diperbarui", data: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal memperbarui data", error: error.message });
  }
};

// DELETE
export const deleteTracerAlumni = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TracerAlumni.findById(id);

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // tanpa fs, file tidak dihapus
    await TracerAlumni.findByIdAndDelete(id);

    res.status(200).json({ message: "Data berhasil dihapus" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus data", error: error.message });
  }
};
