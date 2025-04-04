import { Badge } from "flowbite-react";
import { FaBarcode, FaEnvelope, FaGlobe, FaIndustry, FaLink, FaMailBulk, FaMapPin, FaPhone, FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function PremiumInstitutionCard({ institucion }) {

    return (
        <div className="w-full mx-auto">
            <div className="relative p-8 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-white shadow-lg">
                            <FaIndustry className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
                                {institucion.nombre}
                            </h1>
                            <div className="flex items-center mt-0.5">
                                <Badge color="light" className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full">
                                    {institucion.sector_economico}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                        <FaBarcode className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">NIT:</span>
                            <span className="text-sm font-bold text-slate-800 dark:text-white">{institucion.nit}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-1.5 w-full bg-gradient-to-r from-green-500 via-purple-500 to-yellow-400"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white mb-6">
                        <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
                        CONTACTO
                    </h3>
                    <div className="space-y-6">
                        <InfoItem icon={<FaPhoneAlt className="h-5 w-5 text-emerald-500" />}
                            label="Teléfono" value={institucion.telefono} />

                        <InfoItem icon={<FaEnvelope className="h-5 w-5 text-amber-500" />}
                            label="Correo Electrónico" value={institucion.email} />

                        <InfoItem icon={<FaLink className="h-5 w-5 text-blue-500" />}
                            label="Sitio Web" value={institucion.web} />
                    </div>
                </div>
                <div className="p-6">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white mb-6">
                        <div className="h-8 w-1 bg-blue-500 rounded-full"></div>
                        UBICACIÓN
                    </h3>

                    <div className="space-y-6">
                        <InfoItem icon={<FaLocationDot className="h-5 w-5 text-blue-500" />}
                            label="Ciudad" value={institucion.ciudad} />

                        <InfoItem icon={<FaGlobe className="h-5 w-5 text-purple-500" />}
                            label="Departamento" value={institucion.departamento} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="group relative">
            <div className="flex items-start gap-4 border shadow-sm p-4 rounded-lg">
                <div className="flex-shrink-0 mt-1 p-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 shadow-sm">
                    {icon}
                </div>
                <div className="flex-grow">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                        {label}
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="text-base font-medium text-slate-800 dark:text-white">{value}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

