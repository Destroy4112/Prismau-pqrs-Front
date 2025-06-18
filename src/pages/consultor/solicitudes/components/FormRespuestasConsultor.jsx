import { Label, Textarea } from 'flowbite-react';
import { FaExclamationCircle, FaTasks, FaUser } from 'react-icons/fa';
import InputIcon from '../../../../components/form/InputIcon';
import SelectIcon from '../../../../components/form/SelectIcon';
import TextAreaField from '../../../../components/form/TextAreaField';
import Caja from '../../../../components/helpers/Caja';
import SpinnerUtil from '../../../../utils/spinner/SpinnerUtil';
import EstadosSolicitud from '../../../admins/solicitudes/components/EstadosSolicitud';
import FilePreview from '../../../admins/solicitudes/components/FilePreview';

export default function FormRespuestasConsultor({ solicitud, handleChange, loading, fileUrl, personas, asignar, responder,
    puedeResponder, handleChangeCheckbox, changePrioridad, loadingPrioridad, loadingAsignar, handleChangeFile, fileRespuestaUrl }) {

    const isClosed = solicitud.estado === "CERRADA";
    const itemsPersonas = personas.map(persona => ({ value: persona.id, label: `${persona.nombres} ${persona.apellidos}` }));
    const options = [{ value: "ALTA", label: "ALTA" }, { value: "MEDIA", label: "MEDIA" }, { value: "BAJA", label: "BAJA" },]

    return (
        <>
            <Caja>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                    <InputIcon label={'Tipo de solicitud'} icon={FaTasks} value={solicitud.tipo} name={'tipo'} disabled={true} />
                    <SelectIcon label={'Prioridad'} handleChange={handleChange} items={options} icon={FaExclamationCircle} name={'prioridad'} value={solicitud.prioridad} />
                </div>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                    <TextAreaField label={'Descripción'} name={'descripcion'} value={solicitud.descripcion} disabled={true} />
                </div>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                    <div className="w-full flex justify-end">
                        <button onClick={changePrioridad} disabled={loadingPrioridad} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >
                            {loadingPrioridad ? <SpinnerUtil size={5} /> : 'Actualizar'}
                        </button>
                    </div>
                </div>
            </Caja>
            <Caja>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-5">
                    <EstadosSolicitud estados={solicitud.estados} />
                    {fileUrl && <FilePreview fileUrl={fileUrl} />}
                </div>
            </Caja>
            <Caja>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:my-5">
                    {isClosed ? (
                        <ResponseSection isClosed={isClosed} puedeResponder={puedeResponder} handleChange={handleChange}
                            handleChangeFile={handleChangeFile} solicitud={solicitud} responder={responder} loading={loading}
                            fileRespuestaUrl={fileRespuestaUrl} />
                    ) : (<>
                        <div className="w-full">
                            <div className="flex items-center">
                                <input type="checkbox" id="puedeResponder" checked={puedeResponder} onChange={handleChangeCheckbox}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded" />
                                <label htmlFor="puedeResponder" className="ms-2 text-sm font-medium text-gray-900">¿Puede responder?</label>
                            </div>
                        </div>
                    </>)
                    }
                </div>
                {puedeResponder && !isClosed && (
                    <ResponseSection isClosed={isClosed} puedeResponder={puedeResponder} handleChange={handleChange}
                        handleChangeFile={handleChangeFile} solicitud={solicitud} responder={responder} loading={loading}
                        fileRespuestaUrl={fileRespuestaUrl} />
                )}
                {!isClosed && !puedeResponder && (
                    <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                        <div className="w-full">
                            <SelectIcon label={'Asignar responsable'} handleChange={handleChange} items={itemsPersonas}
                                icon={FaUser} value={solicitud.persona ? solicitud.persona.id : ''} name={'persona'} />
                        </div>
                        <div className="w-full flex items-end">
                            <button onClick={asignar} disabled={loadingAsignar}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {loadingAsignar ? 'Cargando...' : 'Asignar'}
                            </button>
                        </div>
                    </div>
                )}
            </Caja>
        </>
    );
}

const ResponseSection = ({ isClosed, puedeResponder, handleChange, solicitud, responder, loading, handleChangeFile, fileRespuestaUrl }) => (
    <>
        <div className="space-y-3 w-full">
            <div className='w-full'>
                <Label htmlFor="respuesta" value="Respuesta" />
                <Textarea id="respuesta" name="respuesta" onChange={handleChange} value={solicitud.respuesta || ''}
                    placeholder="Escriba la respuesta a la solicitud" disabled={isClosed} />
            </div>
            {isClosed ? (
                solicitud.respuesta_Archivo ? (
                    <FilePreview fileUrl={fileRespuestaUrl} />
                ) : null
            ) : (
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Adjuntar archivo</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                        type="file" name='respuesta_Archivo' onChange={handleChangeFile} accept="image/*,application/pdf" />
                </div>
            )}
            {!isClosed &&
                <div className="max-w-full flex flex-col mt-3">
                    <div className="w-full flex items-end justify-end">
                        <button onClick={responder} disabled={loading || (!isClosed && !puedeResponder)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >
                            {loading ? 'Cargando...' : 'Responder'}
                        </button>
                    </div>
                </div>
            }
        </div>
    </>
);