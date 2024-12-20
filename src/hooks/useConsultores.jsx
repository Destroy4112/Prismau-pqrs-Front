import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useInstitucionContext } from "../context/InstitucionContext";
import { createConsultor, deleteConsultor, getConsultores, updateConsultor } from "../service/ConsultoresService";

function useConsultores() {

    const { institucion } = useInstitucionContext();
    const [consultores, setConsultores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
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
        setLoading(false);
        recargar();
    }

    const handleChange = (e) => {
        setConsultor({
            ...consultor,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await createConsultor(consultor);
            if (data.status) {
                await consultarConsultores();
                toggleModal();
                toast.success("Creado con exito", { autoClose: 2000 });
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                })
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    /*=========== Consultar ==========================*/
    const consultarConsultores = async () => {
        setLoading(true);
        try {
            const data = await getConsultores();
            setConsultores(data);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        consultarConsultores();
    }, []);

    /*=========== Actualizar ==========================*/

    const cargar = async (consultor) => {
        setConsultor(consultor);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await updateConsultor(consultor);
            if (data.status) {
                await consultarConsultores();
                toggleModal();
                toast.success("Actualizado con exito", { autoClose: 2000 });
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                })
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        setLoading(false);
    }

    /*=========== Eliminar ==========================*/

    const eliminar = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta consultor?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteConsultor(id);
                    if (resultado.status) {
                        await consultarConsultores();
                        toast.success("Eliminado con exito");
                    } else {
                        toast.error("No se pudo eleminar el consultor");
                    }
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        tituloModal,
        consultores,
        loading,
        openModal,
        consultor,
        toggleModal,
        handleChange,
        handleSubmit,
        cargar,
        handleUpdate,
        eliminar
    }


}

export default useConsultores