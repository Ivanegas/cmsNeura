import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";

const Register = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Crear usuario en Supabase Auth
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (signUpError) throw signUpError;

            const userId = data.user?.id;

            if (!userId) throw new Error("No se pudo obtener el ID del usuario.");

            // 2. Insertar en tabla `profiles`
            const { error: profileError } = await supabase.from("profiles").insert({
                id: userId,
                username,
                email,
                password, // Puedes omitirlo si ya está en auth, pero lo incluyo por compatibilidad con tu tabla
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
            <div style={{ maxWidth: 400, margin: "auto" }}>
                <h2>✅ Registro exitoso</h2>
                <p>Revisa tu correo para confirmar tu cuenta</p>
                <button onClick={() => navigate("/login")}>Ir al login</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
            <h2>Crear cuenta</h2>

            <label>Nombre de usuario</label>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />

            <label>Correo electrónico</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label>Contraseña</label>
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <label>Rol</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="viewer">Viewer</option>
                <option value="admin">Administrador</option>
                <option value="editor">Editor</option>
            </select>

            <button type="submit" disabled={loading}>
                {loading ? "Registrando..." : "Registrarse"}
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default Register;
