import { useAuth } from "@/stores/useAuth";
import { Navigate } from "react-router-dom";

interface Props {
    children: JSX.Element;
    roles?: string[];
}

const ProtectedRoute = ({ children, roles }: Props) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/login" replace />;

    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
