import { Dropdown } from 'flowbite-react';
import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import imagen from '../../../assets/img/imagen';
import { PrivateRoutes, RouteBackFile } from '../../../models/RoutesModel';

function CardInstituciones({ instituciones, cargar, changeLogo, eliminar }) {

    const navigate = useNavigate();

    return (
        <>
            {
                instituciones.length > 0 ?
                    <div className='p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        {
                            instituciones.map((institucion) => (
                                <div className='flex flex-col items-stretch font-sans bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-lg cursor-pointer' key={institucion.id}>
                                    <div className='flex justify-end mb-2'>
                                        <Dropdown inline={true} label={<FaEllipsisV className="text-gray-600" />} arrowIcon={false}>
                                            <Dropdown.Item onClick={() => cargar(institucion)}>
                                                Editar
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => changeLogo(institucion.id)}>
                                                Cambiar logo
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={() => eliminar(institucion.id)}>
                                                Eliminar
                                            </Dropdown.Item>
                                        </Dropdown>
                                    </div>
                                    <div onClick={() => navigate(PrivateRoutes.INSTITUCION, { state: { institucion } })} className='flex flex-col sm:flex-row sm:items-center gap-4 mb-2'>
                                        <img src={institucion.logo ? RouteBackFile + institucion.logo : imagen.LOGO} alt='Logo' className='w-12 h-12 object-contain' />
                                        <div className="flex flex-col">
                                            <h2 className='text-lg font-semibold text-gray-700'>{institucion.nombre}</h2>
                                            <span className='text-gray-500 text-xs'>{institucion.nit}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    :
                    <div className='w-full flex items-center justify-center border-2 border-gray-200 rounded-lg h-60'>
                        <span className='text-gray-700 font-semibold'>No hay instituciones creadas</span>
                    </div>
            }
        </>
    );
}

export default CardInstituciones