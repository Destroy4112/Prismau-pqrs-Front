import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { createInstitucion, deleteInstitucion, getInstituciones, updateInstitucion, updateLogoInstitucion } from "../service/InstitucionesService";

function useInstituciones() {

    const [instituciones, setInstituciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalImagen, setOpenModalImagen] = useState(false);
    const [institucion, setInstitucion] = useState({
        nombre: '',
        nit: '',
        email: '',
        telefono: '',
        ciudad: '',
        departamento: '',
        web: '',
        logo: '',
        sector_economico: '',
        status: true,
    });
    const [logo, setLogo] = useState(null);
    const tituloModal = institucion.id ? 'Editar institucion' : 'Crear institucion';
    const tituloModalImagen = "Cambiar logo";


    /*=========== Crear ==============================*/

    const recargar = () => {
        setInstitucion({
            nombre: '',
            nit: '',
            email: '',
            telefono: '',
            ciudad: '',
            departamento: '',
            web: '',
            logo: '',
            sector_economico: '',
            status: true
        });
        setLoading(false);
        setLogo({
            id: null,
            logo: null
        })
    }

    /*=========== Crear ==============================*/

    const toggleModal = () => {
        setOpenModal(!openModal);
        recargar();
    }

    const handleChange = (e) => {
        setInstitucion({
            ...institucion,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!institucion.nombre || !institucion.nit || !institucion.email || !institucion.telefono || !institucion.ciudad || !institucion.departamento || !institucion.web || !institucion.sector_economico) {
            toast.warn('Hay campos vacios');
            return;
        }
        setLoading(true);
        try {
            const data = await createInstitucion(institucion);
            if (data.status) {
                await consultarInstituciones();
                toggleModal();
                toast.success("Creado con exito", { autoClose: 2000 });
            } else {
                data.errors.forEach(error => {
                    toast.warn(error);
                });
            }
        } catch (error) {
            const errorMessages = error.response?.data?.message;
            if (errorMessages) {
                errorMessages.forEach(err => toast.error(err));
            } else {
                toast.error("Error desconocido");
            }
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }

    /*=========== Consultar ==========================*/
    const consultarInstituciones = async () => {
        setLoading(true);
        try {
            const data = await getInstituciones();
            setInstituciones(data);
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        consultarInstituciones();
    }, []);

    /*=========== Actualizar ==========================*/

    const cargar = async (institucion) => {
        setInstitucion(institucion);
        setOpenModal(true);
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!institucion.nombre || !institucion.nit || !institucion.email || !institucion.telefono || !institucion.ciudad || !institucion.departamento || !institucion.web || !institucion.sector_economico) {
            toast.warn('Hay campos vacios');
            return;
        }
        setLoading(true);
        try {
            const data = await updateInstitucion(institucion);
            if (data.status) {
                await consultarInstituciones();
                toggleModal();
                toast.success("Actualizado con exito", { autoClose: 2000 });
            } else {
                data.errors.forEach(error => {
                    toast.warn(error);
                });
            }
        } catch (error) {
            const errorMessages = error.response?.data?.message;
            if (errorMessages) {
                errorMessages.forEach(err => toast.error(err));
            } else {
                toast.error("Error desconocido");
            }
        } finally {
            setLoading(false);
        }
        setLoading(false);
    }

    /*=========== Cambiar logo ======================*/

    const cargarLogo = async (id) => {
        institucion.id = id;
        setOpenModalImagen(true);
    }

    const toggleModalImage = () => {
        setOpenModalImagen(!openModalImagen);
    }

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        setLogo(file);
    };

    const cambiarImagen = async (e) => {
        e.preventDefault();
        try {
            if (logo === null) {
                toast.warn("Por favor, selecciona una imagen");
                return;
            }
            const formData = new FormData();
            formData.append('logo', logo);
            setLoading(true);
            const data = await updateLogoInstitucion(formData, institucion.id);
            setLoading(false);
            if (data.status) {
                toggleModalImage();
                toast.success("Imagen actualizada correctamente");
                await consultarInstituciones();
            } else {
                toast.error("No se pudo actualizar la imagen");
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    /*=========== Eliminar ==========================*/

    const eliminar = async (id) => {
        try {
            Swal.fire({
                title: '¿Seguro que quiere eliminar esta institucion?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
                cancelButtonText: 'No, cancelar'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const resultado = await deleteInstitucion(id);
                    if (resultado.status) {
                        await consultarInstituciones();
                        toast.success("Eliminado con exito");
                    } else {
                        toast.error("No se pudo eliminar la institucion porque tiene registros relacionados");
                    }
                }
            });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return {
        tituloModal,
        instituciones,
        loading,
        openModal,
        institucion,
        logo,
        openModalImagen,
        tituloModalImagen,
        toggleModal,
        handleChange,
        handleSubmit,
        cargar,
        handleUpdate,
        cargarLogo,
        toggleModalImage,
        handleChangeImage,
        cambiarImagen,
        eliminar
    }


}

export default useInstituciones