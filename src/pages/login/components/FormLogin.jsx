import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { FaEye, FaEyeSlash, FaIdCard, FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import imagen from '../../../assets/img/imagen';
import SpinnerUtil from '../../../utils/spinner/SpinnerUtil';

function FormLogin({ loading, usuario, handleChange, visible, toggleVisible, handleSubmit }) {

    return (
        <div className="md:w-1/2 p-8 flex flex-col items-start justify-center w-full">
            <div className="space-y-4 w-full">
                <div className="flex items-center justify-center md:justify-start">
                    <img src={imagen.LOGO} alt='Logo' className='w-12 h-12 mr-2 md:hidden' />
                    <h1 className="text-3xl font-bold">PrismaU</h1>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Ingresa tus credenciales para acceder a tu cuenta.</p>
            </div>
            <form className="w-full space-y-4 mt-6" onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="usuario">Usuario</Label>
                    <TextInput icon={FaIdCard} id="usuario" name="usuario" value={usuario.usuario}
                        onChange={handleChange} placeholder="Ej: 1234567890" />
                </div>
                <div className="relative">
                    <Label htmlFor="password">Contraseña</Label>
                    <TextInput icon={FaLock} id="password" type={`${visible ? 'text' : 'password'}`} name="password"
                        value={usuario.password} onChange={handleChange} placeholder="••••••••" />
                    <button type="button" onClick={toggleVisible} className="absolute text-gray-500 end-0 bottom-1 hover:text-blue-800 font-medium rounded-lg text-lg px-4 py-2">
                        {!visible ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </div>
                <div className="flex items-end justify-end">
                    <Link className="text-gray-500 font-medium text-sm hover:underline dark:text-gray-50">
                        Olvidé mi contraseña.
                    </Link>
                </div>
                <div className="pt-4">
                    <Button type="submit" className="w-full" >
                        {!loading ? 'Ingresar' : <SpinnerUtil size={5} />}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormLogin;
