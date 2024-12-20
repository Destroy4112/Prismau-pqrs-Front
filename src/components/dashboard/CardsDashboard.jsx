import React from 'react'

export default function CardsDashboard({ items }) {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {
                items.length > 0 ?
                    items.map((card, index) => (
                        <div
                            key={index}
                            className={`flex items-center justify-between border p-4 rounded-lg
                                    border-${card.color} text-${card.color}
                                    bg-${card.color}-100 overflow-hidden`}
                        >
                            <div className="p-2 font-bold flex-1">
                                <h3 className="text-3xl truncate mb-1">{card.cantidad}</h3>
                                <p className="font-normal text-sm truncate">{card.titulo}</p>
                            </div>
                            <div className="text-2xl sm:text-6xl flex-shrink-0">
                                <i className={`fa fa-${card.icono}`}></i>
                            </div>
                        </div>
                    ))
                    : null
            }
        </div>
    )
}
