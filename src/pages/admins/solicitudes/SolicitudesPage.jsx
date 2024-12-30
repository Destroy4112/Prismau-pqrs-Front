import React from 'react';
import { useSelector } from 'react-redux';
import FormSolicitudes from '../../../components/admins/solicitudes/FormSolicitudes';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useSolicitudes from '../../../hooks/useSolicitudes';
import { SolicitudesColumn } from '../../../models/columns/SolicitudesColumn';
import DataTableComponent from '../../../utils/dataTable/DataTableComponent';
import VentanaModal from '../../../utils/modals/VentanaModal';

export default function SolicitudesPage() {

  const rol = useSelector(state => state.credenciales.rol.id);
  const { lista, isLoading, isCreating, isUpdating, openModal, solicitud, tituloModal, busqueda,
    handleChange, handleChangeImagen, toggleModal, handleSubmit, handleBusqueda, cargar, handleUpdate } = useSolicitudes();
  const columns = SolicitudesColumn({ rol, cargar });
  const handler = solicitud.id ? handleUpdate : handleSubmit;
  const loading = solicitud.id ? isUpdating : isCreating;

  return (
    <>
      <MenuSencillo crear={rol !== 4} toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda} />
      <DataTableComponent data={lista} columns={columns} loading={isLoading} />
      <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
        loading={loading} titulo={tituloModal} >
        <FormSolicitudes solicitud={solicitud} handleChange={handleChange} handleChangeImagen={handleChangeImagen} />
      </VentanaModal>
    </>
  )
}
