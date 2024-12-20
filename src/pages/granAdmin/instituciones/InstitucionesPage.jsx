import React from 'react';
import CardInstituciones from '../../../components/granAdmin/instituciones/CardInstituciones';
import FormImagenInstitucion from '../../../components/granAdmin/instituciones/FormImagenInstitucion';
import FormInstitucion from '../../../components/granAdmin/instituciones/FormInstitucion';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useInstituciones from '../../../hooks/useInstituciones';
import VentanaModal from '../../../utils/modals/VentanaModal';
import CardSkeleton from '../../../utils/skeletons/CardSkeleton';

function InstitucionesPage() {

  const { institucion, instituciones, openModal, loading, tituloModal, openModalImagen, tituloModalImagen, logo,
    toggleModal, handleChange, handleSubmit, cargar, handleUpdate, toggleModalImage, cargarLogo, handleChangeImage,
    cambiarImagen, eliminar } = useInstituciones();
  const handler = institucion.id ? handleUpdate : handleSubmit;

  return (
    <>
      <MenuSencillo buscar={false} toggleModal={toggleModal} />
      {
        loading ?
          <CardSkeleton /> :
          <CardInstituciones instituciones={instituciones} cargar={cargar} eliminar={eliminar} changeLogo={cargarLogo} />
      }
      {/* Modal crear y actualizar */}
      <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
        loading={loading} titulo={tituloModal} >
        <FormInstitucion institucion={institucion} handleChange={handleChange} />
      </VentanaModal>
      {/* modal cambiar imagen */}
      <VentanaModal size={"full"} openModal={openModalImagen} cerrarModal={toggleModalImage} hanleSubmit={cambiarImagen}
        loading={loading} titulo={tituloModalImagen} >
        <FormImagenInstitucion handleChangeImage={handleChangeImage} />
      </VentanaModal>
    </>
  );
}

export default InstitucionesPage;
