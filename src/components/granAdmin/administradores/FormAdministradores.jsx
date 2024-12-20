import { Label, Select, TextInput } from 'flowbite-react';
import React from 'react';
import { FaEnvelope, FaIdCard, FaKeyboard, FaMercury, FaPhoneAlt } from 'react-icons/fa';

function FormAdministradores({ admin, handleChange, roles }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombres" value="Nombres" />
                    </div>
                    <TextInput id="nombres" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={admin.nombres} name='nombres' placeholder="Escribe los nombres..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="apellidos" value="Apellidos" />
                    </div>
                    <TextInput id="apellidos" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={admin.apellidos} name='apellidos' placeholder="Escribe los apellidos..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="tipo" value="Tipo Documento" />
                    </div>
                    <Select id="tipo" icon={FaIdCard} name='tipo_documento' onChange={handleChange}
                        defaultValue={admin.tipo_documento ? admin.tipo_documento : "Escoja una opción..."}>
                        <option disabled>Escoja una opción...</option>
                        <option value="TI">Tarjeta Identidad</option>
                        <option value="CC">Cédula Ciudadanía</option>
                        <option value="CE">Cédula Extranjería</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="documento" value="Número Documento" />
                    </div>
                    <TextInput id="documento" type="number" icon={FaIdCard} onChange={handleChange}
                        value={admin.numero_documento} name='numero_documento' placeholder="Digite el número de documento..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="correo" value="Correo" />
                    </div>
                    <TextInput id="correo" type="email" icon={FaEnvelope} onChange={handleChange}
                        value={admin.email} name='email' placeholder="Escribe el correo..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 sm:mt-3">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Teléfono" />
                    </div>
                    <TextInput id="telefono" type="tel" icon={FaPhoneAlt} onChange={handleChange}
                        value={admin.telefono} name='telefono' placeholder="Digite el numero de teléfono..." />
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sexo" value="Sexo" />
                    </div>
                    <Select id="sexo" type="text" icon={FaMercury} onChange={handleChange} name='sexo'
                        defaultValue={admin.sexo ? admin.sexo : "Escoja una opción..."}>
                        <option disabled>Escoja una opción...</option>
                        <option>Masculino</option>
                        <option>Femenino</option>
                        <option>Otro</option>
                    </Select>
                    <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                </div>
                {
                    !admin.id &&
                    <div className="w-full">
                        <div className="mb-2 block">
                            <Label htmlFor="rol" value="Rol" />
                        </div>
                        <Select id="rol" type="text" icon={FaMercury} onChange={handleChange} name='rol_id'
                            defaultValue={admin.rol_id ? admin.rol_id : "Escoja una opción..."}>
                            <option disabled>Escoja una opción...</option>
                            {
                                roles.map((rol) => (
                                    <option key={rol.id} value={rol.id}>{rol.descripcion}</option>
                                ))
                            }
                        </Select>
                        <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
                    </div>
                }
            </div>
        </>
    )
}

export default FormAdministradores