import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/dashboardAdmin.css";
import { BASE_URL } from "../utils";

const DashboardAdmin = () => {
  const [activeTab, setActiveTab] = useState("kamar");
  const [kamarList, setKamarList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "kamar") {
      fetchKamar();
    }
  }, [activeTab]);

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

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

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
            className={activeTab === "kamar" ? "active" : ""}
            onClick={() => setActiveTab("kamar")}
            style={{
              marginRight: "2rem",
              cursor: "pointer",
            }}
          >
            Daftar Kamar
          </span>
          <span
            className={activeTab === "tambah" ? "active" : ""}
            onClick={() => navigate("/tambahkamar")}
            style={{
              marginRight: "2rem",
              cursor: "pointer",
            }}
          >
            Tambah Kamar
          </span>
          <span
            className={activeTab === "bukti" ? "active" : ""}
            onClick={() => navigate("/buktibayar")}
            style={{ cursor: "pointer" }}
          >
            Bukti Bayar
          </span>
        </div>
        <button className="dashboard-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      {/* Isi Tab */}
      <div className="dashboard-content">
        {activeTab === "kamar" && (
          <>
            <h2>Daftar Kamar</h2>
            {loading ? (
              <div className="dashboard-loading">Loading...</div>
            ) : kamarList.length === 0 ? (
              <div className="dashboard-empty">
                Belum ada kamar yang dibuat.
              </div>
            ) : (
              <div className="dashboard-card-list">
                {kamarList.map((kamar) => (
                  <div
                    className="dashboard-card"
                    key={kamar.id_kamar}
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/editkamar/${kamar.id_kamar}`)}
                  >
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
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "tambah" && (
          <div>
            <h2>Tambah Kamar</h2>
            <div className="dashboard-empty">
              Fitur ini belum diimplementasikan.
            </div>
          </div>
        )}

        {activeTab === "bukti" && (
          <div>
            <h2>Bukti Bayar</h2>
            <div className="dashboard-empty">
              Fitur ini belum diimplementasikan.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
