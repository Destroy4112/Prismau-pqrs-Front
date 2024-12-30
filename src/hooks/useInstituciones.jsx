import { useState } from "react";
import Swal from "sweetalert2";
import apiQueryInstitucion from "../api/apiQueryInstitucion";

function useInstituciones() {

    const [openModal, setOpenModal] = useState(false);
    const [openModalImagen, setOpenModalImagen] = useState(false);
    const { createInstitucionMutation, actualizarInstitucionMutation, actualizarLogoMutation, eliminarInstitucion,
        instituciones, isLoading, isCreating, isUpdating, isUpdatingLogo } = apiQueryInstitucion(setOpenModal, setOpenModalImagen);
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
    const [logo, setLogo] = useState({
        id: null,
        logo: null
    });
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

    const handleCreate = (e) => {
        e.preventDefault();
        createInstitucionMutation(institucion);
    }

    /*=========== Actualizar ==========================*/

    const cargar = (institucion) => {
        setInstitucion(institucion);
        setOpenModal(true);
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarInstitucionMutation(institucion);
    }

    /*=========== Cambiar logo ======================*/

    const cargarLogo = (id) => {
        setLogo({ ...logo, id });
        setOpenModalImagen(true);
    }

    const toggleModalImage = () => {
        setOpenModalImagen(!openModalImagen);
        recargar();
    }

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        setLogo({ ...logo, logo: file });
    };

    const handleUpdateImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('logo', logo.logo);
        actualizarLogoMutation({ logo: formData, id: logo.id });
    };

    /*=========== Eliminar ==========================*/

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Seguro que quiere eliminar esta institucion?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarInstitucion(id);
            }
        });
    };

    return {
        tituloModal,
        instituciones,
        isLoading,
        isCreating,
        isUpdating,
        isUpdatingLogo,
        openModal,
        institucion,
        logo,
        openModalImagen,
        tituloModalImagen,
        toggleModal,
        handleChange,
        handleCreate,
        cargar,
        handleUpdate,
        cargarLogo,
        toggleModalImage,
        handleChangeImage,
        handleUpdateImage,
        handleDelete
    }


}

export default useInstituciones