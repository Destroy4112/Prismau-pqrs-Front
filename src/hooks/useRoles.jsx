import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { createRol, deleteRol, getRoles, updateRol } from "../service/RolesService";

function useRoles() {

    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await createRol(rol);
            if (data.status) {
                await consultarRoles();
                toggleModal();
                toast.success("Creado con exito", { autoClose: 2000 });
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==========================*/
    const consultarRoles = async () => {
        setLoading(true);
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        consultarRoles();
    }, []);

    /*=========== Actualizar ==========================*/

    const cargar = async (rol) => {
        setRol(rol);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!rol.descripcion) {
            toast.warn('Hay campos vacios');
            return;
        }
        setLoading(true);
        try {
            const data = await updateRol(rol);
            if (data.status) {
                await consultarRoles();
                toggleModal();
                toast.success("Actualizado con exito", { autoClose: 2000 });
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    /*=========== Eliminar ==========================*/

    const eliminar = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar este rol?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteRol(id);
                    if (resultado.status) {
                        await consultarRoles();
                        toast.success("Eliminado con exito");
                    } else {
                        resultado.errors.forEach(err => {
                            toast.warn(err);
                        });
                    }
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        tituloModal,
        roles,
        loading,
        openModal,
        rol,
        toggleModal,
        handleChange,
        handleSubmit,
        cargar,
        handleUpdate,
        eliminar
    }


}

export default useRoles