import { useState } from "react";
import AuthService from "../api/AuthService";

export default function TestAuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");

  const handleLogin = async () => {
    try {
      const data = await AuthService.login({ username, password });
      setResponse("Login OK! Token recebido.");
    } catch (err) {
      setResponse(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Teste Auth</h1>

      <input
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>Testar Login</button>

      <p>{response}</p>
    </div>
  );
}
