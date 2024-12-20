import axios from "axios";
import { Endpoints } from "../models/EndpointsModel";

const URL = Endpoints.INSTITUCIONES;

export async function createInstitucion(institucion) {
    try {
        const res = await axios.post(URL, institucion);
        return res.data;
    } catch (error) {        
        throw error;
    }
}

export async function getInstituciones() {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getCantidadInstituciones() {
    try {
        const res = await axios.get(URL + "/cantidad");
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateInstitucion(institucion) {
    try {
        const res = await axios.put(URL + "/" + institucion.id, institucion);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateLogoInstitucion(logo, id) {
    const options = {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    };
    try {
        const res = await axios.post(URL + "/imagen/" + id, logo, options);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteInstitucion(id) {
    try {
        const res = await axios.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}