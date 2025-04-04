import api from "../../../../config/axiosConfig";
import { ENDPOINTS } from "../../../../models/rutas/endpoints.model";

const URL = ENDPOINTS.PERSONAL;

export async function createPersona(persona) {
    try {
        const res = await api.post(URL, persona);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getPersonas() {
    try {
        const res = await api.get(URL);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updatePersona(persona) {
    try {
        const res = await api.put(URL + "/" + persona.id, persona);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deletePersona(id) {
    try {
        const res = await api.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}