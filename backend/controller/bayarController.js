import Bayar from "../model/bayarModel.js";
import path from "path";
import fs from "fs";

const uploadFolder = path.resolve("../frontend/assets/uploads_bukti");

export const getBayar = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads_bukti`;
    const bayarList = await Bayar.findAll();
    const data = bayarList.map((l) => ({
      ...l.toJSON(),
      gambar2: l.gambar2 ? `${baseUrl}/${l.gambar2}` : null,
    }));
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: err5or.message });
  }
};

export const createBayar = async (req, res) => {
  try {
    const { nama, email, alamat, no_hp } = req.body;
    const gambar2 = req.file?.filename || "default.png";

    const newBayar = await Bayar.create({
      nama,
      email,
      alamat,
      no_hp,
      gambar2,
    });

    res.status(201).json({
      message: "Pembayaran berhasil",
      data: newBayar,
    });
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getBayarById = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get("host")}/uploads_bukti`;
    const bayar = await Bayar.findOne({ where: { id_bayar: req.params.id } });
    if (!bayar)
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });

    const data = {
      ...bayar.toJSON(),
      gambar2: bayar.gambar2 ? `${baseUrl}/${bayar.gambar2}` : null,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const updateBayar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, email, alamat, no_hp } = req.body;

    const bayar = await Bayar.findOne({ where: { id_bayar: id } });
    if (!bayar)
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });

    // Siapkan data update
    const updatedData = {
      nama,
      email,
      alamat,
      no_hp: no_hp ? no_hp : bayar.no_hp,
    };

    // Jika ada file baru, hapus file lama dan set nama file baru
    if (req.file) {
      if (bayar.gambar2 && bayar.gambar2 !== "default.png") {
        const oldImagePath = path.join(uploadFolder, bayar.gambar2);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      updatedData.gambar2 = req.file.filename;
    }

    await Bayar.update(updatedData, { where: { id_bayar: id } });

    res.status(200).json({ message: "Pembayaran berhasil diperbarui" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBayar = async (req, res) => {
  try {
    const { id } = req.params;
    const bayar = await Bayar.findOne({ where: { id_bayar: id } });
    if (!bayar)
      return res.status(404).json({ message: "Pembayaran tidak ditemukan" });

    // Hapus gambar jika ada
    if (bayar.gambar2 && bayar.gambar2 !== "default.png") {
      const oldImagePath = path.join(uploadFolder, bayar.gambar2);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await Bayar.destroy({ where: { id_bayar: id } });
    res.status(200).json({ message: "Pembayaran berhasil dihapus" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: error.message });
  }
};
