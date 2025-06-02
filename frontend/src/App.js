import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/loginPage";
import Register from "./components/registerPage";
import DashboardAdmin from "./admin/dashboardAdmin";
import EditKamar from "./admin/editKamar";
import TambahKamar from "./admin/tambahKamar";
import DashboardPage from "./components/dashboardPage";
import BayarPage from "./components/bayarPage";
import BuktiBayar from "./admin/buktiBayar";
import EditBayar from "./components/editBayar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/editkamar/:id" element={<EditKamar />} />
        <Route path="/tambahkamar" element={<TambahKamar />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/bayar/:id" element={<BayarPage />} />
        <Route path="/buktibayar" element={<BuktiBayar />} />
        <Route path="/editbayar" element={<EditBayar />} />
      </Routes>
    </Router>
  );
}

export default App;
