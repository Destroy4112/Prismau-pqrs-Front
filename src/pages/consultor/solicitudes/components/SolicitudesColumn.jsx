import { FaCalendarAlt, FaClipboardCheck, FaCog, FaExclamationCircle, FaEye, FaFileAlt, FaLandmark, FaListOl, FaTasks } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../../../models/RoutesModel";
import { formatearFecha } from "../../../../utils/convertidores/converter";

export const SolicitudesColumn = () => {

    const navigate = useNavigate();

    const color = (estado) => {
        return estado == "PENDIENTE" ? 'yellow-400' : estado == 'EN PROCESO' ? 'blue-500' : 'green-500';
    }

    const prioridad = (prioridad) => {
        return prioridad == "ALTA" ? 'red' : prioridad == 'MEDIA' ? 'yellow' : 'green';
    }

    const asignacion = (asignacion) => {
        return asignacion ? 'green' : 'red';
    }

    const columnas = [
        {
            name: (<div className="flex items-center gap-2">
                <FaListOl />
            </div>),
            selector: (row, index) => index + 1,
            width: '50px',
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaCog /> Acciones
            </div>),
            selector: row => (
                <button onClick={() => navigate(PrivateRoutes.RESPUESTA_CONSULTOR, { state: { solicitud: row } })} className='flex items-center justify-center rounded-full w-8 h-8 bg-blue-700 text-white hover:bg-white hover:text-blue-700 hover:border hover:border-blue-700' title='Editar'>
                    <FaEye />
                </button>
            ),
            width: '120px',
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaClipboardCheck /> Estado
            </div>),
            selector: row =>
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full bg-${color(row.estado)} mr-2`}></div>
                    {row.estado}
                </div>,
            width: '140px',
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaTasks /> Tipo Solicitud
            </div>),
            selector: row => row.tipo,
            width: '180px',
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaExclamationCircle /> Prioridad
            </div>),
            selector: row =>
                <span className={`bg-${prioridad(row.prioridad)}-100 text-${prioridad(row.prioridad)}-500 text-xs font-medium px-2.5 py-2.5`}>
                    {row.prioridad}
                </span>,
            width: '120px',
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaFileAlt /> Archivo
            </div>),
            selector: row => row.archivo ? "Si" : "No",
            width: '110px',
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaCalendarAlt /> Fecha
            </div>),
            selector: row => formatearFecha(row.createdAt),
        },
        {
            name: (
                <div className="flex items-center gap-2">
                    <FaClipboardCheck /> Asignación
                </div>
            ),
            selector: row => (
                <span className={`bg-${asignacion(row.persona)}-100 text-${asignacion(row.persona)}-500 text-xs font-medium px-2.5 py-2.5`}>
                    {row.persona ? "Asignado" : "Sin Asignar"}
                </span>
            ),
            width: '135px',
        },
        {
            name: (
                <div className="flex items-center gap-2">
                    <FaLandmark /> Institución
                </div>
            ),
            selector: row => row.usuario.institucion.nombre,
            width: '150px',
        }
    ];

    return columnas;
};
