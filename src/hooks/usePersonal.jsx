import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import apiQueryPersonal from "../api/apiQueryPersonal";
import { useInstitucionContext } from "../context/InstitucionContext";

function usePersonal() {

    const { institucion } = useInstitucionContext();
    const rol = useSelector(state => state.credenciales.rol.id);
    const [openModal, setOpenModal] = useState(false);
    const { createPersonalMutation, actualizarPersonalMutation, eliminarPersonalMutation,
        personas, isCreating, isUpdating, isLoading } = apiQueryPersonal(setOpenModal);
    const [persona, setPersona] = useState({
        nombres: "",
        apellidos: "",
        tipo_documento: "",
        numero_documento: "",
        email: "",
        telefono: "",
        foto: null,
        institucion_id: rol === 1 ? institucion.id : null,
        rol_id: 5
    });
    const tituloModal = persona.id ? 'Editar persona' : 'Crear persona';


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
            institucion_id: institucion.id,
            rol_id: 5
        });
    }

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = (e) => {
        setPersona({
            ...persona,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createPersonalMutation(persona);
    }

    /*=========== Actualizar ==========================*/

    const cargar = (persona) => {
        setPersona({ ...persona, institucion_id: institucion.id });
        setOpenModal(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarPersonalMutation(persona);
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
                    eliminarPersonalMutation(id);
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        tituloModal,
        personas,
        isLoading,
        isCreating,
        isUpdating,
        openModal,
        persona,
        toggleModal,
        handleChange,
        handleSubmit,
        cargar,
        handleUpdate,
        handleDelete
    }


}

export default usePersonal