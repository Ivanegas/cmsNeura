import { useAuth } from "@/stores/useAuth";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} style={{ marginTop: 20 }}>
            🔓 Cerrar sesión
        </button>
    );
};

export default LogoutButton;
