import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import TestAuthPage from "./pages/TestAuthPage";
import TestSchedulePage from "./pages/TestSchedulePage";
import TestScheduleCreate from "./pages/TestScheduleCreate";
import TestTariffPage from "./pages/TestTariffPage";
import ShipsList from "./pages/ShipsList.jsx";  // <- IMPORT NECESSÁRIO
import "./styles/design-system.css";
import "./styles/cards.css";


export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN (rota pública) */}
        <Route path="/auth/login" element={<Login />} />

        {/* ROTAS PROTEGIDAS */}
        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}
          <Route path="/home" element={<Home />} />

          {/* Navios */}
          <Route path="/ships" element={<ShipsList />} />

          {/* Agendamentos (lista) */}
          <Route path="/schedule" element={<TestSchedulePage />} />

          {/* Novo agendamento */}
          <Route path="/schedule/new" element={<TestScheduleCreate />} />

          {/* Tarifa */}
          <Route path="/tariff" element={<TestTariffPage />} />

          {/* Configurações */}
          <Route path="/settings" element={<div>Configurações (em construção)</div>} />

          {/* Redirecionamento padrão */}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Route>

        {/* Testes isolados */}
        <Route path="/test/auth" element={<TestAuthPage />} />

        {/* 404 */}
        <Route path="*" element={<div style={{ padding: 20 }}>404 — Não encontrado</div>} />
      </Routes>

    </BrowserRouter>
  );
}
