import api from "../../../../config/axiosConfig";
import { ENDPOINTS } from "../../../../models/rutas/endpoints.model";

const URL = ENDPOINTS.SOLICITUDES;

export async function getSolicitudes(id) {
    try {
        const res = await api.get(URL + "/consultor/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getSolicitudesPersona(id) {
    try {
        const res = await api.get(URL + "/persona/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function cambiarPrioridad(solicitud) {
    try {
        const res = await api.put(URL + "/prioridad/" + solicitud.id, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function asignPersonaSolicitud(solicitud) {
    try {
        const res = await api.put(URL + "/" + solicitud.id, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function responderSolicitud(solicitud) {
    try {
        const res = await api.put(URL + "/respuesta/" + solicitud.id, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}