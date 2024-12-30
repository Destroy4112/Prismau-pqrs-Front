import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import apiQueryConsultor from "../api/apiQueryConsultor";
import { useInstitucionContext } from "../context/InstitucionContext";

function useConsultores() {

    const { institucion } = useInstitucionContext();
    const [openModal, setOpenModal] = useState(false);
    const { createConsultorMutation, actualizarConsultorMutation, eliminarConsultorMutation,
        consultores, isLoading, isCreating, isUpdating } = apiQueryConsultor(setOpenModal);
    const [consultor, setConsultor] = useState({
        nombres: "",
        apellidos: "",
        tipo_documento: "",
        numero_documento: "",
        email: "",
        telefono: "",
        foto: null,
        institucion_id: institucion.id,
        rol_id: 4,
        institucion: []
    });
    const tituloModal = consultor.id ? 'Editar consultor' : 'Crear consultor';


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
            rol_id: 4,
            institucion: []
        });
    }

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = (e) => {
        setConsultor({
            ...consultor,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createConsultorMutation(consultor);
    }

    /*=========== Actualizar ==========================*/

    const cargar = (consultor) => {
        setConsultor(consultor);
        setOpenModal(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarConsultorMutation(consultor);
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
                    eliminarConsultorMutation(id);
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        tituloModal,
        consultores,
        isLoading,
        isCreating,
        isUpdating,
        openModal,
        consultor,
        toggleModal,
        handleChange,
        handleSubmit,
        cargar,
        handleUpdate,
        handleDelete
    }


}

export default useConsultores