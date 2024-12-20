import React from 'react'
import { useSelector } from 'react-redux'
import imagen from '../../../assets/img/imagen'
import { RouteBackFile } from '../../../models/RoutesModel'

function InfoInstituto() {

    const institucion = useSelector((state) => state.institucion)

    return (
        <div className="flex items-center gap-4 border-t py-4 ml-4 bg-white dark:bg-gray-800">
            <img className="w-8" src={institucion.logo ? RouteBackFile + institucion.logo : imagen.LOGO} alt="logo" />
            <div className="font-medium dark:text-white">
                <div>{institucion.nombre}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">NIT: {institucion.nit}</div>
            </div>
        </div>
    )
}

export default InfoInstituto