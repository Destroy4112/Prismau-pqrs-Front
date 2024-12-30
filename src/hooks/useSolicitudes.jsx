import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import apiQuerySolicitud from "../api/apiQuerySolicitud";
import { RouteBackFile } from "../models/RoutesModel";

export default function useSolicitudes() {

    const user = useSelector(state => state.credenciales);
    const [openModal, setOpenModal] = useState(false);
    const { createSolicitudMutation, actualizarSolicitudMutation, prioridadSolicitudMutation, responsableSolicitudMutation,
        responderSolicitudMutation, isLoading, isCreating, isUpdating, solicitudes, isChangingPriority, isAsigning, isResponding
    } = apiQuerySolicitud(setOpenModal);
    const [fileUrl, setFileUrl] = useState('');
    const [busqueda, setBusqueda] = useState("");
    const [puedeResponder, setPuedeResponder] = useState(false);
    const [solicitud, setSolicitud] = useState({
        tipo: "",
        descripcion: "",
        prioridad: "",
        archivo: "",
        estado: "PENDIENTE",
        usuario: 1,
        respuesta: null
    });
    const tituloModal = solicitud.id ? "Actualizar Solicitud" : "Crear Solicitud";

    /*================= RECARGAR ============================== */

    useEffect(() => {
        if (solicitud.archivo) {
            setFileUrl(`${RouteBackFile}${solicitud.archivo}`);
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

    /*================= CREAR ============================== */

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = ({ target }) => {
        setSolicitud({
            ...solicitud,
            [target.name]: target.value
        });
    };

    const handleChangeImagen = (event) => {
        const file = event.target.files[0];
        setSolicitud({
            ...solicitud,
            archivo: file
        })
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
        createSolicitudMutation(formData)
    }

    /*================= Buscar ============================== */

    const handleBusqueda = ({ target }) => {
        setBusqueda(target.value);
    }

    const normalizeText = (text) => {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

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

    /*================= Asignar responsable ============================== */

    const handleAsignar = (e) => {
        e.preventDefault();
        responsableSolicitudMutation(solicitud);
    }

    /*================= Responder solicitud ============================== */

    const handleCheckboxChange = () => {
        setPuedeResponder(!puedeResponder);
    };

    const responder = (e) => {
        e.preventDefault();
        responderSolicitudMutation(solicitud);
    }

    /*================= Cambiar prioridad ============================== */

    const changePrioridad = (e) => {
        e.preventDefault();
        prioridadSolicitudMutation(solicitud);
    }

    //================= Actualizar ==============================

    const cargar = (solicitud) => {
        setSolicitud(solicitud);
        setOpenModal(true);
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
        actualizarSolicitudMutation({ id: solicitud.id, solicitud: formData })
    }

    return {
        lista,
        isLoading,
        isCreating,
        isUpdating,
        isChangingPriority,
        isAsigning,
        isResponding,
        openModal,
        tituloModal,
        solicitud,
        fileUrl,
        puedeResponder,
        busqueda,
        handleBusqueda,
        handleCheckboxChange,
        setSolicitud,
        toggleModal,
        handleChange,
        handleChangeImagen,
        handleSubmit,
        handleAsignar,
        responder,
        changePrioridad,
        cargar,
        handleUpdate
    }
}
