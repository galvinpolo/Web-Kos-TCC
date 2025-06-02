import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import "../css/editKamar.css";

const EditKamar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kamar, setKamar] = useState({
    nomor: "",
    tipe: "",
    harga: "",
    gambar: "",
  });
  const [preview, setPreview] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const fileInputRef = useRef();

  // Fetch data kamar by id
  useEffect(() => {
    const fetchKamar = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/kamar/${id}`);
        setKamar({
          nomor: res.data.nomor,
          tipe: res.data.tipe,
          harga: res.data.harga,
          gambar: res.data.gambar,
        });
        setPreview(res.data.gambar);
      } catch (err) {
        setMsg("Gagal mengambil data kamar.");
      }
    };
    fetchKamar();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setKamar({ ...kamar, [e.target.name]: e.target.value });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const img = e.target.files[0];
    setFile(img);
    if (img) {
      setPreview(URL.createObjectURL(img));
    }
  };

  // Update kamar
  const handleUpdate = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const formData = new FormData();
      formData.append("nomor", kamar.nomor);
      formData.append("tipe", kamar.tipe);
      formData.append("harga", kamar.harga);
      if (file) formData.append("gambar", file);

      // Ambil token dari localStorage
      const token = localStorage.getItem("accessToken");

      await axios.put(`${BASE_URL}/update-kamar/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setMsg("Kamar berhasil diupdate.");
      setFile(null);
      fileInputRef.current.value = "";
      // Redirect ke dashboardadmin setelah update berhasil
      setTimeout(() => {
        navigate("/dashboardadmin");
      }, 1000);
    } catch (err) {
      setMsg("Gagal update kamar.");
    }
  };

  // Delete kamar
  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus kamar ini?")) return;
    try {
      await axios.delete(`${BASE_URL}/delete-kamar/${id}`, {
        withCredentials: true,
      });
      navigate("/dashboardadmin");
    } catch (err) {
      setMsg("Gagal menghapus kamar.");
    }
  };

  return (
    <div className="editkamar-container">
      <h2>Edit Kamar</h2>
      {msg && <div className="editkamar-msg">{msg}</div>}

      <form className="editkamar-form" onSubmit={handleUpdate}>
        <label>Nomor Kamar</label>
        <input
          type="text"
          name="nomor"
          value={kamar.nomor}
          onChange={handleChange}
          required
        />

        <label>Tipe Kamar</label>
        <input
          type="text"
          name="tipe"
          value={kamar.tipe}
          onChange={handleChange}
          required
        />

        <label>Harga</label>
        <input
          type="number"
          name="harga"
          value={kamar.harga}
          onChange={handleChange}
          required
        />

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
            Simpan Perubahan
          </button>
          <button
            type="button"
            className="editkamar-btn hapus"
            onClick={handleDelete}
          >
            Hapus Kamar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditKamar;
