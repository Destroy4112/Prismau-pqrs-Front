import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import apiQueryAdministrador from "../api/apiQueryAdministrador";
import { useInstitucionContext } from "../context/InstitucionContext";

function useAdministradores() {

    const { institucion } = useInstitucionContext();
    const [openModal, setOpenModal] = useState(false);
    const { createAdministradorMutation, actualizarAdministradorMutation, eliminarAdministradorMutation,
        administradores, isLoading, isCreating, isUpdating } = apiQueryAdministrador(setOpenModal);
    const [administrador, setAdministrador] = useState({
        nombres: "",
        apellidos: "",
        tipo_documento: "",
        numero_documento: "",
        email: "",
        telefono: "",
        foto: null,
        institucion_id: institucion.id,
        rol_id: null
    });
    const tituloModal = administrador.id ? 'Editar administrador' : 'Crear administrador';


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
            institucion_id: institucion.id,
            rol_id: null
        });
    }

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = (e) => {
        setAdministrador({
            ...administrador,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createAdministradorMutation(administrador);
    }

    /*=========== Actualizar ==========================*/

    const cargar = (administrador) => {
        setAdministrador({ ...administrador, institucion_id: institucion.id });
        setOpenModal(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarAdministradorMutation(administrador);
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
                    eliminarAdministradorMutation(id);
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        tituloModal,
        administradores,
        openModal,
        administrador,
        isLoading,
        isCreating,
        isUpdating,
        toggleModal,
        handleChange,
        handleSubmit,
        cargar,
        handleUpdate,
        handleDelete
    }


}

export default useAdministradores