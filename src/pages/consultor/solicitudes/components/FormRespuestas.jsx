import { FaExclamationCircle, FaTasks } from 'react-icons/fa';
import InputIcon from '../../../../components/form/InputIcon';
import TextAreaField from '../../../../components/form/TextAreaField';
import EstadosSolicitud from '../../../admins/solicitudes/components/EstadosSolicitud';
import FilePreview from '../../../admins/solicitudes/components/FilePreview';

export default function FormRespuestas({ solicitud, handleChange, loading, fileUrl, responder }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <InputIcon label={'Tipo de solicitud'} icon={FaTasks} value={solicitud.tipo} name={'tipo'} disabled={true} />
                <InputIcon label={'Prioridad'} icon={FaExclamationCircle} name={'prioridad'} value={solicitud.prioridad} disabled={true} />
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <TextAreaField label={'Descripción'} name={'descripcion'} value={solicitud.descripcion} disabled={true} />
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-5">
                <EstadosSolicitud estados={solicitud.estados} />
                {fileUrl && <FilePreview fileUrl={fileUrl} />}
            </div>

            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <TextAreaField label={'Respuesta'} name={'respuesta'} value={solicitud.respuesta || ''}
                    handleChange={handleChange} />
            </div>
            <div className="max-w-full flex flex-col mt-16">
                <div className="w-full flex items-end justify-end">
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={responder} disabled={loading}>
                        {loading ? 'Cargando...' : 'Responder'}
                    </button>
                </div>
            </div>
        </>
    );
}
