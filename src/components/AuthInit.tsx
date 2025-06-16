import { useEffect } from "react";
import { useAuth } from "@/stores/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const AuthInit = () => {
    const { fetchProfile, user, loading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (!loading && user) {
            // Solo redirigir si estamos en login o register
            const isAuthPage = ["/login", "/register"].includes(location.pathname);

            if (isAuthPage) {
                if (user.role === "admin") {
                    navigate("/cms", { replace: true });
                } else if (user.role === "editor") {
                    navigate("/editor", { replace: true });
                } else {
                    navigate("/viewer", { replace: true });
                }
            }
        }
    }, [user, loading, location.pathname]);

    return null;
};

export default AuthInit;
