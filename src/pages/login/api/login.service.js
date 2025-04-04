import api from "../../../config/axiosConfig";
import { ENDPOINTS } from "../../../models/rutas/endpoints.model";

const URL = ENDPOINTS.LOGIN;

export async function iniciarSesion(usuario) {
    try {
        const res = await api.post(URL, usuario);
        return res.data;
    } catch (error) {
        throw error;
    }
}
