import React from 'react';
import DataTableComponent from '../../../components/dataTable/DataTableComponent';
import Contenido from '../../../components/helpers/Contenido';
import TituloPage from '../../../components/helpers/TituloPage';
import MenuSencillo from '../../../components/menu/MenuSencillo';
import { SolicitudesColumn } from './components/SolicitudesColumn';
import useSolicitud from './hooks/useSolicitud';

export default function SolicitudesConsultorPage() {

  const { titulo, busqueda, isLoading, lista, handleAsignar, handleBusqueda } = useSolicitud();
  const columns = SolicitudesColumn();

  return (
    <>
      <TituloPage titulo={titulo} />
      <Contenido>
        <MenuSencillo buscar={false} busqueda={busqueda} handleBusqueda={handleBusqueda} />
        <DataTableComponent data={lista} columns={columns} loading={isLoading} />
      </Contenido>
    </>
  )
}
