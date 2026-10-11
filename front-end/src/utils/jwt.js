import { jwtDecode } from 'jwt-decode';


export function tokenExpirado(token) {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        return true
    }
}

export function tempoExpirar(token) {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 - Date.now();
    } catch (error) {
        return 0
    }
}