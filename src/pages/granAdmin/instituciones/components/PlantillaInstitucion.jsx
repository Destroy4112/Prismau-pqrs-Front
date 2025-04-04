import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useInstitucionContext } from '../../../../context/InstitucionContext';
import { PrivateRoutes } from '../../../../models/RoutesModel';
import SpinnerUtil from '../../../../utils/spinner/SpinnerUtil';
import MenuInstitucion from './MenuInstitucion';

export default function PlantillaInstitucion() {

    const location = useLocation();
    const { setInstitucion } = useInstitucionContext();

    useEffect(() => {
        if (location.state?.institucion) {
            setInstitucion(location.state.institucion);
        }
    }, [location.state, setInstitucion]);
    const { institucion = {} } = useInstitucionContext();

    const menuTicsoft = [
        { name: 'Administradores', path: PrivateRoutes.ADMINS },
        { name: 'Consultores', path: PrivateRoutes.CONSULTORES },
        { name: 'Personal', path: PrivateRoutes.PERSONAL },
    ];

    const general = [
        { name: 'Administradores', path: PrivateRoutes.ADMINS },
    ];

    if (!institucion) {
        return (
            <div className='w-full flex justify-center items-center'>
                <SpinnerUtil size={5} />
            </div>
        );
    }

    const items = institucion.id === 1 ? menuTicsoft : general;

    return (
        <>
            <MenuInstitucion title={institucion?.nombre} logo={institucion?.logo} items={items} />
            <div>
                <Outlet />
            </div>
        </>
    );
}
