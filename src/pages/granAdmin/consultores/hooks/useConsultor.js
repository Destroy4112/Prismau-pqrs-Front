import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useInstitucionContext } from "../../../../context/InstitucionContext";
import useModal from "../../../../hooks/useModal";
import { alertError, alertSucces, alertWarning } from "../../../../utils/alerts/alertas.utility";
import apiQueryConsultor from "../api/apiQueryConsultor";

export default function useConsultor() {

    const { institucion } = useInstitucionContext();
    const { openModal, toggleModal } = useModal();
    const { createConsultorMutation, actualizarConsultorMutation, eliminarConsultorMutation,
        consultores, isLoading, isCreating, isUpdating } = apiQueryConsultor();

    const [consultor, setConsultor] = useState({
        nombres: "",
        apellidos: "",
        tipo_documento: "",
        numero_documento: "",
        email: "",
        telefono: "",
        foto: null,
        institucion_id: institucion.id,
        rol: "Consultor",
        institucion: []
    });

    /*=========== Crear ==============================*/

    const recargar = () => {
        setConsultor({
            nombres: "",
            apellidos: "",
            tipo_documento: "",
            numero_documento: "",
            email: "",
            telefono: "",
            foto: null,
            institucion_id: institucion.id,
            rol: "Consultor",
            institucion: []
        });
    }

    const abrirModal = () => {
        toggleModal();
        recargar();
    }

    /*=========== Crear ==============================*/

    const handleChange = (e) => {
        setConsultor({ ...consultor, [e.target.name]: e.target.value })
    }

    const handleChangeInstituciones = (selectedOptions) => {
        const selectedInstituciones = selectedOptions.map(option => option.value);
        handleChange({ target: { name: 'institucion', value: selectedInstituciones } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createConsultorMutation(consultor, {
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

    const cargar = (consultor) => {
        setConsultor(consultor);
        toggleModal();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarConsultorMutation(consultor, {
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
                title: '¿Seguro que quiere eliminar esta consultor?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarConsultorMutation(id, {
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
        titulo: "Consultores",
        tituloModal: consultor.id ? "Editar consultor" : "Crear consultor",
        consultores,
        isLoading,
        loading: isCreating || isUpdating,
        openModal,
        consultor,
        toggleModal: abrirModal,
        handleChange,
        handleChangeInstituciones,
        handler: consultor.id ? handleUpdate : handleSubmit,
        cargar,
        handleDelete
    }
}