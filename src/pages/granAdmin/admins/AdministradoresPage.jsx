import React from 'react';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useAdministradores from '../../../hooks/useAdministradores';
import { AdminsColumn } from '../../../models/columns/AdminsColumn';
import DataTableComponent from '../../../utils/dataTable/DataTableComponent';
import VentanaModal from '../../../utils/modals/VentanaModal';
import FormAdministradores from '../../../components/granAdmin/administradores/FormAdministradores';
import useRoles from '../../../hooks/useRoles';

function AdministradoresPage() {

  const { administrador, administradores, loading, tituloModal, openModal,
    toggleModal, handleChange, handleSubmit, handleUpdate, eliminar, cargar
  } = useAdministradores();
  const handler = administrador.id ? handleUpdate : handleSubmit;
  const columns = AdminsColumn({ cargar, eliminar });
  const { roles } = useRoles();

  return (
    <>
      <MenuSencillo toggleModal={toggleModal} />
      <DataTableComponent data={administradores} columns={columns} loading={loading} />
      <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
        loading={loading} titulo={tituloModal} >
        <FormAdministradores admin={administrador} handleChange={handleChange} roles={roles} />
      </VentanaModal>
    </>
  )
}

export default AdministradoresPage