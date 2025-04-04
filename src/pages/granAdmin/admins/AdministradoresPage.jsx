import React from 'react';
import DataTableComponent from '../../../components/dataTable/DataTableComponent';
import Contenido from '../../../components/helpers/Contenido';
import TituloPage from '../../../components/helpers/TituloPage';
import MenuSencillo from '../../../components/menu/MenuSencillo';
import VentanaModal from '../../../components/modals/VentanaModal';
import { AdminColumn } from './components/AdminColumn';
import FormAdministradores from './components/FormAdministradores';
import useAdministrador from './hooks/useAdministrador';

function AdministradoresPage() {

  const { titulo, administrador, administradores, isLoading, loading, tituloModal, openModal,
    toggleModal, handleChange, handler, handleDelete, cargar } = useAdministrador();
  const columns = AdminColumn({ cargar, handleDelete });

  return ( 
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} buscar={false} />
        <DataTableComponent data={administradores} columns={columns} loading={isLoading} />
        <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
          loading={loading} titulo={tituloModal} >
          <FormAdministradores admin={administrador} handleChange={handleChange} />
        </VentanaModal>
      </Contenido>
    </>
  )
}

export default AdministradoresPage