import React from 'react';
import { NavLink } from 'react-router-dom';
import { PrivateRoutes } from '../../../models/RoutesModel';

function LinkInicio() {

    return (
        <>
            <li>
                <NavLink to={PrivateRoutes.DASHBOARD} className="flex items-center p-2 text-gray-700 rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-green-400 group">
                    <i className={`fa fa-home flex-shrink-0 w-5 text-xl mr-4 transition duration-75 dark:group-hover:text-white`}></i>
                    <span className="flex-1 ms-3 mt-1 whitespace-nowrap">Inicio</span>
                </NavLink>
            </li>
        </>
    );
}

export default LinkInicio;