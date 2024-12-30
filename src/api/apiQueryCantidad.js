import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { getCantidadInstituciones } from '../service/InstitucionesService';
import { getCantidadRoles } from '../service/RolesService';
import {
    getCantidadSolicitudesConsultor,
    getCantidadSolicitudesEstado,
    getCantidadSolicitudesInstitucion,
    getCantidadSolicitudesPersona,
    getPromedioSolicitudesInstitucion
} from '../service/SolicitudesService';

export default function apiQueryCantidad() {

    const rol = useSelector(state => state.credenciales.rol.id);
    const institucion = useSelector(state => state.institucion);
    const usuario = useSelector(state => state.user);

    const { data: contRoles } = useQuery({
        queryKey: ['contRoles'], queryFn: getCantidadRoles, enabled: rol === 1,
        onError: (error) => { toast.error(`Error al cargar los roles: ${error.message}`); },
    });

    const { data: ContInstituciones } = useQuery({
        queryKey: ['contInstitucion'], queryFn: getCantidadInstituciones, enabled: rol === 1,
        onError: (error) => { toast.error(`Error al cargar las instituciones: ${error.message}`); },
    });

    const { data: contSolicitudes } = useQuery({
        queryKey: ['contSolicitudes', rol, institucion.id, usuario.id],
        queryFn: async () => {
            if (rol === 3) {
                return await getCantidadSolicitudesInstitucion(institucion.id);
            } else if (rol === 4) {
                return await getCantidadSolicitudesConsultor(usuario.id);
            } else {
                return await getCantidadSolicitudesPersona(usuario.id);
            }
        },
        enabled: rol === 3 || rol === 4 || rol === 5,
        onError: (error) => { toast.error(`Error al cargar las solicitudes: ${error.message}`); },
    });

    const { data: contSolicitudesEstados } = useQuery({
        queryKey: ['contSolicitudesEstados'],
        queryFn: async () => {
            const pendiente = await getCantidadSolicitudesEstado("PENDIENTE");
            const enProceso = await getCantidadSolicitudesEstado("EN PROCESO");
            const cerrada = await getCantidadSolicitudesEstado("CERRADA");
            return { pendiente, enProceso, cerrada };
        },
        enabled: rol === 4,
    });

    const { data: promedio } = useQuery({
        queryKey: ['promedio', institucion.id],
        queryFn: () => getPromedioSolicitudesInstitucion(institucion.id),
        enabled: rol === 3 || rol === 4 || rol === 5,
    });

    return {
        contRoles,
        ContInstituciones,
        contSolicitudes,
        solicitudesPendientes: contSolicitudesEstados?.pendiente,
        solicitudesEnProceso: contSolicitudesEstados?.enProceso,
        solicitudesCerradas: contSolicitudesEstados?.cerrada,
        promedio
    };
}
