import React from 'react';
import DataTableComponent from '../../../components/dataTable/DataTableComponent';
import Contenido from '../../../components/helpers/Contenido';
import TituloPage from '../../../components/helpers/TituloPage';
import MenuSencillo from '../../../components/menu/MenuSencillo';
import VentanaModal from '../../../components/modals/VentanaModal';
import FormSolicitudes from './components/FormSolicitudes';
import { SolicitudColumn } from './components/SolicitudColumn';
import useSolicitud from './hooks/useSolicitud';

export default function SolicitudesPage() {

  const { titulo, lista, isLoading, loading, openModal, solicitud, tituloModal, busqueda,
    handleChange, handleChangeImagen, toggleModal, handler, handleBusqueda, cargar } = useSolicitud();
  const columns = SolicitudColumn({ cargar });

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo toggleModal={toggleModal} busqueda={busqueda} handleBusqueda={handleBusqueda} />
        <DataTableComponent data={lista} columns={columns} loading={isLoading} />
        <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
          loading={loading} titulo={tituloModal} >
          <FormSolicitudes solicitud={solicitud} handleChange={handleChange} handleChangeImagen={handleChangeImagen} />
        </VentanaModal>
      </Contenido>
    </>
  )
}
