import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "../css/register.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "penyewa",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);
    try {
      const res = await axios.post(
        "https://kos-be-galvin-1061342868557.us-central1.run.app/register",
        form,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setMsg(res.data.msg || "Register berhasil!");
      setTimeout(() => {
        navigate("/"); // redirect ke halaman login setelah 1 detik
      }, 1000);
      setForm({ username: "", password: "", role: "penyewa" });
    } catch (err) {
      setMsg(
        err.response?.data?.msg ||
          "Terjadi kesalahan. Username mungkin sudah digunakan."
      );
    }
    setLoading(false);
  };

  return (
    <div className="register-container">
      <motion.form
        className="register-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2>Daftar Akun</h2>
        {msg && <div className="register-msg">{msg}</div>}
        <div className="register-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="register-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={5}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Mendaftar..." : "Register"}
        </button>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          Sudah punya akun? <Link to="/">Login</Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Register;
