import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../../../hooks/useModal";
import { PrivateRoutes } from "../../../../models/RoutesModel";
import { URL_ARCHIVOS } from "../../../../models/rutas/endpoints.model";
import { alertError, alertSucces, alertWarning } from "../../../../utils/alerts/alertas.utility";
import { normalizeText } from "../../../../utils/convertidores/converter";
import apiQuerySolicitud from "../api/apiQuerySolicitud";

export default function useSolicitud(soli) {

    const navigate = useNavigate();
    const { openModal, toggleModal } = useModal();
    const { isAsigning, isChangingPriority, isLoading, isResponding, solicitudes, responderSolicitudMutation,
        prioridadSolicitudMutation, responsableSolicitudMutation } = apiQuerySolicitud();

    const [fileUrl, setFileUrl] = useState('');
    const [busqueda, setBusqueda] = useState("");
    const [puedeResponder, setPuedeResponder] = useState(false);
    const [solicitud, setSolicitud] = useState(soli || {
        tipo: "",
        descripcion: "",
        prioridad: "",
        archivo: "",
        estado: "PENDIENTE",
        usuario: 1,
        respuesta: null
    });

    /*================= RECARGAR ============================== */

    useEffect(() => {
        if (solicitud.archivo) {
            setFileUrl(`${URL_ARCHIVOS}${solicitud.archivo}`);
        }
    }, [solicitud.archivo]);

    const recargar = () => {
        setSolicitud({
            tipo: "",
            descripcion: "",
            prioridad: "",
            archivo: "",
            estado: "PENDIENTE",
            usuario: 1,
            respuesta: null
        });
        navigate(PrivateRoutes.SOLICITUDES_INSTITUCIONES, { replace: true });
    }

    /*================= Buscar ============================== */

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    }

    const filterBusqueda = (listado, busqueda) => {
        if (!busqueda) return listado;

        const busquedaNormalizada = normalizeText(busqueda);
        const palabrasBusqueda = busquedaNormalizada.split(/\s+/);

        return listado.filter((dato) => {
            const descripcion = normalizeText(dato.descripcion);
            const tipo = normalizeText(dato.tipo);

            return palabrasBusqueda.every(palabra =>
                descripcion.includes(palabra) || tipo.includes(palabra)
            );
        });
    };

    const lista = filterBusqueda(solicitudes, busqueda);

    /*================= Cambiar prioridad ============================== */

    const handleChange = ({ target }) => {
        setSolicitud({ ...solicitud, [target.name]: target.value });
    }

    const changePrioridad = (e) => {
        e.preventDefault();
        prioridadSolicitudMutation(solicitud, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    recargar();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        });
    }

    /*================= Asignar responsable ============================== */

    const asignarPersona = (e) => {
        e.preventDefault();
        responsableSolicitudMutation(solicitud, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    recargar();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        });
    }

    /*================= Responder solicitud ============================== */

    const handleCheckboxChange = () => {
        setPuedeResponder(!puedeResponder);
    };

    const responder = (e) => {
        e.preventDefault();
        responderSolicitudMutation(solicitud, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    recargar();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        });
    }

    return {
        titulo: "Solicitudes",
        lista,
        isLoading,
        loading: isResponding,
        loadingPrioridad: isChangingPriority,
        loadingAsignar: isAsigning,
        openModal,
        solicitud,
        fileUrl,
        puedeResponder,
        busqueda,
        handleChange,
        handleBusqueda,
        handleCheckboxChange,
        setSolicitud,
        toggleModal,
        asignarPersona,
        responder,
        changePrioridad,
    }
}
