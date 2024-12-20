import React from 'react';
import FormInstitucion from '../../../components/granAdmin/instituciones/FormInstitucion';
import { useInstitucionContext } from '../../../context/InstitucionContext';
import Container from '../../../utils/helpers/Container';

export default function InstitucionPage() {

    const { institucion } = useInstitucionContext();

    return (
        <Container>
            <FormInstitucion institucion={institucion} disabled={true} />
        </Container>
    )
}
