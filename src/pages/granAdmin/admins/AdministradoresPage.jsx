import React from 'react';
import FormAdministradores from '../../../components/granAdmin/administradores/FormAdministradores';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useAdministradores from '../../../hooks/useAdministradores';
import useRoles from '../../../hooks/useRoles';
import { AdminsColumn } from '../../../models/columns/AdminsColumn';
import DataTableComponent from '../../../utils/dataTable/DataTableComponent';
import VentanaModal from '../../../utils/modals/VentanaModal';

function AdministradoresPage() {

  const { roles } = useRoles();
  const { administrador, administradores, isLoading, isCreating, isUpdating, tituloModal, openModal,
    toggleModal, handleChange, handleSubmit, handleUpdate, handleDelete, cargar
  } = useAdministradores();
  const handler = administrador.id ? handleUpdate : handleSubmit;
  const loading = administrador.id ? isUpdating : isCreating;
  const columns = AdminsColumn({ cargar, handleDelete });

  return (
    <>
      <MenuSencillo toggleModal={toggleModal} />
      <DataTableComponent data={administradores} columns={columns} loading={isLoading} />
      <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
        loading={loading} titulo={tituloModal} >
        <FormAdministradores admin={administrador} handleChange={handleChange} roles={roles} />
      </VentanaModal>
    </>
  )
}

export default AdministradoresPage