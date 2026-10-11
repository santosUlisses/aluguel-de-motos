import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"



export default function RotaLogado() {
    const { token } = useAuth();
    const usuario = localStorage.getItem("usuario")
    if (token || usuario) {
        return <Navigate to={"/painel/usuario"} />
    }
    return <Outlet />
}