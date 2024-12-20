import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PrivateRoutes, RouteBackFile } from "../models/RoutesModel";
import { asignPersonaSolicitud, cambiarPrioridad, createSolicitud, getSolicitudesConsultor, getSolicitudesInstitucion, getSolicitudesPersona, responderSolicitud, updateSolicitud } from "../service/SolicitudesService";

export default function useSolicitudes() {

    const navigate = useNavigate();
    const institucion = useSelector(state => state.institucion);
    const user = useSelector(state => state.credenciales);
    const usuario = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [solicitudes, setSolicitudes] = useState([]);
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
        setLoading(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (!solicitud.tipo || !solicitud.descripcion || !solicitud.prioridad) {
                toast.warn('Hay campos vacios');
                return;
            }
            const formData = new FormData();
            formData.append("tipo", solicitud.tipo);
            formData.append("descripcion", solicitud.descripcion);
            formData.append("prioridad", solicitud.prioridad);
            formData.append("archivo", solicitud.archivo);
            formData.append("estado", solicitud.estado);
            formData.append("usuario", user.id);
            const res = await createSolicitud(formData);
            if (res.status) {
                await getSolicitudes();
                toggleModal();
                toast.success("Creado con exito", { autoClose: 2000 });
                recargar();
            } else {
                res.errors.forEach(err => {
                    toast.warn(err);
                })
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    /*================= CONSULTAR ============================== */

    const getSolicitudes = async () => {
        setLoading(true);
        let res;
        try {
            if (user.rol.id == 3) {
                res = await getSolicitudesInstitucion(institucion.id);
            } else if (user.rol.id == 4) {
                res = await getSolicitudesConsultor(usuario.id);
            } else {
                res = await getSolicitudesPersona(usuario.id);
            }
            setSolicitudes(res);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        getSolicitudes();
    }, [])

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

    const handleAsignar = async () => {
        setLoading(true);
        if (!solicitud.persona || solicitud.persona == 0) {
            toast.warn('Debe seleccionar una persona');
            return;
        }
        try {
            const res = await asignPersonaSolicitud(solicitud);
            if (res.status) {
                navigate(PrivateRoutes.SOLICITUDES);
                toast.success("Asignado con exito", { autoClose: 2000 });
            } else {
                res.errors.forEach(err => {
                    toast.warn(err);
                })
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    /*================= Responder solicitud ============================== */

    const handleCheckboxChange = () => {
        setPuedeResponder(!puedeResponder);
    };

    const responder = async () => {
        if (!solicitud.respuesta) {
            toast.warn('Debe escribir una respuesta');
            return;
        }
        setLoading(true);
        try {
            const res = await responderSolicitud(solicitud);
            if (res.status) {
                navigate(PrivateRoutes.SOLICITUDES);
                toast.success("Respondido con exito", { autoClose: 2000 });
            } else {
                res.errors.forEach(err => {
                    toast.warn(err);
                })
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    /*================= Cambiar prioridad ============================== */

    const changePrioridad = async () => {
        setLoading(true);
        try {
            const res = await cambiarPrioridad(solicitud);
            if (res.status) {
                navigate(PrivateRoutes.SOLICITUDES);
                toast.success("Prioridad cambiada con exito", { autoClose: 2000 });
            } else {
                res.errors.forEach(err => {
                    toast.warn(err);
                })
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    //================= Actualizar ==============================

    const cargar = (solicitud) => {
        setSolicitud(solicitud);
        setOpenModal(true);
    }

    const actualizar = async () => {
        setLoading(true);
        try {
            if (!solicitud.tipo || !solicitud.descripcion || !solicitud.prioridad) {
                toast.warn('Hay campos vacios');
                return;
            }
            const formData = new FormData();
            formData.append("tipo", solicitud.tipo);
            formData.append("descripcion", solicitud.descripcion);
            formData.append("prioridad", solicitud.prioridad);
            formData.append("archivo", solicitud.archivo);
            formData.append("estado", solicitud.estado);
            formData.append("usuario", user.id);
            const res = await updateSolicitud(solicitud.id, formData);
            if (res.status) {
                await getSolicitudes();
                setOpenModal(false);
                toast.success("Actualizado con exito", { autoClose: 2000 });
            } else {
                res.errors.forEach(err => {
                    toast.warn(err);
                })
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    return {
        lista,
        loading,
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
        actualizar
    }
}
