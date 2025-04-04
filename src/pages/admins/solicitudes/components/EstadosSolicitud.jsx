import { Label } from 'flowbite-react'
import React from 'react'
import { FaCheck, FaClock, FaHourglassEnd } from 'react-icons/fa'
import { formatearFechaHora } from '../../../../utils/convertidores/converter'

export default function EstadosSolicitud({ estados }) {
    return (
        <div className="w-full">
            <Label value="Seguimiento" />
            <ol className="items-center sm:flex mt-5">
                {estados && estados.length > 0 ? (
                    estados.map((estado, index) => (
                        <li className="relative mb-6 sm:mb-0" key={index}>
                            <div className="flex items-center">
                                <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                                    {estado.estado === "PENDIENTE" ? (
                                        <FaClock className="w-3 h-w-3 text-orange-500 dark:text-blue-300" />
                                    ) : estado.estado === "EN PROCESO" ? (
                                        <FaHourglassEnd className="w-3 h-w-3 text-blue-500 dark:text-blue-300" />
                                    ) : (
                                        <FaCheck className="w-3 h-w-3 text-green-500 dark:text-green-300" />
                                    )}
                                </div>
                                {index < estados.length - 1 && (
                                    <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                )}
                            </div>
                            <div className="mt-3 sm:pe-8">
                                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{estado.estado}</h3>
                                <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                    {formatearFechaHora(new Date(estado.fecha))}
                                </time>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No hay estados disponibles.</li>
                )}
            </ol>
        </div>
    )
}
