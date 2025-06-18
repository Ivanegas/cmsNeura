import { useAuth } from "@/stores/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
    const { login, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(email, password);
            // No redirigimos aquí directamente. Lo hacemos en useEffect con el rol.
        } catch (err) {
            alert("Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            switch (user.role) {
                case "admin":
                    navigate("/cms", { replace: true });
                    break;
                case "editor":
                    navigate("/editor", { replace: true });
                    break;
                case "viewer":
                    navigate("/viewer", { replace: true });
                    break;
                default:
                    navigate("/", { replace: true }); // <- Corregido aquí
            }
        }
    }, [user, navigate]);

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f9fafb",
            }}
        >
            <form
                onSubmit={handleLogin}
                style={{
                    background: "#fff",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    minWidth: "300px",
                }}
            >
                <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>🔐 Iniciar Sesión</h2>

                <label style={{ fontWeight: "bold" }}>Correo electrónico</label>
                <input
                    type="email"
                    value={email}
                    placeholder="ejemplo@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        padding: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />

                <label style={{ fontWeight: "bold" }}>Contraseña</label>
                <input
                    type="password"
                    value={password}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        padding: "0.5rem",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                    }}
                />

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        backgroundColor: "#2563eb",
                        color: "white",
                        padding: "0.75rem",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "bold",
                        cursor: loading ? "not-allowed" : "pointer",
                    }}
                >
                    {loading ? "Ingresando..." : "Iniciar sesión"}
                </button>

                <p style={{ textAlign: "center", fontSize: "0.875rem", marginTop: "1rem" }}>
                    ¿No tienes cuenta?{" "}
                    <a href="/register" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        Regístrate aquí
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
