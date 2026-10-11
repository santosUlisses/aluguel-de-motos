import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'



export default function RotaAdmin() {
    const { token } = useAuth();
    const usuario = JSON.parse(localStorage.getItem("usuario"))

    if (!usuario || !token) {
        return <Navigate to={"/login"} replace />
    }
    if (usuario.tipo_usuario !== "admin") {
        return <Navigate to={"/painel/usuario"} replace />
    }

    return <Outlet />
}

