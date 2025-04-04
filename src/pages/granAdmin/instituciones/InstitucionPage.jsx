import React from 'react';
import Caja from '../../../components/helpers/Caja';
import { useInstitucionContext } from '../../../context/InstitucionContext';
import InfoInstitucion from './components/InfoInstitucion';

export default function InstitucionPage() {

    const { institucion } = useInstitucionContext();

    return (
        <Caja>
            <InfoInstitucion institucion={institucion} />
        </Caja>
    )
}
