import React from 'react';
import { FaFilter, FaSearch } from 'react-icons/fa';

function BuscadorAvanzado({ busqueda, handleBusqueda, filtro, options }) {

    return (
        <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
            <div className="flex">
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FaFilter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <select className="p-2 ps-10 text-sm text-gray-900 border border-r-0 border-gray-300 rounded-s-lg w-30 bg-gray-50 focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => filtro(e.target.value)}>
                        {options &&
                            options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input type="text" id="table-search-users" onChange={handleBusqueda} value={busqueda} className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-e-lg w-30 sm:w-80 bg-gray-50 focus:ring-gray-300 focus:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Buscar..."></input>
                </div>
            </div>
        </div>
    );
}

export default BuscadorAvanzado