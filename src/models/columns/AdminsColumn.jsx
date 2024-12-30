import { FaCog, FaEdit, FaEnvelope, FaIdBadge, FaIdCard, FaListOl, FaPhoneAlt, FaTrashAlt } from "react-icons/fa";

export const AdminsColumn = ({ cargar, handleDelete }) => {

    return [
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
                <div className="flex">
                    <button onClick={() => cargar(row)} className='flex items-center justify-center rounded-full w-8 h-8 bg-blue-700 text-white hover:bg-white hover:text-blue-700 hover:border hover:border-blue-700' title='Editar'>
                        <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(row.id)} className='flex items-center justify-center rounded-full w-8 h-8 bg-red-700 text-white hover:bg-white hover:text-red-700 hover:border hover:border-red-700' title='Eliminar'>
                        <FaTrashAlt />
                    </button>
                </div>
            ),
            width: '100px',
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaIdBadge /> Nombre Completo
            </div>),
            selector: row => row.nombres + ' ' + row.apellidos,
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaIdCard /> Identificación
            </div>),
            selector: row => row.tipo_documento + ' ' + row.numero_documento,
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaEnvelope /> Correo
            </div>),
            selector: row => row.email,
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaPhoneAlt /> Telefono
            </div>),
            selector: row => row.telefono,
        },
    ];
};