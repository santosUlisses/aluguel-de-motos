import { createContext, useContext, useEffect, useState, } from "react";
import { Navigate } from "react-router-dom";
import { tokenExpirado, tempoExpirar } from "../utils/jwt";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(localStorage.getItem("usuario") || "");
    const [token, setToken] = useState(localStorage.getItem("token") || "");



    function login(usuario, token) {
        setUsuario(usuario);
        setToken(token);
        localStorage.setItem("usuario", JSON.stringify(usuario))
        localStorage.setItem("token", token)
    }

    function logOut() {
        setUsuario(null);
        setToken(null);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
    }



    useEffect(() => {

        if (!usuario || !token) {
            return
        }


        setUsuario(JSON.parse(usuario))
        setToken(token);


        if (tokenExpirado(token)) {
            logOut();
            return
        }
        const tempoRestante = tempoExpirar(token);

        const temporizador = setTimeout(() => {
            logOut();
        }, tempoRestante);

        return () => clearTimeout(temporizador);


    }, []);

    return (
        <AuthContext.Provider value={{ usuario, token, login, logOut }}>
            {children}
        </AuthContext.Provider>
    );

}
export function useAuth() {
    return useContext(AuthContext);
}
