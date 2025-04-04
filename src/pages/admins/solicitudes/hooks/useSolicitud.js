import { useEffect, useState } from "react";
import useModal from "../../../../hooks/useModal";
import { useAppSelector } from "../../../../hooks/useStore";
import { URL_ARCHIVOS } from "../../../../models/rutas/endpoints.model";
import { alertError, alertSucces, alertWarning } from "../../../../utils/alerts/alertas.utility";
import { normalizeText } from "../../../../utils/convertidores/converter";
import apiQuerySolicitud from "../api/apiQuerySolicitud";

export default function useSolicitud(soli) {

    const user = useAppSelector(state => state.credenciales);
    const { openModal, toggleModal } = useModal();
    const { isLoading, isCreating, isUpdating, solicitudes, createSolicitudMutation, actualizarSolicitudMutation } = apiQuerySolicitud();

    const [fileUrl, setFileUrl] = useState('');
    const [busqueda, setBusqueda] = useState("");
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
    }

    const abrirModal = () => {
        toggleModal();
        recargar();
    }

    /*================= CREAR ============================== */

    const handleChange = ({ target }) => {
        setSolicitud({ ...solicitud, [target.name]: target.value });
    };

    const handleChangeImagen = (event) => {
        const file = event.target.files[0];
        setSolicitud({ ...solicitud, archivo: file })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("tipo", solicitud.tipo);
        formData.append("descripcion", solicitud.descripcion);
        formData.append("prioridad", solicitud.prioridad);
        formData.append("archivo", solicitud.archivo);
        formData.append("estado", solicitud.estado);
        formData.append("usuario", user.id);
        createSolicitudMutation(formData, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    abrirModal();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        })
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

    //================= Actualizar ==============================

    const cargar = (solicitud) => {
        setSolicitud(solicitud);
        toggleModal();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("tipo", solicitud.tipo);
        formData.append("descripcion", solicitud.descripcion);
        formData.append("prioridad", solicitud.prioridad);
        formData.append("archivo", solicitud.archivo);
        formData.append("estado", solicitud.estado);
        formData.append("usuario", user.id);
        actualizarSolicitudMutation({ id: solicitud.id, solicitud: formData }, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    abrirModal();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        })
    }

    return {
        titulo: "Solicitudes",
        tituloModal: solicitud.id ? "Actualizar Solicitud" : "Crear Solicitud",
        lista,
        loading: isCreating || isUpdating,
        isLoading,
        openModal,
        solicitud,
        fileUrl,
        busqueda,
        handleBusqueda,
        setSolicitud,
        toggleModal,
        handleChange,
        handleChangeImagen,
        handler: solicitud.id ? handleUpdate : handleSubmit,
        cargar,
    }
}
