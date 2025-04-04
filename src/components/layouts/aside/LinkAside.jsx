import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const LinkAside = React.memo(function LinkAside({ menu, activeSubroutes }) {
    
    const location = useLocation();

    const isActive = () => {
        if (location.pathname === menu.link) {
            return true;
        }
        if (activeSubroutes) {
            return activeSubroutes.some((subroute) => location.pathname.startsWith(subroute));
        }
        return false;
    };

    return (
        <li>
            <NavLink to={menu.link} replace={true} className={`flex items-center p-2 text-${menu.color}-${menu.opacidad} rounded-lg dark:text-white hover:bg-green-300 dark:hover:bg-green-400 group ${isActive() ? 'activo' : ''}`}            >
                <i className={`fa fa-${menu.icono} flex-shrink-0 w-5 text-xl mr-4 transition duration-75 dark:group-hover:text-white`}></i>
                <span className="flex-1 ms-3 mt-1 whitespace-nowrap">{menu.texto}</span>
            </NavLink>
        </li>
    );
});

export default LinkAside;
