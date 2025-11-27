import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TestAuthPage from "./pages/TestAuthPage";
import TestSchedulePage from "./pages/TestSchedulePage";
import TestTariffPage from "./pages/TestTariffPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12 }}>
        <Link to="/test/auth" style={{ marginRight: 8 }}>Auth</Link>
        <Link to="/test/schedule" style={{ marginRight: 8 }}>Schedule</Link>
        <Link to="/test/tariff">Tariff</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div style={{ padding: 20 }}>Home — abra /test/auth</div>} />
        <Route path="/test/auth" element={<TestAuthPage />} />
        <Route path="/test/schedule" element={<TestSchedulePage />} />
        <Route path="/test/tariff" element={<TestTariffPage />} />
        <Route path="*" element={<div style={{ padding: 20 }}>404 — Não encontrado</div>} />
      </Routes>
    </BrowserRouter>
  );
}

