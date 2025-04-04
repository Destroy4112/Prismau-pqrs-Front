import React from 'react';
import DataTableComponent from '../../../components/dataTable/DataTableComponent';
import Contenido from '../../../components/helpers/Contenido';
import MenuSencillo from '../../../components/menu/MenuSencillo';
import VentanaModal from '../../../components/modals/VentanaModal';
import useInstitucion from '../instituciones/hooks/useInstitucion';
import { ConsultorColumn } from './components/ConsultorColumn';
import FormConsultores from './components/FormConsultores';
import useConsultor from './hooks/useConsultor';
import TituloPage from '../../../components/helpers/TituloPage';

function ConsultoresPage() {

    const { instituciones } = useInstitucion();
    const { titulo, consultor, consultores, isLoading, loading, openModal, tituloModal,
        toggleModal, handleChange, handleChangeInstituciones, handler, cargar, handleDelete } = useConsultor();
    const columns = ConsultorColumn({ cargar, handleDelete });

    return (
        <>
            <TituloPage titulo={titulo} />
            <Contenido>
                <MenuSencillo toggleModal={toggleModal} buscar={false} />
                <DataTableComponent data={consultores} loading={isLoading} columns={columns} />
                <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
                    loading={loading} titulo={tituloModal} >
                    <FormConsultores consultor={consultor} handleChange={handleChange} instituciones={instituciones}
                        handleChangeInstituciones={handleChangeInstituciones} />
                </VentanaModal>
            </Contenido>
        </>
    )
}

export default ConsultoresPage
