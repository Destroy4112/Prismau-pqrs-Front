import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { FaKeyboard } from 'react-icons/fa'

function FormRol({ rol, handleChange }) {

    return (
        <div className="max-w-full flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full">
                <div className="mb-2 block">
                    <Label htmlFor="descripcion" value="Descripción del rol" />
                </div>
                <TextInput id="descripcion" type="text" icon={FaKeyboard} onChange={handleChange}
                    value={rol.descripcion}
                    name='descripcion' placeholder="Ej: user" />
                <p className="text-sm text-gray-800 dark:text-gray-300" id="motivo_help">*Requerido*.</p>
            </div>
        </div>
    )
}

export default FormRol