import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import { useNavigate, Link } from "react-router-dom";
import "../css/register.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" atau "error"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    try {
      const response = await axios.post(`${BASE_URL}/login`, form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // Simpan accessToken ke localStorage
      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken);
      }
      setMessage("Login berhasil!");
      setMessageType("success");

      // Ambil role dari response (pastikan backend mengirim data user/role)
      const role =
        response.data.role ||
        response.data.safeUserData?.role ||
        response.data.user?.role ||
        response.data.data?.role ||
        null;

      setTimeout(() => {
        if (role === "admin") {
          navigate("/dashboardadmin");
        } else {
          navigate("/dashboard");
        }
      }, 1000);
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          err.response?.data?.msg ||
          "Username atau password salah."
      );
      setMessageType("error");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {message && (
          <div
            className={`register-msg ${
              messageType === "success" ? "success" : "error"
            }`}
          >
            {message}
          </div>
        )}
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
          />
        </div>
        <button type="submit" disabled={messageType === "success"}>
          Login
        </button>
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          Belum punya akun? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
