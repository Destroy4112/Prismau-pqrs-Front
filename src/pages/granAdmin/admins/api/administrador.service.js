import api from "../../../../config/axiosConfig";
import { ENDPOINTS } from "../../../../models/rutas/endpoints.model";

const URL = ENDPOINTS.ADMINISTRADORES;

export async function createAdministrador(administrador) {
    try {
        const res = await api.post(URL, administrador);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getAdministradoresInstitucion(id) {
    try {
        const res = await api.get(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateAdministrador(administrador) {
    try {
        const res = await api.put(URL + "/" + administrador.id, administrador);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteAdministrador(id) {
    try {
        const res = await api.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}