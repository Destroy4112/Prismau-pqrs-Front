import React from 'react';
import { useSelector } from 'react-redux';
import { getMenuItemsByRole } from '../../../models/ItemsAside';
import InfoInstituto from './InfoInstituto';
import LinkAside from './LinkAside';
import LinkInicio from './LinkInicio';

const Sidebar = React.memo(function Sidebar({ open }) {

    const rol = useSelector((state) => state.credenciales.rol.id);
    const items = getMenuItemsByRole(rol);

    return (
        <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${!open && '-translate-x-full'} bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`} aria-label="Sidebar">
            <div className="flex flex-col h-full">
                <div className="flex-1 px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 hide-scrollbar">
                    <ul className="space-y-2 font-medium">
                        <LinkInicio />
                        {
                            items.map((item) => (
                                <LinkAside menu={item} key={item.texto} activeSubroutes={item.activeSubroutes}/>
                            ))
                        }
                    </ul>
                </div>
                <InfoInstituto />
            </div>
        </aside>
    );
});

export default Sidebar;
