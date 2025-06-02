import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import "../css/editKamar.css";

const BayarPage = () => {
  const navigate = useNavigate();
//   const { id } = useParams(); // id kamar, jika ingin dikirim ke backend
  const [form, setForm] = useState({
    nama: "",
    email: "",
    alamat: "",
    no_hp: "",
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
      formData.append("nama", form.nama);
      formData.append("email", form.email);
      formData.append("alamat", form.alamat);
      formData.append("no_hp", form.no_hp);
      if (file) formData.append("gambar2", file);
      // Jika ingin mengirim id kamar, tambahkan:
      // formData.append("id_kamar", id);

      await axios.post(`${BASE_URL}/add-bayar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      setMsg("Bukti bayar berhasil dikirim.");
      setForm({ nama: "", email: "", alamat: "", no_hp: "" });
      setFile(null);
      setPreview("");
      fileInputRef.current.value = "";
      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      setMsg(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Gagal mengirim bukti bayar."
      );
    }
  };

  return (
    <div className="editkamar-container">
      <h2>Form Pembayaran</h2>
      {msg && <div className="editkamar-msg">{msg}</div>}
      <form className="editkamar-form" onSubmit={handleSubmit}>
        <label>Nama</label>
        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Alamat</label>
        <input
          type="text"
          name="alamat"
          value={form.alamat}
          onChange={handleChange}
          required
        />

        <label>No HP</label>
        <input
          type="number"
          name="no_hp"
          value={form.no_hp}
          onChange={handleChange}
          required
        />

        <label>Bukti Pembayaran (Gambar)</label>
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
            Kirim Bukti
          </button>
          <button
            type="button"
            className="editkamar-btn hapus"
            onClick={() => navigate("/dashboard")}
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default BayarPage;
