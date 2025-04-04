import React from 'react'
import { Link } from 'react-router-dom'
import imagen from '../../../assets/img/imagen'

export default function InfoUser({ usuario }) {

    return (
        <Link className="flex items-center gap-3 pb-3 mt-2 px-4 border-b border-gray-200">
            <img src={imagen.USUARIO} className="h-9 w-9" />
            <div className="flex-1">
                <p className="text-md font-medium">{usuario.nombres}</p>
                <p className="text-sm text-gray-500 -mt-1">{usuario.apellidos}</p>
            </div>
        </Link>
    )
}
