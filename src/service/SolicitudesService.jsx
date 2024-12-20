import axios from "axios";
import { Endpoints } from "../models/EndpointsModel";

const URL = Endpoints.SOLICITUDES;

export async function createSolicitud(solicitud) {
    try {
        const res = await axios.post(URL, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadSolicitudesEstado(estado) {
    try {
        const res = await axios.get(URL + "/estado/" + estado);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getSolicitudesConsultor(id) {
    try {
        const res = await axios.get(URL + "/consultor/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadSolicitudesConsultor(id) {
    try {
        const res = await axios.get(URL + "/consultor/cantidad/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getSolicitudesInstitucion(id) {
    try {
        const res = await axios.get(URL + "/institucion/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadSolicitudesInstitucion(id) {
    try {
        const res = await axios.get(URL + "/institucion/cantidad/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getPromedioSolicitudesInstitucion(id) {
    try {
        const res = await axios.get(URL + "/promedio/institucion/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function asignPersonaSolicitud(solicitud) {
    try {
        const res = await axios.put(URL + "/" + solicitud.id, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getSolicitudesPersona(id) {
    try {
        const res = await axios.get(URL + "/persona/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadSolicitudesPersona(id) {
    try {
        const res = await axios.get(URL + "/persona/cantidad/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function responderSolicitud(solicitud) {
    try {
        const res = await axios.put(URL + "/respuesta/" + solicitud.id, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function cambiarPrioridad(solicitud) {
    try {
        const res = await axios.put(URL + "/prioridad/" + solicitud.id, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateSolicitud(id, solicitud) {
    try {
        const res = await axios.put(URL + "/actualizar/" + id, solicitud);
        return res.data;
    } catch (error) {
        throw error;
    }
}
