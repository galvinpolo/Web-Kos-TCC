import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/dashboardAdmin.css";
import { BASE_URL } from "../utils";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [kamarList, setKamarList] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  useEffect(() => {
    const fetchKamar = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/kamar`);
        setKamarList(res.data);
      } catch (err) {
        setKamarList([]);
      }
      setLoading(false);
    };
    fetchKamar();
  }, []);

  return (
    <div className="dashboard-admin">
      {/* Navbar */}
      <nav
        className="dashboard-navbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <span
            className="active"
            style={{
              marginRight: "2rem",
              cursor: "pointer",
            }}
          >
            Daftar Kamar
          </span>
          <span
            style={{
              marginRight: "2rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/editbayar")}
          >
            Pembayaran
          </span>
        </div>
        <button className="dashboard-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Konten Daftar Kamar */}
      <div className="dashboard-content">
        <h2>Daftar Kamar</h2>
        {loading ? (
          <div className="dashboard-loading">Loading...</div>
        ) : kamarList.length === 0 ? (
          <div className="dashboard-empty">
            Belum ada kamar yang didaftarkan.
          </div>
        ) : (
          <div className="dashboard-card-list">
            {kamarList.map((kamar) => (
              <div className="dashboard-card" key={kamar.id_kamar}>
                <img
                  src={
                    kamar.gambar
                      ? kamar.gambar
                      : "https://via.placeholder.com/180x120?text=No+Image"
                  }
                  alt={kamar.nomor}
                  className="dashboard-card-img"
                />
                <div className="dashboard-card-title">{kamar.nomor}</div>
                <div className="dashboard-card-type">{kamar.tipe}</div>
                <div className="dashboard-card-type">Rp {kamar.harga}</div>
                <div className="dashboard-card-type">{kamar.status}</div>
                <button
                  className="dashboard-pesan-btn"
                  style={{
                    marginTop: "1rem",
                    width: "100%",
                    background: "#3a7bd5",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "0.5rem 0",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/bayar/${kamar.id_kamar}`)}
                >
                  Pesan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
