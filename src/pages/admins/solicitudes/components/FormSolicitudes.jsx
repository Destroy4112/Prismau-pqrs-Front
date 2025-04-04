import { Label, Select, Textarea } from 'flowbite-react';
import { FaExclamationCircle, FaTasks } from 'react-icons/fa';

function FormSolicitudes({ solicitud, handleChange, handleChangeImagen }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo de solicitud" />
                    </div>
                    <Select id="tipo" icon={FaTasks} name='tipo' onChange={handleChange}
                        defaultValue={solicitud.tipo ? solicitud.tipo : "Escoja una opción..."}>
                        <option disabled>Escoja una opción...</option>
                        <option value="Petición">Petición</option>
                        <option value="Queja">Queja</option>
                        <option value="Reclamo">Reclamo</option>
                        <option value="Sugerencia">Sugerencia</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="prioridad" value="Prioridad" />
                    </div>
                    <Select id="prioridad" icon={FaExclamationCircle} name='prioridad' onChange={handleChange}
                        defaultValue={solicitud.prioridad ? solicitud.prioridad : "Escoja una opción..."}>
                        <option disabled>Escoja una opción...</option>
                        <option value="ALTA">Alta</option>
                        <option value="MEDIA">Media</option>
                        <option value="BAJA">Baja</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="descripcion" value="Descripción solicitud" />
                    </div>
                    <Textarea id="descripcion" type="text" onChange={handleChange} value={solicitud.descripcion}
                        name='descripcion' placeholder="Indique la descripción..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Archivo</label>
                    <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input"
                        type="file" name='archivo' onChange={handleChangeImagen} accept="image/*,application/pdf" />
                </div>
            </div>
        </>
    );
}

export default FormSolicitudes;
