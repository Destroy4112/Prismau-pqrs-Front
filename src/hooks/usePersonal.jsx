import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useInstitucionContext } from "../context/InstitucionContext";
import { createPersona, deletePersona, getPersonas, updatePersona } from "../service/PersonaService";

function usePersonal() {

    const { institucion } = useInstitucionContext();
    const rol = useSelector(state => state.credenciales.rol.id);
    const [listadoPersonal, setListadoPersonal] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
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
        setLoading(false);
        recargar();
    }

    const handleChange = (e) => {
        setPersona({
            ...persona,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await createPersona(persona);
            if (data.status) {
                await consultarPersonas();
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
    const consultarPersonas = async () => {
        setLoading(true);
        try {
            const data = await getPersonas();
            setListadoPersonal(data);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        consultarPersonas();
    }, []);

    /*=========== Actualizar ==========================*/

    const cargar = async (persona) => {
        setPersona({ ...persona, institucion_id: institucion.id });
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!persona.nombres || !persona.apellidos || !persona.tipo_documento || !persona.numero_documento || !persona.email || !persona.telefono) {
            toast.warn('Hay campos vacios');
            return;
        }
        setLoading(true);
        try {
            const data = await updatePersona(persona);
            if (data.status) {
                await consultarPersonas();
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
                title: '¿Seguro que quiere eliminar esta persona?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deletePersona(id);
                    if (resultado.status) {
                        await consultarPersonas();
                        toast.success("Eliminado con exito");
                    } else {
                        toast.error("No se pudo eleminar la Persona");
                    }
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        tituloModal,
        listadoPersonal,
        loading,
        openModal,
        persona,
        toggleModal,
        handleChange,
        handleSubmit,
        cargar,
        handleUpdate,
        eliminar
    }


}

export default usePersonal