import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useInstitucionContext } from "../../../../context/InstitucionContext";
import useModal from "../../../../hooks/useModal";
import { alertError, alertSucces, alertWarning } from "../../../../utils/alerts/alertas.utility";
import apiQueryPersonal from "../api/apiQueryPersonal";

export default function usePersonal() {

    const { institucion } = useInstitucionContext();
    const { openModal, toggleModal } = useModal();
    const { createPersonalMutation, actualizarPersonalMutation, eliminarPersonalMutation,
        personas, isCreating, isUpdating, isLoading } = apiQueryPersonal();

    const [persona, setPersona] = useState({
        nombres: "",
        apellidos: "",
        tipo_documento: "",
        numero_documento: "",
        email: "",
        telefono: "",
        foto: null,
        institucion_id: institucion.id || null,
        rol: "Persona"
    });

    /*=========== Crear ==============================*/

    const recargar = () => {
        setPersona({
            nombres: "",
            apellidos: "",
            tipo_documento: "",
            numero_documento: "",
            email: "",
            telefono: "",
            foto: null,
            institucion_id: institucion.id || null,
            rol: "Persona"
        });
    }

    const abrirModal = () => {
        toggleModal();
        recargar();
    }

    /*=========== Crear ==============================*/

    const handleChange = (e) => {
        setPersona({ ...persona, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPersonalMutation(persona, {
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

    const cargar = (persona) => {
        setPersona({ ...persona, institucion_id: institucion.id });
        toggleModal();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarPersonalMutation(persona, {
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
                title: '¿Seguro que quiere eliminar esta persona?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarPersonalMutation(id, {
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
        titulo: "Personal",
        tituloModal: persona.id ? "Actualizar Personal" : "Crear Personal",
        personas,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        persona,
        toggleModal: abrirModal,
        handleChange,
        handler: persona.id ? handleUpdate : handleSubmit,
        cargar,
        handleDelete
    }
}