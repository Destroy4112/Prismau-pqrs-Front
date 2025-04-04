import api from "../../../../config/axiosConfig";
import { ENDPOINTS } from "../../../../models/rutas/endpoints.model";

const URL = ENDPOINTS.CONSULTORES;

export async function createConsultor(Consultor) {
    try {
        const res = await api.post(URL, Consultor);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getConsultores() {
    try {
        const res = await api.get(URL);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateConsultor(Consultor) {
    try {
        const res = await api.put(URL + "/" + Consultor.id, Consultor);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteConsultor(id) {
    try {
        const res = await api.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}