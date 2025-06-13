import multer from "multer";
import path from "path";
import fs from "fs";

const FILE_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValidFormat = FILE_TYPE[file.mimetype];
    let uploadError = new Error("invalid image format");

    if (isValidFormat) {
      uploadError = null;
    }

    // Gunakan path absolut relatif terhadap project folder
    const uploadPath = path.join(process.cwd(), "public", "upload");

    // Pastikan foldernya ada
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(uploadError, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueFile = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, uniqueFile);
  },
});

export const upload = multer({ storage: storage });
