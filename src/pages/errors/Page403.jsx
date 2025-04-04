import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/403.css';
import { PrivateRoutes } from '../../models/RoutesModel';
import IconoProhibido from './components/IconoProhibido';

function Page403() {

    return (
        <div className='contenedor-403'>
            <IconoProhibido />
            <h1 className='message-403'>No tienes permiso para acceder a esta página.</h1>
            <Link className='link-403' to={PrivateRoutes.DASHBOARD}>Volver</Link>
        </div>
    )
}

export default Page403