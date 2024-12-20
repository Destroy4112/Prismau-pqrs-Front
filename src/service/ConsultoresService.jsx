import axios from "axios";
import { Endpoints } from "../models/EndpointsModel";

const URL = Endpoints.CONSULTORES;

export async function createConsultor(Consultor) {
    try {
        const res = await axios.post(URL, Consultor);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function getConsultores() {
    try {
        const res = await axios.get(URL);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function updateConsultor(Consultor) {
    try {
        const res = await axios.put(URL + "/" + Consultor.id, Consultor);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function deleteConsultor(id) {
    try {
        const res = await axios.delete(URL + "/" + id);
        return res.data;
    } catch (error) {
        throw error;
    }
}