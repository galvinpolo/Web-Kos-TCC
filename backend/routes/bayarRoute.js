import express from "express";
import {
  getBayar,
  createBayar,
  updateBayar,
  deleteBayar,
  getBayarById,
} from "../controller/bayarController.js";
import { uploadImageBukti } from "../utils/UploadImage.js";

// Route untuk mendapatkan semua bayar
const router = express.Router();

router.get("/bayar", getBayar);
router.get("/bayar/:id", getBayarById);
router.post("/add-bayar", uploadImageBukti.single("gambar2"), createBayar);
router.put("/update-bayar/:id", uploadImageBukti.single("gambar2"), updateBayar);
router.delete("/delete-bayar/:id", deleteBayar);

export default router;
