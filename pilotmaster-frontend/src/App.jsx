import React from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import TestAuthPage from "./pages/TestAuthPage";
import TestSchedulePage from "./pages/TestSchedulePage";
import TestTariffPage from "./pages/TestTariffPage";
import TestScheduleCreate from "./pages/TestScheduleCreate";   // <-- NOVO IMPORT

export default function App() {
  return (
    <BrowserRouter>

      {/* MENU */}
      <nav style={{ padding: 12 }}>
        <Link to="/auth/login" style={{ marginRight: 8 }}>Login</Link>
        <Link to="/home" style={{ marginRight: 8 }}>Home</Link>
        <Link to="/test/auth" style={{ marginRight: 8 }}>Test Auth</Link>
        <Link to="/test/schedule" style={{ marginRight: 8 }}>Schedule</Link>
        <Link to="/test/schedule-create" style={{ marginRight: 8 }}>New Schedule</Link> {/* <-- NOVO LINK */}
        <Link to="/test/tariff">Tariff</Link>
      </nav>

      <Routes>

        {/* LOGIN (rota pública) */}
        <Route path="/auth/login" element={<Login />} />

        {/* ROTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>

          {/* Home */}
          <Route path="/home" element={<Home />} />

          {/* Listagem de schedules */}
          <Route path="/test/schedule" element={<TestSchedulePage />} />

          {/* Criação de schedule (FE-05) */}
          <Route path="/test/schedule-create" element={<TestScheduleCreate />} />  {/* <-- AQUI!!! */}

          {/* Tarifa */}
          <Route path="/test/tariff" element={<TestTariffPage />} />

          {/* Redireciona raiz para /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

        </Route>

        {/* Rota isolada que não precisa de proteção */}
        <Route path="/test/auth" element={<TestAuthPage />} />

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 20 }}>404 — Não encontrado</div>} />
      </Routes>

    </BrowserRouter>
  );
}
