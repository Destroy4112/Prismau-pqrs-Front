import { FaExclamationCircle, FaTasks } from 'react-icons/fa';
import InputIcon from '../../../../components/form/InputIcon';
import TextAreaField from '../../../../components/form/TextAreaField';
import EstadosSolicitud from '../../../admins/solicitudes/components/EstadosSolicitud';
import FilePreview from '../../../admins/solicitudes/components/FilePreview';

export default function FormRespuestas({ solicitud, handleChange, loading, fileUrl, responder, handleChangeFile, fileRespuestaUrl }) {

    return (
        <div className='my-8'>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <InputIcon label={'Tipo de solicitud'} icon={FaTasks} value={solicitud.tipo} name={'tipo'} disabled={true} />
                <InputIcon label={'Prioridad'} icon={FaExclamationCircle} name={'prioridad'} value={solicitud.prioridad} disabled={true} />
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <TextAreaField label={'Descripción'} name={'descripcion'} value={solicitud.descripcion} disabled={true} />
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <EstadosSolicitud estados={solicitud.estados} />
                {fileUrl && <FilePreview fileUrl={fileUrl} />}
            </div>
            <div className="max-w-full flex flex-col space-y-6 sm:mt-3">
                <TextAreaField label={'Respuesta'} name={'respuesta'} value={solicitud.respuesta === "null" ? "Revise el archivo adjunto" : solicitud.respuesta}
                    handleChange={handleChange} disabled={solicitud.estado === "CERRADA"} />
                <div className="w-full">
                    {solicitud.estado === "CERRADA" ? (
                        <div>
                            <FilePreview fileUrl={fileRespuestaUrl} />
                        </div>
                    ) : (
                        <>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Adjuntar archivo</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                                type="file" name='respuesta_Archivo' onChange={handleChangeFile} accept="image/*,application/pdf" />
                        </>
                    )}
                </div>
            </div>
            {solicitud.estado !== "CERRADA" && (
                <div className="max-w-full flex flex-col mt-16">
                    <div className="w-full flex items-end justify-end">
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                            onClick={responder} disabled={loading}>
                            {loading ? 'Cargando...' : 'Responder'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
