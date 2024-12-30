import React from 'react';
import FormRol from '../../../components/granAdmin/roles/FormRol';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useRoles from '../../../hooks/useRoles';
import { RolesColumn } from '../../../models/columns/RolesColumn';
import DataTableComponent from '../../../utils/dataTable/DataTableComponent';
import VentanaModal from '../../../utils/modals/VentanaModal';

function RolesPage() {

  const { tituloModal, roles, isLoading, openModal, rol, isCreating, isUpdating,
    handleChange, toggleModal, handleCreate, cargar, handleUpdate, handleDelete } = useRoles();
  const columns = RolesColumn({ cargar, handleDelete });
  const handler = rol.id ? handleUpdate : handleCreate;
  const load = rol.id ? isUpdating : isCreating;

  return (
    <>
      <MenuSencillo buscar={false} toggleModal={toggleModal} />
      <DataTableComponent columns={columns} data={roles} loading={isLoading} />
      <VentanaModal size={"2xl"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler} loading={load}
        titulo={tituloModal} >
        <FormRol rol={rol} handleChange={handleChange} />
      </VentanaModal>
    </>
  );
}

export default RolesPage