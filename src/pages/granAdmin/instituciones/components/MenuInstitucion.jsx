import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import imagen from '../../../../assets/img/imagen';
import { URL_ARCHIVOS } from '../../../../models/rutas/endpoints.model';

export default function MenuInstitucion({ title, logo, items }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="-mx-3 bg-white border-b border-gray-200 dark:bg-gray-900 mb-6 relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-1">
                    <img src={logo ? URL_ARCHIVOS + logo : imagen.LOGO} className="h-8" alt="Institución Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{title}</span>
                </div>
                <button type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isOpen} onClick={toggleMenu}>
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`absolute top-full right-0 bg-white z-40 mt-2 w-full max-w-xs rounded-lg border border-gray-300 md:border-none md:static md:w-auto md:max-w-none md:mt-0 ${isOpen ? 'block' : 'hidden'} md:block`} id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 rtl:space-x-reverse">
                        {items.map((item, index) => (
                            <li key={index}>
                                <NavLink to={item.path} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
