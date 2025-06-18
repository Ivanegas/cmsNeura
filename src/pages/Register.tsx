import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("viewer");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) throw signUpError;

            const userId = data.user?.id;
            if (!userId) throw new Error("No se pudo obtener el ID del usuario.");

            const { error: profileError } = await supabase.from("profiles").insert({
                id: userId,
                username,
                email,
                password,
                role,
            });

            if (profileError) throw profileError;

            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Error desconocido");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={{ marginBottom: 12 }}>✅ Registro exitoso</h2>
                    <p>Revisa tu correo para confirmar tu cuenta</p>
                    <button style={styles.button} onClick={() => navigate("/login")}>
                        Ir al login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.card}>
                <h2 style={{ textAlign: "center" }}>📝 Crear cuenta</h2>

                <label style={styles.label}>Nombre de usuario</label>
                <input
                    style={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label style={styles.label}>Correo electrónico</label>
                <input
                    type="email"
                    style={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label style={styles.label}>Contraseña</label>
                <input
                    type="password"
                    style={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label style={styles.label}>Rol</label>
                <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="viewer">Viewer</option>
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor</option>
                </select>

                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? "Registrando..." : "Registrarse"}
                </button>

                {error && <p style={styles.error}>{error}</p>}

                <p style={{ textAlign: "center", marginTop: "1rem" }}>
                    ¿Ya tienes cuenta?{" "}
                    <a href="/login" style={{ color: "#2563eb", textDecoration: "underline" }}>
                        Inicia sesión
                    </a>
                </p>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        height: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
    },
    card: {
        background: "#ffffff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "100%",
        maxWidth: "400px",
    },
    label: {
        fontWeight: "bold",
        marginBottom: "0.25rem",
    },
    input: {
        padding: "0.5rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    button: {
        backgroundColor: "#2563eb",
        color: "#fff",
        fontWeight: "bold",
        padding: "0.75rem",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
    },
    error: {
        color: "red",
        fontSize: "0.9rem",
        textAlign: "center",
        marginTop: "-0.5rem",
    },
};

export default Register;
// This code defines a registration page for a web application using React.
// It allows users to create an account by providing a username, email, password, and role.