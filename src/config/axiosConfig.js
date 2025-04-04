import axios from "axios";
import { URL_BACKEND } from "../models/rutas/endpoints.model";

const api = axios.create({
    baseURL: `${URL_BACKEND}/api/`,
});

export default api; 