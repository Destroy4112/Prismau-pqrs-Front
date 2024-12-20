import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaEnvelope, FaIdCard, FaKeyboard, FaMercury, FaPhoneAlt } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

function FormConsultores({ consultor, handleChange, instituciones }) {

    const handleInstitucionesChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => Number(option.value));
        handleChange({ target: { name: 'institucion', value: selectedOptions } });
    };

    const handleRemoveInstitucion = (id) => {
        const updatedInstituciones = consultor.institucion.filter(inst => inst !== id);
        handleChange({ target: { name: 'institucion', value: updatedInstituciones } });
    };

    const institucionesConsultor = consultor.institucion || [];

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} name='nombres'
                        onChange={handleChange} value={consultor.nombres} placeholder="Escribe los nombres..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={consultor.apellidos} name='apellidos' placeholder="Escribe los apellidos..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select id="tipo" icon={FaIdCard} name='tipo_documento' onChange={handleChange}
                        value={consultor.tipo_documento || "Escoja una opción..."}>
                        <option disabled>Escoja una opción...</option>
                        <option value="TI">Tarjeta Identidad</option>
                        <option value="CC">Cédula Ciudadanía</option>
                        <option value="CE">Cédula Extranjería</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="documento" value="Número Documento" />
                    </div>
                    <TextInput id="documento" type="number" icon={FaIdCard} onChange={handleChange}
                        value={consultor.numero_documento} name='numero_documento' placeholder="Digite el número de documento..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={handleChange}
                        value={consultor.email} name='email' placeholder="Escribe el correo..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Teléfono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} placeholder="Digite el número de teléfono..."
                        onChange={handleChange} value={consultor.telefono} name='telefono' />
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select id="sexo" icon={FaMercury} onChange={handleChange}
                        name='sexo' value={consultor.sexo || "Escoja una opción..."} >
                        <option disabled>Escoja una opción...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
            </div>

            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="instituciones" value="Instituciones Asignadas" />
                    </div>
                    <Select id="instituciones" name="institucion" onChange={handleInstitucionesChange}
                        multiple={true} value={institucionesConsultor}                    >
                        {
                            instituciones.map(institucion => (
                                <option key={institucion.id} value={institucion.id}>
                                    {institucion.nombre}
                                </option>
                            ))
                        }
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>

                    <div className="flex flex-col sm:flex-row my-4 gap-4">
                        {
                            institucionesConsultor.map(id => {
                                const institucion = instituciones.find(inst => inst.id === id);
                                return (
                                    <div key={id} className="flex items-center justify-between border border-gray-300 rounded-lg p-2 gap-4">
                                        <span>{institucion ? institucion.nombre : "Institución no encontrada"}</span>
                                        <button onClick={() => handleRemoveInstitucion(id)} className="text-red-600 hover:text-red-800">
                                            <MdCancel />
                                        </button>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormConsultores;
