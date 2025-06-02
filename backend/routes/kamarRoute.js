import express from "express";
import {
  getKamar,
  createKamar,
  updateKamar,
  deleteKamar,
  getKamarById,
} from "../controller/kamarController.js";
import { uploadImageKos } from "../utils/UploadImage.js";
import { admin } from "../middleware/admin.js";
import { verifyToken, verifyAdmin } from "../middleware/verifyToken.js";

// Route untuk mendapatkan semua kamar
const router = express.Router();

router.get("/kamar", getKamar);
router.get("/kamar/:id", getKamarById);
router.post(
  "/add-kamar",
  verifyToken,
  verifyAdmin,
  uploadImageKos.single("gambar"),
  createKamar
);
router.put(
  "/update-kamar/:id",
  verifyToken,
  verifyAdmin,
  uploadImageKos.single("gambar"),
  updateKamar
);
router.delete("/delete-kamar/:id", deleteKamar);

export default router;
