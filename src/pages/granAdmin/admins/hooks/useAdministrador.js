import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useInstitucionContext } from "../../../../context/InstitucionContext";
import useModal from "../../../../hooks/useModal";
import { alertError, alertSucces, alertWarning } from "../../../../utils/alerts/alertas.utility";
import apiQueryAdministrador from "../api/apiQueryAdministrador";

export default function useAdministrador() {

    const { institucion } = useInstitucionContext();
    const { openModal, toggleModal } = useModal();
    const { administradores, isLoading, isCreating, isUpdating, createAdministradorMutation,
        actualizarAdministradorMutation, eliminarAdministradorMutation } = apiQueryAdministrador();

    const [administrador, setAdministrador] = useState({
        nombres: "",
        apellidos: "",
        tipo_documento: "",
        numero_documento: "",
        email: "",
        telefono: "",
        foto: null,
        area: "",
        institucion_id: institucion.id,
        rol: "Administrador"
    });

    /*=========== Recargar ==============================*/

    const recargar = () => {
        setAdministrador({
            nombres: "",
            apellidos: "",
            tipo_documento: "",
            numero_documento: "",
            email: "",
            telefono: "",
            foto: null,
            area: "",
            institucion_id: institucion.id,
            rol: "Administrador"
        });
    }

    const abrirModal = () => {
        toggleModal();
        recargar();
    }

    /*=========== Crear ==============================*/

    const handleChange = (e) => {
        setAdministrador({ ...administrador, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createAdministradorMutation(administrador, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    abrirModal();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        });
    }

    /*=========== Actualizar ==========================*/

    const cargar = (administrador) => {
        setAdministrador({ ...administrador, institucion_id: institucion.id });
        toggleModal();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarAdministradorMutation(administrador, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    abrirModal();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        });
    }

    /*=========== Eliminar ==========================*/

    const handleDelete = (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta administrador?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarAdministradorMutation(id, {
                        onSuccess: (data) => {
                            if (data.status) {
                                alertSucces(data.message);
                            } else {
                                data.errors.forEach(err => { alertWarning(err); })
                            }
                        },
                        onError: (error) => { alertError(error.message); }
                    });
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        titulo: "Administradores",
        tituloModal: administrador.id ? "Editar Administrador" : "Crear Administrador",
        administradores,
        openModal,
        administrador,
        isLoading,
        loading: isCreating || isUpdating,
        toggleModal: abrirModal,
        handleChange,
        handler: administrador.id ? handleUpdate : handleSubmit,
        cargar,
        handleDelete
    }


}