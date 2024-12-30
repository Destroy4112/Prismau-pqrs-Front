import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FormRespuestas from '../../../components/admins/solicitudes/FormRespuestas';
import FormRespuestasConsultor from '../../../components/consultores/FormRespuestasConsultor';
import usePersonal from '../../../hooks/usePersonal';
import useSolicitudes from '../../../hooks/useSolicitudes';

export default function RespuestasPage() {

    const location = useLocation();
    const rol = useSelector(state => state.credenciales.rol.id);
    const soli = location.state.solicitud;
    const { personas } = usePersonal();
    const { solicitud, fileUrl, puedeResponder, isChangingPriority, isAsigning, isResponding,
        handleCheckboxChange, setSolicitud, handleChange, handleAsignar, responder, changePrioridad } = useSolicitudes();

    useEffect(() => {
        setSolicitud(soli);
    }, [soli]);

    return (
        <div className='p-2'>
            <h1 className='text-2xl mb-10'>Detalle de la solicitud</h1>
            {
                rol === 4 ?
                    <FormRespuestasConsultor solicitud={solicitud} personas={personas} handleChange={handleChange} rol={rol}
                        fileUrl={fileUrl} asignar={handleAsignar} responder={responder} handleChangeCheckbox={handleCheckboxChange}
                        loading={isResponding} puedeResponder={puedeResponder} changePrioridad={changePrioridad}
                        loadingPrioridad={isChangingPriority} loadingAsignar={isAsigning} /> :
                    <FormRespuestas solicitud={solicitud} handleChange={handleChange} rol={rol} fileUrl={fileUrl}
                        loading={isResponding} responder={responder} />
            }
        </div>
    )
}
