import React from 'react';
import FormPersonal from '../../../components/granAdmin/personal/FormPersonal';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import usePersonal from '../../../hooks/usePersonal';
import { AdminsColumn } from '../../../models/columns/AdminsColumn';
import DataTableComponent from '../../../utils/dataTable/DataTableComponent';
import VentanaModal from '../../../utils/modals/VentanaModal';

function PersonalPage() {

  const { persona, personas, isCreating, isLoading, isUpdating, tituloModal, openModal,
    toggleModal, handleChange, handleSubmit, handleUpdate, handleDelete, cargar } = usePersonal();
  const handler = persona.id ? handleUpdate : handleSubmit;
  const loading = persona.id ? isUpdating : isCreating;
  const columns = AdminsColumn({ cargar, handleDelete });

  return (
    <>
      <MenuSencillo toggleModal={toggleModal} />
      <DataTableComponent data={personas} columns={columns} loading={isLoading} />
      <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
        loading={loading} titulo={tituloModal} >
        <FormPersonal persona={persona} handleChange={handleChange} />
      </VentanaModal>
    </>
  )
}

export default PersonalPage