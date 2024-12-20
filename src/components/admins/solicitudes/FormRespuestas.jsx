import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Label, Textarea, TextInput } from 'flowbite-react';
import { FaCheck, FaClock, FaExclamationCircle, FaHourglassEnd, FaTasks } from 'react-icons/fa';
import FilePreview from './FilePreview';

export default function FormRespuestas({ solicitud, handleChange, loading, rol, fileUrl, responder }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo de solicitud" />
                    </div>
                    <TextInput id="tipo" icon={FaTasks} value={solicitud.tipo} disabled />
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="prioridad" value="Prioridad" />
                    </div>
                    <TextInput id="prioridad" icon={FaExclamationCircle} value={solicitud.prioridad} disabled />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="descripcion" value="Descripción solicitud" />
                    </div>
                    <Textarea id="descripcion" type="text" value={solicitud.descripcion} disabled />
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-5">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label value="Seguimiento" />
                    </div>
                    <ol className="items-center sm:flex mt-5">
                        {
                            solicitud.estados && solicitud.estados.length > 0 ? (
                                solicitud.estados.map((estado, index) => (
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
                                            <div className="hidden sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                                        </div>
                                        <div className="mt-3 sm:pe-8">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{estado.estado}</h3>
                                            <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                                                {format(new Date(estado.fecha), 'dd MMMM yyyy', { locale: es })}
                                            </time>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li>No hay estados disponibles.</li>
                            )
                        }
                    </ol>
                </div>
                {fileUrl && (
                    <div className="w-full">
                        <div>
                            <h3 className="text-lg font-medium">Archivo adjunto:</h3>
                            {
                                fileUrl && (
                                    <FilePreview fileUrl={fileUrl} />
                                )
                            }
                        </div>
                    </div>
                )}
            </div>

            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                {
                    rol === 5 && (
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="respuesta" value="Respuesta" />
                            </div>
                            <Textarea id="respuesta" type="text" value={solicitud.respuesta || ''} name='respuesta'
                                onChange={rol === 5 ? handleChange : () => { }} placeholder='Escriba la respuesta a la solicitud' disabled={rol !== 5} />
                        </div>
                    )
                }
                {(rol === 3 && solicitud.respuesta) && (
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="respuesta2" value="Respuesta" />
                        </div>
                        <Textarea id="respuesta2" type="text" value={solicitud.respuesta} name='respuesta'
                            disabled />
                    </div>
                )
                }
            </div>

            {
                rol === 5 && (
                    <div className="max-w-full flex flex-col mt-16">
                        <div className="w-full flex items-end justify-end">
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                                onClick={responder} disabled={loading}>
                                {loading ? 'Cargando...' : 'Responder'}
                            </button>
                        </div>
                    </div>
                )
            }

        </>
    );
}
