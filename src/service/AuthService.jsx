import axios from "axios";
import { Endpoints } from "../models/EndpointsModel";

const URL = Endpoints.LOGIN;

export async function validarSesion(usuario) {
    try {
        const res = await axios.post(URL, usuario);
        return res.data;
    } catch (error) {
        throw error;
    }
}
