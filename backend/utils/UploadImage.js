import multer from "multer";
import fs from "fs";
import path from "path";

// Folder untuk foto kos
const uploadKosDir = path.resolve("../frontend/assets/uploads");
if (!fs.existsSync(uploadKosDir))
  fs.mkdirSync(uploadKosDir, { recursive: true });

// Folder untuk bukti pembayaran
const uploadBuktiDir = path.resolve("../frontend/assets/uploads_bukti");
if (!fs.existsSync(uploadBuktiDir))
  fs.mkdirSync(uploadBuktiDir, { recursive: true });

const IMAGE_TYPES = /jpeg|jpg|png|gif/i;

const storageKos = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadKosDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const storageBukti = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadBuktiDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  },
});

const fileFilter = (_req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (IMAGE_TYPES.test(ext)) return cb(null, true);
  cb(new Error("Hanya file gambar (jpg, jpeg, png, gif) yang diizinkan"));
};

export const uploadImageKos = multer({
  storage: storageKos,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

export const uploadImageBukti = multer({
  storage: storageBukti,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});
