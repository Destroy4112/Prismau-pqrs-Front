import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Label, Select, Textarea, TextInput } from 'flowbite-react';
import { FaCheck, FaClock, FaExclamationCircle, FaHourglassEnd, FaTasks, FaUser } from 'react-icons/fa';
import Container from '../../utils/helpers/Container';
import SpinnerUtil from '../../utils/spinner/SpinnerUtil';
import FilePreview from '../admins/solicitudes/FilePreview';

const StatusIcon = ({ estado }) => {
    switch (estado) {
        case "PENDIENTE":
            return <FaClock className="w-3 h-w-3 text-orange-500 dark:text-blue-300" />;
        case "EN PROCESO":
            return <FaHourglassEnd className="w-3 h-w-3 text-blue-500 dark:text-blue-300" />;
        case "CERRADA":
        default:
            return <FaCheck className="w-3 h-w-3 text-green-500 dark:text-green-300" />;
    }
};

const RequestDetails = ({ solicitud, handleChange, prioridad, loadingPrioridad }) => (
    <>
        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
            <div className="w-full">
                <Label htmlFor="tipo" value="Tipo de solicitud" />
                <TextInput id="tipo" icon={FaTasks} value={solicitud.tipo} disabled />
            </div>
            <div className="w-full">
                <Label htmlFor="prioridad" value="Prioridad" />
                <Select id="prioridad" icon={FaExclamationCircle} name='prioridad' onChange={handleChange}
                    value={solicitud.prioridad ? solicitud.prioridad : ""}>
                    <option value="" disabled>Escoja una opción...</option>
                    <option value="ALTA">Alta</option>
                    <option value="MEDIA">Media</option>
                    <option value="BAJA">Baja</option>
                </Select>
            </div>
        </div>
        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
            <div className="w-full">
                <Label htmlFor="descripcion" value="Descripción solicitud" />
                <Textarea id="descripcion" value={solicitud.descripcion} disabled />
            </div>
        </div>
        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
            <div className="w-full flex justify-end">
                <button onClick={prioridad} disabled={loadingPrioridad} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >
                    {loadingPrioridad ? <SpinnerUtil size={5} /> : 'Actualizar'}
                </button>
            </div>
        </div>
    </>
);

const StatusTimeline = ({ estados }) => (
    <ol className="items-center sm:flex mt-5">
        {estados && estados.length > 0 ? (
            estados.map((estado, index) => (
                <li className="relative mb-6 sm:mb-0" key={index}>
                    <div className="flex items-center">
                        <div className="z-10 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                            <StatusIcon estado={estado.estado} />
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
        )}
    </ol>
);

const ResponseSection = ({ isClosed, puedeResponder, handleChange, solicitud, responder, loading }) => (
    <div className="w-full">
        <Label htmlFor="respuesta" value="Respuesta" />
        <Textarea id="respuesta" name="respuesta" onChange={handleChange} value={solicitud.respuesta || ''}
            placeholder="Escriba la respuesta a la solicitud" disabled={!isClosed && !puedeResponder} />
        <div className="max-w-full flex flex-col mt-3">
            <div className="w-full flex items-end justify-end">
                <button onClick={responder} disabled={loading || (!isClosed && !puedeResponder)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" >
                    {loading ? 'Cargando...' : 'Responder'}
                </button>
            </div>
        </div>
    </div>
);

export default function FormRespuestasConsultor({
    solicitud, handleChange, loading, fileUrl, personas, asignar, responder, puedeResponder, handleChangeCheckbox,
    changePrioridad, loadingPrioridad, loadingAsignar
}) {

    const isClosed = solicitud.estado === "CERRADA";

    return (
        <>
            <Container>
                <RequestDetails solicitud={solicitud} handleChange={handleChange} prioridad={changePrioridad}
                    loadingPrioridad={loadingPrioridad} />
            </Container>
            <Container>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-5">
                    <div className="w-full">
                        <Label value="Seguimiento" />
                        <StatusTimeline estados={solicitud.estados} />
                    </div>
                    {
                        fileUrl && (
                            <div className="w-full">
                                <h3 className="text-lg font-medium">Archivo adjunto:</h3>
                                <FilePreview fileUrl={fileUrl} />
                            </div>
                        )
                    }
                </div>
            </Container>
            <Container>
                <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:my-5">
                    {
                        isClosed ? (
                            <ResponseSection isClosed={isClosed} puedeResponder={puedeResponder} handleChange={handleChange}
                                solicitud={solicitud} responder={responder} loading={loading} />
                        ) : (
                            <>
                                <div className="w-full">
                                    <div className="flex items-center">
                                        <input type="checkbox" id="puedeResponder" checked={puedeResponder} onChange={handleChangeCheckbox}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-400 rounded" />
                                        <label htmlFor="puedeResponder" className="ms-2 text-sm font-medium text-gray-900">¿Puede responder?</label>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
                {
                    puedeResponder && !isClosed && (
                        <ResponseSection isClosed={isClosed} puedeResponder={puedeResponder} handleChange={handleChange}
                            solicitud={solicitud} responder={responder} loading={loading} />
                    )
                }
                {
                    !isClosed && !puedeResponder && (
                        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                            <div className="w-full">
                                <Label htmlFor="responsable" value="Asignar responsable" />
                                <Select icon={FaUser} id="responsable" name="persona"
                                    value={solicitud.persona ? solicitud.persona.id : ''} onChange={handleChange}>
                                    {
                                        personas.length > 0 ? (
                                            <>
                                                <option value={0}>Escoja una persona...</option>
                                                {personas.map((persona) => (
                                                    <option key={persona.id} value={persona.id}>{persona.nombres}</option>
                                                ))}
                                            </>
                                        ) : (
                                            <option disabled>No hay personas registradas</option>
                                        )
                                    }
                                </Select>
                            </div>
                            <div className="w-full flex items-end">
                                <button onClick={asignar} disabled={loadingAsignar}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    {loadingAsignar ? 'Cargando...' : 'Asignar'}
                                </button>
                            </div>
                        </div>
                    )
                }
            </Container>
        </>
    );
}
