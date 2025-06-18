import { Label, Textarea, TextInput } from 'flowbite-react';
import { FaCheckSquare, FaExclamationCircle, FaEye, FaTasks } from 'react-icons/fa';
import Caja from '../../../../components/helpers/Caja';
import EstadosSolicitud from './EstadosSolicitud';
import FilePreview from './FilePreview';

export default function FormRespuestas({ solicitud, fileUrl }) {

    return (
        <>
            <div className="border border-emerald-500 rounded-lg p-4 mb-4 text-emerald-500 shadow-lg">
                <div className="flex items-start justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <FaEye className="h-6 w-6" />
                            <h2 className="text-xl font-semibold">Estado: {solicitud.estado}</h2>
                        </div>
                    </div>
                    <div className="bg-emerald-400/30 p-2 rounded-full">
                        <div className="bg-white/90 rounded-full h-3 w-3"></div>
                    </div>
                </div>
            </div>
            <Caja>
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
                        <EstadosSolicitud estados={solicitud.estados} />
                    </div>
                    {fileUrl && (
                        <div className="w-full">
                            <div>
                                <h3 className="text-lg font-medium">Archivo adjunto:</h3>
                                {fileUrl && <FilePreview fileUrl={fileUrl} />}
                            </div>
                        </div>
                    )}
                </div>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                    {solicitud.respuesta ? (
                        <div className="w-full">
                            <div className="mb-2 block">
                                <Label htmlFor="respuesta2" value="Respuesta" />
                            </div>
                            <Textarea id="respuesta2" type="text" value={solicitud.respuesta} name='respuesta'
                                disabled />
                        </div>
                    ) : (
                        <div className="w-full text-center py-8">
                            <FaCheckSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">Aún no hay respuesta para esta solicitud</p>
                            <p className="text-sm text-gray-400 mt-1">
                                Recibirás una notificación cuando haya una respuesta disponible
                            </p>
                        </div>
                    )}
                </div>
            </Caja>
        </>
    );
}
