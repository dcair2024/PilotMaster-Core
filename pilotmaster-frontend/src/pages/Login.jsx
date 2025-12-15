// src/pages/Login.jsx
import { useState } from "react";
import { login } from "../api/AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/home");
    } catch {
      alert("Login inválido");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="Usuário" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Senha" onChange={e => setPassword(e.target.value)} />
      <button type="submit">Entrar</button>
    </form>
  );
}
