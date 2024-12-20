import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useInstitucionContext } from "../context/InstitucionContext";
import { createAdministrador, deleteAdministrador, getAdministradoresInstitucion, updateAdministrador } from "../service/AdministradoresService";

function useAdministradores() {

    const { institucion } = useInstitucionContext();
    const [administradores, setAdministradores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
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


    /*=========== Crear ==============================*/

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
        setLoading(false);
        recargar();
    }

    const handleChange = (e) => {
        setAdministrador({
            ...administrador,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await createAdministrador(administrador);
            if (data.status) {
                await consultarAdministradores();
                toggleModal();
                toast.success("Creado con exito", { autoClose: 2000 });
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    /*=========== Consultar ==========================*/
    const consultarAdministradores = async () => {
        setLoading(true);
        try {
            const data = await getAdministradoresInstitucion(institucion.id);
            setAdministradores(data);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        consultarAdministradores();
    }, []);

    /*=========== Actualizar ==========================*/

    const cargar = async (administrador) => {
        setAdministrador({ ...administrador, institucion_id: institucion.id });
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!administrador.nombres || !administrador.apellidos || !administrador.tipo_documento || !administrador.numero_documento || !administrador.email || !administrador.telefono) {
            toast.warn('Hay campos vacios');
            return;
        }
        setLoading(true);
        try {
            const data = await updateAdministrador(administrador);
            if (data.status) {
                await consultarAdministradores();
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
                title: '¿Seguro que quiere eliminar esta administrador?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteAdministrador(id);
                    if (resultado.status) {
                        await consultarAdministradores();
                        toast.success("Eliminado con exito");
                    } else {
                        toast.error("No se pudo eleminar el administrador");
                    }
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        tituloModal,
        administradores,
        loading,
        openModal,
        administrador,
        toggleModal,
        handleChange,
        handleSubmit,
        cargar,
        handleUpdate,
        eliminar
    }


}

export default useAdministradores