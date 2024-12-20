import React from 'react';
import FormRol from '../../../components/granAdmin/roles/FormRol';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useRoles from '../../../hooks/useRoles';
import { RolesColumn } from '../../../models/columns/RolesColumn';
import DataTableComponent from '../../../utils/dataTable/DataTableComponent';
import VentanaModal from '../../../utils/modals/VentanaModal';

function RolesPage() {

  const { tituloModal, roles, loading, openModal, rol,
    handleChange, toggleModal, handleSubmit, cargar, handleUpdate, eliminar } = useRoles();
  const columns = RolesColumn({ cargar, eliminar });
  const handler = rol.id ? handleUpdate : handleSubmit;

  return (
    <>
      <MenuSencillo buscar={false} toggleModal={toggleModal} />
      <DataTableComponent columns={columns} data={roles} loading={loading} />
      <VentanaModal size={"2xl"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
        loading={loading} titulo={tituloModal} >
        <FormRol rol={rol} handleChange={handleChange} />
      </VentanaModal>
    </>
  );
}

export default RolesPage