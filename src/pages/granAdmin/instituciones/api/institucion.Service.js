import api from "../../../../config/axiosConfig";
import { ENDPOINTS } from "../../../../models/rutas/endpoints.model";

const URL = ENDPOINTS.INSTITUCIONES;

export async function createInstitucion(institucion) {
    try {
        const res = await api.post(URL, institucion);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getInstituciones() {
    try {
        const res = await api.get(URL);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateInstitucion(institucion) {
    try {
        const res = await api.put(URL + "/" + institucion.id, institucion);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateLogoInstitucion(logo, id) {
    try {
        const res = await api.post(URL + "/imagen/" + id, logo);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteInstitucion(id) {
    try {
        const res = await api.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}