import Kamar from "../model/kamarModel.js";
import path from "path";
import fs from "fs";

const uploadFolder = path.resolve("../frontend/assets/uploads");

export const getKamarById = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads`;
    const kamar = await Kamar.findOne({ where: { id_kamar: req.params.id } });
    if (!kamar)
      return res.status(404).json({ message: "Kamar tidak ditemukan" });

    const data = {
      ...kamar.toJSON(),
      gambar: kamar.gambar ? `${baseUrl}/${kamar.gambar}` : null,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getKamar = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads`;
    const kamarList = await Kamar.findAll();
    const data = kamarList.map((l) => ({
      ...l.toJSON(),
      gambar: l.gambar ? `${baseUrl}/${l.gambar}` : null,
    }));
    res.status(200).json(data);
  } catch (error) {       
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createKamar = async (req, res) => {
  try {
    const { nomor, tipe, harga, status } = req.body;
    const gambar = req.file?.filename || "default.png";

    const newKamar = await Kamar.create({
      nomor,
      tipe,
      harga: parseInt(harga),
      status,
      gambar,
    });

    res.status(201).json({
      message: "Kamar berhasil dibuat",
      data: newKamar,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateKamar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomor, tipe, harga, status } = req.body;

    const kamar = await Kamar.findOne({ where: { id_kamar: id } });
    if (!kamar)
      return res.status(404).json({ message: "Kamar tidak ditemukan" });

    // Siapkan data update
    const updatedData = {
      nomor,
      tipe,
      status,
      harga: harga
        ? parseInt(harga)
        : kamar.harga,
    };

    // Jika ada file baru, hapus file lama dan set nama file baru
    if (req.file) {
      if (kamar.gambar && kamar.gambar !== "default.png") {
        const oldImagePath = path.join(uploadFolder, kamar.gambar);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.gambar = req.file.filename;
    }

    await Kamar.update(updatedData, { where: { id_kamar: id } });

    res.status(200).json({ message: "Kamar berhasil diperbarui" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteKamar = async (req, res) => {
  try {
    const { id } = req.params;
    const kamar = await Kamar.findOne({ where: { id_kamar: id } });
    if (!kamar)
      return res.status(404).json({ message: "Kamar tidak ditemukan" });

    // Hapus file gambar jika bukan default
    if (kamar.gambar && kamar.gambar !== "default.png") {
      const filePath = path.join(uploadFolder, kamar.gambar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await Kamar.destroy({ where: { id } });

    res.status(200).json({ message: "Kamar berhasil dihapus" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};
