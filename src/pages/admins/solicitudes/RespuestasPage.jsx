import React from 'react';
import { useLocation } from 'react-router-dom';
import Contenido from '../../../components/helpers/Contenido';
import TituloPage from '../../../components/helpers/TituloPage';
import FormRespuestas from './components/FormRespuestas';
import useSolicitud from './hooks/useSolicitud';

export default function RespuestasPage() {

    const { state } = useLocation();
    const soli = state?.solicitud || {};
    const { solicitud, fileUrl } = useSolicitud(soli);

    return (
        <>
            <TituloPage titulo={"Detalle de la solicitud"} />
            <Contenido>
                <FormRespuestas solicitud={solicitud} fileUrl={fileUrl} />
            </Contenido>
        </>
    )
}
