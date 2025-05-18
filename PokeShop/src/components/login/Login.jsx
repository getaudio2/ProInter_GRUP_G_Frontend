import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const submitLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/users/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log("Login successful:", data);
                document.cookie = "id=" + data.id + ";";
                if (data.rol === "usuario") {
                    navigate("/catalogo");
                } else {
                    navigate("/admin");
                }
            } else {
                console.error("Login failed:", data);
                alert(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Request error:", error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="login-title">Iniciar Sesión</h1>
                <form onSubmit={submitLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Usuario:</label>
                        <input
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input"
                            placeholder="Ingresa tu email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Contraseña:</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>
                    <button type="submit" className="login-button">Iniciar sesión</button>
                    <p>¿No tienes cuenta?</p>
                    <button type="button" onClick={() => navigate("/registro")}>Registrate</button>

                </form>
            </div>
        </div>
    );
}

export default Login;