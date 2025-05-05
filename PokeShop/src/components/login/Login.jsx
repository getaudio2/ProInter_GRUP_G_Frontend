import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
                navigate("/catalogo");
            } else {
                console.error("Login failed:", data);
                alert(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Request error:", error);
        }
    };

    return (
        <>
            <p>Login</p>
            <form onSubmit={submitLogin}>
                <p>Usuario:</p>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p>Contraseña:</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </>
    );
}

export default Login;
