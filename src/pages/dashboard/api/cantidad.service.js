import api from "../../../config/axiosConfig";
import { ENDPOINTS } from "../../../models/rutas/endpoints.model";

const URL_INSTITUCION = ENDPOINTS.INSTITUCIONES;
const URL_ROL = ENDPOINTS.ROLES;
const URL_SOLICITUD = ENDPOINTS.SOLICITUDES;

export async function getCantidadInstituciones() {
    try {
        const res = await api.get(URL_INSTITUCION + "/cantidad");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadRoles() {
    try {
        const res = await api.get(URL_ROL + "/cantidad");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadSolicitudesEstado(id, estado) {
    try {
        const res = await api.get(`${URL_SOLICITUD}/estado/${id}/${estado}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadSolicitudesConsultor(id) {
    try {
        const res = await api.get(URL_SOLICITUD + "/consultor/cantidad/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadSolicitudesInstitucion(id) {
    try {
        const res = await api.get(URL_SOLICITUD + "/institucion/cantidad/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getPromedioSolicitudesInstitucion(id) {
    try {
        const res = await api.get(URL_SOLICITUD + "/promedio/institucion/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadSolicitudesPersona(id) {
    try {
        const res = await api.get(URL_SOLICITUD + "/persona/cantidad/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}