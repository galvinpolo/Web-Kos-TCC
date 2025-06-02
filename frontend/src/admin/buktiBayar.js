import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import "../css/editKamar.css";

const BuktiBayar = () => {
  const [bayarList, setBayarList] = useState([]);
  const [selected, setSelected] = useState(null);

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
  }, []);

  return (
    <div className="editkamar-container">
      <h2>Daftar Bukti Bayar</h2>
      {selected ? (
        <div style={{ marginBottom: "2rem" }}>
          <button
            className="editkamar-btn hapus"
            style={{ marginBottom: "1rem" }}
            onClick={() => setSelected(null)}
          >
            Kembali
          </button>
          <div className="editkamar-form">
            <label>Nama</label>
            <div>{selected.nama}</div>
            <label>Email</label>
            <div>{selected.email}</div>
            <label>Alamat</label>
            <div>{selected.alamat}</div>
            <label>No HP</label>
            <div>{selected.no_hp}</div>
            <label>Bukti Pembayaran</label>
            {selected.gambar2 && (
              <img
                className="editkamar-preview"
                src={
                  selected.gambar2
                    ? selected.gambar2
                    : "https://via.placeholder.com/180x120?text=No+Image"
                }
                alt="Bukti"
              />
            )}
          </div>
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
                onClick={() => setSelected(item)}
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
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default BuktiBayar;
