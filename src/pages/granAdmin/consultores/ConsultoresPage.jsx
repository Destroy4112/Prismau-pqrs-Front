import React from 'react';
import FormConsultores from '../../../components/granAdmin/consultores/FormConsultores';
import MenuSencillo from '../../../components/layouts/menu/MenuSencillo';
import useConsultores from '../../../hooks/useConsultores';
import useInstituciones from '../../../hooks/useInstituciones';
import { ConsultorColumn } from '../../../models/columns/ConsultorColumn';
import DataTableComponent from '../../../utils/dataTable/DataTableComponent';
import VentanaModal from '../../../utils/modals/VentanaModal';

function ConsultoresPage() {

    const { instituciones } = useInstituciones();
    const { consultor, consultores, isLoading, isCreating, isUpdating, openModal, tituloModal,
        toggleModal, handleChange, handleSubmit, handleUpdate, cargar, handleDelete } = useConsultores();
    const handler = consultor.id ? handleUpdate : handleSubmit;
    const loading = consultor.id ? isUpdating : isCreating;
    const columns = ConsultorColumn({ cargar, handleDelete });

    return (
        <>
            <MenuSencillo toggleModal={toggleModal} buscar={false} />
            <DataTableComponent data={consultores} loading={isLoading} columns={columns} />
            <VentanaModal size={"full"} openModal={openModal} cerrarModal={toggleModal} hanleSubmit={handler}
                loading={loading} titulo={tituloModal} >
                <FormConsultores consultor={consultor} handleChange={handleChange} instituciones={instituciones} />
            </VentanaModal>
        </>
    )
}

export default ConsultoresPage
