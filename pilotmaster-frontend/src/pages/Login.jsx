import { useState } from "react";
import { login } from "../api/AuthService";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from '../assets/logo/pilotmaster-logo.png';


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
    <div className="login-page">
      <div className="pm-card login-card">

        {/* LOGO */}
        <div className="login-header">
  <img src={logo} alt="PilotMaster" className="login-logo" />
</div>



        {/* FORM */}
        <form onSubmit={handleLogin}>
          <div className="form-field">
            <input
              className="ds-input"
              placeholder="Usuário"
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="form-field">
            <input
              className="ds-input"
              type="password"
              placeholder="Senha"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="btn-primary" type="submit">
            Entrar
          </button>
        </form>

      </div>
    </div>
  );
}
