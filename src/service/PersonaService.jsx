import axios from "axios";
import { Endpoints } from "../models/EndpointsModel";

const URL = Endpoints.PERSONAL;

export async function createPersona(persona) {
    try {
        const res = await axios.post(URL, persona);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getPersonas() {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updatePersona(persona) {
    try {
        const res = await axios.put(URL + "/" + persona.id, persona);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deletePersona(id) {
    try {
        const res = await axios.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}