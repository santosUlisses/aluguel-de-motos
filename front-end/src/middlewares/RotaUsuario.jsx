import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function RotaUsuario() {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to={"/login"} replace />
    }
    return <Outlet />
}