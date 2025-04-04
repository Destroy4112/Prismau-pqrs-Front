import { jwtDecode } from "jwt-decode";
import { TokenGuard } from "../utils/guards/TokenGuard";
import { usarStorage } from "../utils/localstorage/localstorage";
import api from "./axiosConfig";

export const AxiosInterceptor = () => {

    const isTokenExpired = (token) => {
        if (!token) return true;
        try {
            const decoded = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decoded.exp < currentTime;
        } catch (error) {
            console.error("Error decodificando token:", error);
            return true;
        }
    };

    api.interceptors.request.use((request) => {
        const token = usarStorage("@prismau_token");
        if (token) {
            if (isTokenExpired(token)) {
                alert("Token expirado. Por favor, inicie sesión de nuevo.");
                TokenGuard();
                return Promise.reject(new api.Cancel("Token de autenticación expirado"));
            }
            request.headers['Authorization'] = `Bearer ${token}`;
        }
        return request;
    },
        error => Promise.reject(error)
    );
}
