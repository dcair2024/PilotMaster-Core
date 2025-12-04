import { useState } from "react";
import { login } from "../api/AuthService";
import { useNavigate } from "react-router-dom"; // <-- PASSO 1: Importar useNavigate

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate(); // <-- PASSO 2: Inicializar o hook

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const result = await login(username, password);

            // Armazenamento Completo: token e refreshToken
            localStorage.setItem("token", result.token);
            localStorage.setItem("refreshToken", result.refreshToken); 

            alert("Login OK!");
            
            // <-- PASSO 3: CORREÇÃO DO REDIRECIONAMENTO
            navigate("/home", { replace: true }); 
            // 'replace: true' garante que a página de login não fique no histórico do navegador.

        } catch (err) {
            setError("Usuário ou senha inválidos");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "350px", margin: "50px auto" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div style={{ marginTop: 10 }}>
                    <label>Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button style={{ marginTop: 15 }} disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}