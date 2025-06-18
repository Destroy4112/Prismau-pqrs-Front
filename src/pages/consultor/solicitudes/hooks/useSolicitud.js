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
        prioridadSolicitudMutation, responsableSolicitudMutation, enProcesoMutation } = apiQuerySolicitud();

    const [fileUrl, setFileUrl] = useState('');
    const [fileRespuestaUrl, setFileRespuestaUrl] = useState('');
    const [busqueda, setBusqueda] = useState("");
    const [puedeResponder, setPuedeResponder] = useState(false);
    const [solicitud, setSolicitud] = useState(soli || {
        tipo: "",
        descripcion: "",
        prioridad: "",
        archivo: "",
        estado: "PENDIENTE",
        usuario: 1,
        respuesta: null,
        respuesta_Archivo: null
    });

    /*================= RECARGAR ============================== */

    useEffect(() => {
        if (solicitud.archivo) {
            setFileUrl(`${URL_ARCHIVOS}${solicitud.archivo}`);
        }
        if(solicitud.respuesta_Archivo) {
            setFileRespuestaUrl(`${URL_ARCHIVOS}${solicitud.respuesta_Archivo}`);
        }
    }, [solicitud.archivo, solicitud.respuesta_Archivo]);

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

    /*================= En proceso ============================== */

    const goToRespuesta = (solicitud) => {
        if (solicitud.estado === "PENDIENTE") {
            solicitud.estado = "EN PROCESO";
            enProcesoMutation(solicitud.id, { onSuccess: () => { alertSucces("Solicitud en proceso"); } });
        }
        navigate(PrivateRoutes.RESPUESTA_CONSULTOR, { state: { solicitud } })
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

    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        setSolicitud({ ...solicitud, respuesta_Archivo: file })
    };

    const handleCheckboxChange = () => {
        setPuedeResponder(!puedeResponder);
    };

    const responder = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (solicitud.respuesta_Archivo) {
            formData.append('respuesta_Archivo', solicitud.respuesta_Archivo);
        }
        formData.append('respuesta', solicitud.respuesta);
        responderSolicitudMutation({ id: solicitud.id, solicitud: formData }, {
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
        fileRespuestaUrl,
        puedeResponder,
        busqueda,
        handleChange,
        handleBusqueda,
        handleCheckboxChange,
        setSolicitud,
        toggleModal,
        goToRespuesta,
        asignarPersona,
        handleChangeFile,
        responder,
        changePrioridad,
    }
}
