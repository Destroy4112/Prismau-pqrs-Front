import axios from "axios";
import { Endpoints } from "../models/EndpointsModel";

const URL = Endpoints.ADMINISTRADORES;

export async function createAdministrador(administrador) {
    try {
        const res = await axios.post(URL, administrador);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getAdministradoresInstitucion(id) {
    try {
        const res = await axios.get(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateAdministrador(administrador) {
    try {
        const res = await axios.put(URL + "/" + administrador.id, administrador);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteAdministrador(id) {
    try {
        const res = await axios.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}