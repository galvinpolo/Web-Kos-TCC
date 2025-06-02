import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import "../css/editKamar.css";

const TambahKamar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nomor: "",
    tipe: "",
    harga: "",
    status: "Tersedia",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const fileInputRef = useRef();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const img = e.target.files[0];
    setFile(img);
    if (img) {
      setPreview(URL.createObjectURL(img));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const formData = new FormData();
      formData.append("nomor", form.nomor);
      formData.append("tipe", form.tipe);
      formData.append("harga", form.harga);
      formData.append("status", form.status);
      if (file) formData.append("gambar", file);

      const token = localStorage.getItem("accessToken");

      await axios.post(`${BASE_URL}/add-kamar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setMsg("Kamar berhasil ditambahkan.");
      setForm({ nomor: "", tipe: "", harga: "", status: "Tersedia" });
      setFile(null);
      setPreview("");
      fileInputRef.current.value = "";
      setTimeout(() => {
        navigate("/dashboardadmin");
      }, 1000);
    } catch (err) {
      setMsg(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Gagal menambah kamar."
      );
    }
  };

  return (
    <div className="editkamar-container">
      <h2>Tambah Kamar</h2>
      {msg && <div className="editkamar-msg">{msg}</div>}
      <form className="editkamar-form" onSubmit={handleSubmit}>
        <label>Nomor Kamar</label>
        <input
          type="text"
          name="nomor"
          value={form.nomor}
          onChange={handleChange}
          required
        />

        <label>Tipe Kamar</label>
        <input
          type="text"
          name="tipe"
          value={form.tipe}
          onChange={handleChange}
          required
        />

        <label>Harga</label>
        <input
          type="number"
          name="harga"
          value={form.harga}
          onChange={handleChange}
          required
        />

        <label>Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
        >
          <option value="Tersedia">Tersedia</option>
          <option value="Tidak Tersedia">Tidak Tersedia</option>
        </select>

        <label>Gambar</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
        />

        {preview && (
          <img className="editkamar-preview" src={preview} alt="Preview" />
        )}

        <div className="editkamar-buttons">
          <button type="submit" className="editkamar-btn simpan">
            Simpan
          </button>
          <button
            type="button"
            className="editkamar-btn hapus"
            onClick={() => navigate("/dashboardadmin")}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahKamar;
