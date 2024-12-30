import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import apiQueryRol from "../api/apiQueryRol";

function useRoles() {

    const [openModal, setOpenModal] = useState(false);
    const { createRolMutation, actualizarRolMutation, eliminarRolMutation, roles, isLoading, isCreating, isUpdating } = apiQueryRol(setOpenModal);
    const [rol, setRol] = useState({
        descripcion: '',
    });
    const tituloModal = rol.id ? 'Editar rol' : 'Crear rol';


    /*=========== Crear ==============================*/

    const recargar = () => {
        setRol({ descripcion: '' });
        setLoading(false);
    }

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = (e) => {
        setRol({
            ...rol,
            [e.target.name]: e.target.value
        })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        createRolMutation(rol);
    }

    /*=========== Actualizar ==========================*/

    const cargar = (rol) => {
        setRol(rol);
        setOpenModal(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarRolMutation(rol);
    }

    /*=========== Eliminar ==========================*/

    const handleDelete = (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este rol?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    eliminarRolMutation(id);
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        rol,
        roles,
        isLoading,
        isCreating,
        isUpdating,
        openModal,
        tituloModal,
        toggleModal,
        handleChange,
        handleCreate,
        cargar,
        handleUpdate,
        handleDelete
    }


}

export default useRoles