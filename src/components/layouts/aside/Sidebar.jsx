import React from 'react';
import InfoInstituto from './InfoInstituto';
import InfoUser from './InfoUser';
import LinkAside from './LinkAside';
import LinkInicio from './LinkInicio';
import { getMenuItemsByRole } from './sidebar.items';

const Sidebar = React.memo(function Sidebar({ usuario, rol }) {

    const items = getMenuItemsByRole(rol);

    return (
        <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-16 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
            <div className="flex flex-col h-full">
                <InfoUser usuario={usuario} />
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800 hide-scrollbar">
                    <ul className="font-medium pt-2">
                        <LinkInicio />
                        {
                            items.map((item) => (
                                <LinkAside menu={item} key={item.texto} activeSubroutes={item.activeSubroutes} />
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
