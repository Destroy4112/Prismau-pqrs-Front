import { Label, Select as Select2, TextInput } from 'flowbite-react';
import React from 'react';
import { FaEnvelope, FaIdCard, FaKeyboard, FaMercury, FaPhoneAlt } from 'react-icons/fa';
import Select from "react-select";

function FormConsultores({ consultor, handleChange, handleChangeInstituciones, instituciones }) {

    const options = instituciones.map(item => ({ value: item.id, label: item.nombre }));

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
                <div className="w-full">
                    <div className="mb-2 block">
                        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Instituciones</span>
                    </div>
                    <Select isMulti options={options} className="w-full" onChange={handleChangeInstituciones}
                        value={options.filter(option => consultor.institucion.includes(option.value))} />
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select2 id="tipo" icon={FaIdCard} name='tipo_documento' onChange={handleChange}
                        value={consultor.tipo_documento || "Escoja una opción..."}>
                        <option disabled>Escoja una opción...</option>
                        <option value="TI">Tarjeta Identidad</option>
                        <option value="CC">Cédula Ciudadanía</option>
                        <option value="CE">Cédula Extranjería</option>
                    </Select2>
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
                    <Select2 id="sexo" icon={FaMercury} onChange={handleChange}
                        name='sexo' value={consultor.sexo || "Escoja una opción..."} >
                        <option disabled>Escoja una opción...</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </Select2>
                    <p className="text-sm text-gray-800 dark:text-gray-300">*Requerido*.</p>
                </div>
            </div>
        </>
    );
}

export default FormConsultores;
