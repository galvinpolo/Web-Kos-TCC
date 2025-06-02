import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import "../css/editKamar.css";

const EditBayar = () => {
  const [bayarList, setBayarList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    email: "",
    alamat: "",
    no_hp: "",
    gambar2: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");
  const fileInputRef = useRef();

  // Fetch all pembayaran
  useEffect(() => {
    const fetchBayar = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/bayar`);
        setBayarList(res.data);
      } catch (err) {
        setBayarList([]);
      }
    };
    fetchBayar();
  }, [msg]); // refresh list setelah update/delete

  // Saat klik Edit, isi form dengan data yang dipilih
  const handleEditClick = (item) => {
    setSelected(item);
    setForm({
      nama: item.nama,
      email: item.email,
      alamat: item.alamat,
      no_hp: item.no_hp,
      gambar2: item.gambar2,
    });
    setPreview(item.gambar2);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setMsg("");
  };

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

  // Update pembayaran
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const formData = new FormData();
      formData.append("nama", form.nama);
      formData.append("email", form.email);
      formData.append("alamat", form.alamat);
      formData.append("no_hp", form.no_hp);
      if (file) formData.append("gambar2", file);

      await axios.put(
        `${BASE_URL}/update-bayar/${selected.id_bayar}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      setMsg("Data pembayaran berhasil diupdate.");
      setSelected(null);
      setFile(null);
      setPreview("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setMsg("Gagal update pembayaran.");
    }
  };

  // Delete pembayaran
  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus data pembayaran ini?")) return;
    try {
      await axios.delete(`${BASE_URL}/delete-bayar/${selected.id_bayar}`, {
        withCredentials: true,
      });
      setMsg("Data pembayaran berhasil dihapus.");
      setSelected(null);
    } catch (err) {
      setMsg("Gagal menghapus pembayaran.");
    }
  };

  return (
    <div className="editkamar-container">
      <h2>Edit Bukti Bayar</h2>
      {msg && <div className="editkamar-msg">{msg}</div>}
      {selected ? (
        <div style={{ marginBottom: "2rem" }}>
          <button
            className="editkamar-btn hapus"
            style={{ marginBottom: "1rem" }}
            onClick={() => setSelected(null)}
          >
            Kembali
          </button>
          <form className="editkamar-form" onSubmit={handleUpdate}>
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
                Simpan Perubahan
              </button>
              <button
                type="button"
                className="editkamar-btn hapus"
                onClick={handleDelete}
              >
                Hapus Pembayaran
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="dashboard-card-list">
          {bayarList.length === 0 ? (
            <div className="dashboard-empty">Belum ada bukti pembayaran.</div>
          ) : (
            bayarList.map((item) => (
              <div
                className="dashboard-card"
                key={item.id_bayar}
                style={{ cursor: "pointer" }}
              >
                <img
                  className="dashboard-card-img"
                  src={
                    item.gambar2
                      ? item.gambar2
                      : "https://via.placeholder.com/180x120?text=No+Image"
                  }
                  alt={item.nama}
                />
                <div className="dashboard-card-title">{item.nama}</div>
                <div className="dashboard-card-type">{item.email}</div>
                <div className="dashboard-card-type">{item.no_hp}</div>
                <button
                  className="editkamar-btn simpan"
                  style={{ marginTop: "1rem", width: "100%" }}
                  onClick={() => handleEditClick(item)}
                >
                  Edit
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EditBayar;
