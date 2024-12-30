import React from 'react';
import CardInstituciones from '../../../components/granAdmin/instituciones/CardInstituciones';
import FormImagenInstitucion from '../../../components/granAdmin/instituciones/FormImagenInstitucion';
import FormInstitucion from '../../../components/granAdmin/instituciones/FormInstitucion';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useInstituciones from '../../../hooks/useInstituciones';
import VentanaModal from '../../../utils/modals/VentanaModal';
import CardSkeleton from '../../../utils/skeletons/CardSkeleton';

function InstitucionesPage() {

  const { institucion, isLoading, instituciones, openModal, tituloModal, openModalImagen, tituloModalImagen, logo,
    isCreating, isUpdating, isUpdatingLogo, toggleModal, handleChange, handleCreate, cargar, handleUpdate, toggleModalImage,
    cargarLogo, handleChangeImage, handleUpdateImage, handleDelete } = useInstituciones();
  const handler = institucion.id ? handleUpdate : handleCreate;
  const load = institucion.id ? isUpdating : isCreating;

  return (
    <>
      <MenuSencillo buscar={false} toggleModal={toggleModal} />
      {
        isLoading ?
          <CardSkeleton /> :
          <CardInstituciones instituciones={instituciones} cargar={cargar} changeLogo={cargarLogo} eliminar={handleDelete} />
      }
      {/* Modal crear y actualizar */}
      <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler} loading={load}
        titulo={tituloModal} >
        <FormInstitucion institucion={institucion} handleChange={handleChange} />
      </VentanaModal>
      {/* modal cambiar imagen */}
      <VentanaModal size={"full"} openModal={openModalImagen} cerrarModal={toggleModalImage} hanleSubmit={handleUpdateImage}
        titulo={tituloModalImagen} loading={isUpdatingLogo}>
        <FormImagenInstitucion handleChangeImage={handleChangeImage} />
      </VentanaModal>
    </>
  );
}

export default InstitucionesPage;
