import React from 'react';
import DataTableComponent from '../../../components/dataTable/DataTableComponent';
import Contenido from '../../../components/helpers/Contenido';
import TituloPage from '../../../components/helpers/TituloPage';
import MenuSencillo from '../../../components/menu/MenuSencillo';
import VentanaModal from '../../../components/modals/VentanaModal';
import FormPersonal from './components/FormPersonal';
import { PersonaColumn } from './components/PersonaColumn';
import usePersonal from './hooks/usePersona';

function PersonalPage() {

  const { titulo, persona, personas, loading, isLoading, tituloModal, openModal,
    toggleModal, handleChange, handler, handleDelete, cargar } = usePersonal();
  const columns = PersonaColumn({ cargar, handleDelete });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} buscar={false} />
        <DataTableComponent data={personas} columns={columns} loading={isLoading} />
        <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
          loading={loading} titulo={tituloModal} >
          <FormPersonal persona={persona} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}

export default PersonalPage