import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PrivateRoutes } from "../models/RoutesModel";
import { responderSolicitud } from "../service/SolicitudesService";

export default function useRespuesta(id) {

    const navigate = useNavigate();
    const user = useSelector(state => state.credenciales);
    const [loading, setLoading] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const [respuesta, setRespuesta] = useState({
        respuesta: "",
        user_id: user.id,
        solicitud_id: id
    });

    /*================= RESPONDER ============================== */

    const handleChange = ({ target }) => {
        setRespuesta({
            ...respuesta,
            [target.name]: target.value
        });
    };

    const responder = async () => {
        setLoading(true);
        try {
            const res = await responderSolicitud(respuesta);
            if (res.status) {
                navigate(PrivateRoutes.SOLICITUDES);
                toast.success("Respondido con exito", { autoClose: 2000 });
            } else if (res.status === false && res.message === "validacion") {
                const errors = res.errors;
                for (const [field, messages] of Object.entries(errors)) {
                    messages.forEach(message => toast.warn(message));
                }
            } else {
                toast.error("No se pudo responder la solicitud");
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    return {
        loading,
        respuesta,
        fileUrl,
        setFileUrl,
        handleChange,
        responder
    }
}
