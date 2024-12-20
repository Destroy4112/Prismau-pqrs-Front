import axios from "axios";
import { Endpoints } from "../models/EndpointsModel";

const URL = Endpoints.ROLES;

export async function createRol(rol) {
    try {
        const res = await axios.post(URL, rol);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getRoles() {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadRoles() {
    try {
        const res = await axios.get(URL + "/cantidad");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateRol(rol) {
    try {
        const res = await axios.put(URL + "/" + rol.id, rol);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteRol(id) {
    try {
        const res = await axios.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}