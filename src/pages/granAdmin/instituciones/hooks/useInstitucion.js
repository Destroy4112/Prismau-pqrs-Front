import { useState } from "react";
import Swal from "sweetalert2";
import useModal from "../../../../hooks/useModal";
import { alertError, alertSucces, alertWarning } from "../../../../utils/alerts/alertas.utility";
import apiQueryInstitucion from "../api/apiQueryInstitucion";

function useInstitucion() {

    const { openModal, toggleModal } = useModal();
    const [openModalImagen, setOpenModalImagen] = useState(false);
    const { createInstitucionMutation, actualizarInstitucionMutation, actualizarLogoMutation, eliminarInstitucion,
        instituciones, isLoading, isCreating, isUpdating, isUpdatingLogo } = apiQueryInstitucion();

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

    /*=========== Recargar ==============================*/

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

    const abrirModal = () => {
        toggleModal();
        recargar();
    };

    /*=========== Crear ==============================*/

    const handleChange = (e) => {
        setInstitucion({ ...institucion, [e.target.name]: e.target.value })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        createInstitucionMutation(institucion, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => {console.log(error); alertError(error.message); }
        });
    }

    /*=========== Actualizar ==========================*/

    const cargar = (institucion) => {
        setInstitucion(institucion);
        toggleModal();
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        actualizarInstitucionMutation(institucion, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModal();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        });
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
        actualizarLogoMutation({ logo: formData, id: logo.id }, {
            onSuccess: (data) => {
                if (data.status) {
                    alertSucces(data.message);
                    toggleModalImage();
                } else {
                    data.errors.forEach(err => { alertWarning(err); })
                }
            },
            onError: (error) => { alertError(error.message); }
        });
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
                eliminarInstitucion(id, {
                    onSuccess: (data) => {
                        if (data.status) {
                            alertSucces(data.message);
                        } else {
                            data.errors.forEach(err => { alertWarning(err); })
                        }
                    },
                    onError: (error) => { alertError(error.message); }
                });
            }
        });
    };

    return {
        titulo: 'Instituciones',
        tituloModal: institucion.id ? 'Actualizar Institucion' : 'Crear Institucion',
        instituciones,
        isLoading,
        loading: isCreating || isUpdating || isUpdatingLogo,
        openModal,
        institucion,
        logo,
        openModalImagen,
        tituloModalImagen: "Cambiar Logo",
        toggleModal: abrirModal,
        handleChange,
        handler: institucion.id ? handleUpdate : handleCreate,
        cargar,
        cargarLogo,
        toggleModalImage,
        handleChangeImage,
        handleUpdateImage,
        handleDelete
    }
}

export default useInstitucion