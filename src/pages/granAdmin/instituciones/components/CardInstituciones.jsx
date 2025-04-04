import { Badge, Dropdown } from 'flowbite-react';
import React from 'react';
import { FaEllipsisV, FaEye } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import imagen from '../../../../assets/img/imagen';
import { PrivateRoutes } from '../../../../models/RoutesModel';
import { URL_ARCHIVOS } from '../../../../models/rutas/endpoints.model';
import CardSkeleton from '../../../../utils/skeletons/CardSkeleton';

function CardInstituciones({ instituciones, cargar, changeLogo, eliminar, loading }) {

    const navigate = useNavigate();

    if (loading) { return <CardSkeleton /> }

    return (
        <>
            {instituciones.length > 0 ?
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {instituciones.map((institucion) => (
                        <div key={institucion.id} className="bg-white rounded-xl border overflow-hidden transition-all hover:shadow-md">
                            <div className="px-6 pt-6 pb-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-1">
                                        <div className="h-16 w-16 bg-slate-100 rounded-lg flex items-center justify-center object-contain overflow-hidden flex-shrink-0 mr-4">
                                            <img src={institucion.logo ? URL_ARCHIVOS + institucion.logo : imagen.LOGO} alt={institucion.nombre} className="w-12 h-12 object-contain" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-semibold text-slate-800">{institucion.nombre}</h2>
                                            <div className="flex items-center mt-1">
                                                <Badge color="success">
                                                    {institucion.sector_economico}
                                                </Badge>
                                                <span className="text-xs text-slate-500 ml-3 flex items-center">
                                                    <FaLocationDot size={12} className="mr-0.5" />
                                                    {institucion.ciudad}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex">
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
                                </div>
                                <button className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-50 rounded-lg text-sm text-slate-600 hover:bg-green-100 transition-colors"
                                    onClick={() => navigate(PrivateRoutes.INSTITUCION, { state: { institucion } })}>
                                    <FaEye size={16} /> <span>Detalles de la institución</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div> :
                <div className='w-full flex items-center justify-center border-2 border-gray-200 rounded-lg h-60'>
                    <span className='text-gray-700 font-semibold'>No hay instituciones creadas</span>
                </div>
            }
        </>
    )
}

export default CardInstituciones