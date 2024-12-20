import React from 'react'
import imagen from '../../assets/img/imagen'

function LogoLogin() {

    return (
        <div className="md:w-1/2 bg-white dark:bg-gray-800 items-center justify-center p-8 hidden md:flex">
            <img src={imagen.LOGO} alt='Logo' className='w-48' />
        </div>
    )
}

export default LogoLogin