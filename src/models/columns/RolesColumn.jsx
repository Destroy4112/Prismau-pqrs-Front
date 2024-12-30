import { FaCog, FaCogs, FaEdit, FaListOl, FaTrashAlt } from "react-icons/fa";

export const RolesColumn = ({ cargar, handleDelete }) => {

    return [

        {
            name: (<div className="flex items-center gap-2">
                <FaListOl />
            </div>),
            selector: (row) => row.id,
        },
        {
            name: (<div className="flex items-center gap-2">
                <FaCogs /> Rol
            </div>),
            selector: row => row.descripcion,
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
        }
    ];
};