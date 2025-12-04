import React from "react";
// Adicionar ProtectedRoute ao import
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom"; 
import Login from "./pages/Login.jsx"; 
import Home from "./pages/Home.jsx"; 
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // <-- NOVO IMPORT
import TestAuthPage from "./pages/TestAuthPage";
import TestSchedulePage from "./pages/TestSchedulePage";
import TestTariffPage from "./pages/TestTariffPage";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12 }}>
        <Link to="/auth/login" style={{ marginRight: 8 }}>Login</Link>
        <Link to="/home" style={{ marginRight: 8 }}>Home</Link>
        <Link to="/test/auth" style={{ marginRight: 8 }}>Test Auth</Link> 
        <Link to="/test/schedule" style={{ marginRight: 8 }}>Schedule</Link>
        <Link to="/test/tariff">Tariff</Link>
      </nav>
      <Routes>
        
        {/* ROTA DE LOGIN: SEMPRE ACESSÍVEL */}
        <Route path="/auth/login" element={<Login />} />
        
        {/* GRUPO DE ROTAS PROTEGIDAS: ENVOLVIDAS POR PROTECTEDROUTE */}
        <Route element={<ProtectedRoute />}> {/* <-- AQUI ESTÁ A CHAVE! */}
        
            {/* Estas rotas só carregam se o token existir */}
            <Route path="/home" element={<Home />} /> 
            <Route path="/test/schedule" element={<TestSchedulePage />} />
            <Route path="/test/tariff" element={<TestTariffPage />} />
            
            {/* Redireciona a raiz para a Home, que agora está protegida */}
            <Route path="/" element={<Navigate to="/home" replace />} /> 
            
        </Route>
        
        {/* Rota de Teste Antiga (Se não precisar de proteção) */}
        <Route path="/test/auth" element={<TestAuthPage />} />

        <Route path="*" element={<div style={{ padding: 20 }}>404 — Não encontrado</div>} />
      </Routes>
    </BrowserRouter>
  );
}