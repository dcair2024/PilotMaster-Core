import { useState } from "react";
import { login } from "../api/AuthService"; 

export default function TestAuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleLogin = async () => {
    try {
      const data = await login(username, password);

      setResponse("TOKEN OK: " + data.token);
      localStorage.setItem("token", data.token);

    } catch (err) {
      setResponse("ERRO: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Teste Auth</h2>

      <input
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      <input
        placeholder="Senha"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button onClick={handleLogin}>Testar Login</button>

      <p>{response}</p>
    </div>
  );
}
