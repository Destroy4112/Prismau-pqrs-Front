import api from "../../../../config/axiosConfig";
import { ENDPOINTS } from "../../../../models/rutas/endpoints.model";

const URL = ENDPOINTS.SOLICITUDES;

export async function createSolicitud(solicitud) {
    try {
        const res = await api.post(URL, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getSolicitudes(id) {
    try {
        const res = await api.get(URL + "/admin/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateSolicitud(id, solicitud) {
    try {
        const res = await api.put(URL + "/actualizar/" + id, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}
