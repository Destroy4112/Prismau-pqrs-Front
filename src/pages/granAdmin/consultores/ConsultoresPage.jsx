import React from 'react';
import FormConsultores from '../../../components/granAdmin/consultores/FormConsultores';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useConsultores from '../../../hooks/useConsultores';
import { ConsultorColumn } from '../../../models/columns/ConsultorColumn';
import DataTableComponent from '../../../utils/dataTable/DataTableComponent';
import VentanaModal from '../../../utils/modals/VentanaModal';
import useInstituciones from '../../../hooks/useInstituciones';

function ConsultoresPage() {

    const { consultor, consultores, loading, openModal, tituloModal,
        toggleModal, handleChange, handleSubmit, handleUpdate, cargar, eliminar } = useConsultores();
    const handler = consultor.id ? handleUpdate : handleSubmit;
    const { instituciones } = useInstituciones();
    const columns = ConsultorColumn({ cargar, eliminar });

    return (
        <>
            <MenuSencillo toggleModal={toggleModal} buscar={false} />
            <DataTableComponent data={consultores} loading={loading} columns={columns} />
            <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
                loading={loading} titulo={tituloModal} >
                <FormConsultores consultor={consultor} handleChange={handleChange} instituciones={instituciones} />
            </VentanaModal>
        </>
    )
}

export default ConsultoresPage
