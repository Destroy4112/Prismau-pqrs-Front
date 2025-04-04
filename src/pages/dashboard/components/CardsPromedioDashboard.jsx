import React from 'react';

export default function CardsPromedioDashboard({ promedio }) {

    const card = { color: "blue-500", titulo: "Promedio de respuesta", valor: promedio, icono: "tachometer-alt" };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4 mt-5">
            <div className={`flex items-center justify-between border p-4 rounded-lg border-${card.color} text-${card.color} bg-${card.color}-100 overflow-hidden`} >
                <div className="p-2 font-bold flex-1">
                    <h3 className="text-3xl truncate mb-1">{card.titulo}</h3>
                    <p className="font-normal text-md truncate">{card.valor}</p>
                </div>
                <div className="text-2xl sm:text-6xl flex-shrink-0">
                    <i className={`fa fa-${card.icono}`}></i>
                </div>
            </div>
        </div>
    )
}
