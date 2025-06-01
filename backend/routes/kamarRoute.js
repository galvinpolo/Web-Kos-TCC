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

// Route untuk mendapatkan semua kamar
const router = express.Router();

router.get("/kamar", getKamar);
router.get("/kamar/:id", getKamarById);
router.post("/add-kamar", admin, uploadImageKos.single("gambar"), createKamar);
router.put("/update-kamar/:id", admin, uploadImageKos.single("gambar"), updateKamar);
router.delete("/delete-kamar/:id", deleteKamar);

export default router;
