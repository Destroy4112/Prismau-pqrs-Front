import React from 'react';
import { Link } from 'react-router-dom';
import { PrivateRoutes } from '../../models/RoutesModel';

export default function Page404() {
    return (
        <div className="flex flex-col h-screen bg-white font-serif px-4 text-center">
            <h1 className="text-8xl font-extrabold text-gray-800">
                404
            </h1>
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-cover bg-center w-full max-w-3xl h-80"
                    style={{ backgroundImage: "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')", }}
                />
            </div>

            <div className="pb-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Parece que estás perdido
                </h2>
                <p className="text-gray-600 mt-2">
                    La página que buscas no existe.
                </p>
                <Link to={PrivateRoutes.DASHBOARD} className="inline-block mt-4 px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition">
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
