import React from 'react';
import Contenido from '../../../components/helpers/Contenido';
import TituloPage from '../../../components/helpers/TituloPage';
import MenuSencillo from '../../../components/menu/MenuSencillo';
import VentanaModal from '../../../components/modals/VentanaModal';
import CardInstituciones from './components/CardInstituciones';
import FormImagenInstitucion from './components/FormImagenInstitucion';
import FormInstitucion from './components/FormInstitucion';
import useInstitucion from './hooks/useInstitucion';

function InstitucionesPage() {

  const { titulo, institucion, loading, isLoading, instituciones, openModal, tituloModal, openModalImagen,
    tituloModalImagen, toggleModal, handleChange, handler, cargar, toggleModalImage, cargarLogo, handleChangeImage,
    handleUpdateImage, handleDelete } = useInstitucion();

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo buscar={false} toggleModal={toggleModal} />
        <CardInstituciones instituciones={instituciones} cargar={cargar} changeLogo={cargarLogo}
          eliminar={handleDelete} loading={isLoading} />
        <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler} loading={loading}
          titulo={tituloModal} >
          <FormInstitucion institucion={institucion} handleChange={handleChange} />
        </VentanaModal>
        <VentanaModal size={"full"} openModal={openModalImagen} cerrarModal={toggleModalImage} hanleSubmit={handleUpdateImage}
          titulo={tituloModalImagen} loading={loading}>
          <FormImagenInstitucion handleChangeImage={handleChangeImage} />
        </VentanaModal>
      </Contenido>
    </>
  );
}

export default InstitucionesPage;
