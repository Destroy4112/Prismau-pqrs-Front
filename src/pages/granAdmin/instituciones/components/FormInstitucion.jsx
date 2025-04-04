import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { FaBarcode, FaCity, FaEnvelope, FaIndustry, FaKeyboard, FaLink, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa'

function FormInstitucion({ institucion, handleChange, disabled }) {

    return (
        <>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="nombre" value="Nombre de la institución" />
                    </div>
                    <TextInput disabled={disabled} id="nombre" type="text" icon={FaKeyboard} onChange={handleChange}
                        value={institucion.nombre} name='nombre' placeholder="Ej: Ticsoft" />
                    {!disabled && <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>}
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="mb-2 block">
                        <Label htmlFor="nit" value="Nit" />
                    </div>
                    <TextInput disabled={disabled} id="nit" type="text" icon={FaBarcode} onChange={handleChange}
                        value={institucion.nit} name='nit' placeholder="Ej: 123456789" />
                    {!disabled && <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>}
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="ciudad" value="Ciudad" />
                    </div>
                    <TextInput disabled={disabled} id="ciudad" type="text" icon={FaCity} onChange={handleChange}
                        value={institucion.ciudad} name='ciudad' placeholder="Ej: Sincelejo" />
                    {!disabled && <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>}
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="departamento" value="Departamento" />
                    </div>
                    <TextInput disabled={disabled} id="departamento" type="text" icon={FaMapMarkedAlt} onChange={handleChange}
                        value={institucion.departamento} name='departamento' placeholder="Ej: Sucre" />
                    {!disabled && <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>}
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="telefono" value="Telefono" />
                    </div>
                    <TextInput disabled={disabled} id="telefono" type="tel" icon={FaPhoneAlt} onChange={handleChange}
                        value={institucion.telefono} name='telefono' placeholder="Ej: 3123456789" />
                    {!disabled && <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>}
                </div>
            </div>
            <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4 mb-4">
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="email" value="Correo" />
                    </div>
                    <TextInput disabled={disabled} id="email" type="email" icon={FaEnvelope} onChange={handleChange}
                        value={institucion.email} name='email' placeholder="Ej: QkIzA@example.com" />
                    {!disabled && <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>}
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="web" value="Sitio web" />
                    </div>
                    <TextInput disabled={disabled} id="web" type="text" icon={FaLink} onChange={handleChange}
                        value={institucion.web} name='web' placeholder="Ej: http://www.ticsoft.com" />
                    {!disabled && <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>}
                </div>
                <div className="w-full">
                    <div className="mb-2 block">
                        <Label htmlFor="sector" value="sector" />
                    </div>
                    <TextInput disabled={disabled} id="sector" type="tel" icon={FaIndustry} onChange={handleChange}
                        value={institucion.sector_economico} name='sector_economico' placeholder="Ej: Desarrollo" />
                    {!disabled && <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>}
                </div>
            </div>
        </>
    );
}

export default FormInstitucion