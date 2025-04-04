import { useAppQuery, useAppSelector } from '../../../hooks/useStore';
import { alertError } from '../../../utils/alerts/alertas.utility';
import { getCantidadInstituciones, getCantidadSolicitudesConsultor, getCantidadSolicitudesEstado, getCantidadSolicitudesInstitucion, getCantidadSolicitudesPersona, getPromedioSolicitudesInstitucion } from './cantidad.service';

export default function apiQueryCantidad() {

    const rol = useAppSelector(state => state.credenciales.rol);
    const institucion = useAppSelector(state => state.institucion);
    const usuario = useAppSelector(state => state.user);

    const { data: ContInstituciones } = useAppQuery({
        queryKey: ['contInstitucion'], queryFn: getCantidadInstituciones, enabled: rol === "SuperAdmin",
        onError: (error) => { alertError(`Error al cargar las instituciones: ${error.message}`); },
    });

    const { data: contSolicitudes } = useAppQuery({
        queryKey: ['contSolicitudes', rol, institucion.id, usuario.id],
        queryFn: async () => {
            if (rol === "Administrador") {
                return await getCantidadSolicitudesInstitucion(institucion.id);
            } else if (rol === "Consultor") {
                return await getCantidadSolicitudesConsultor(usuario.id);
            } else {
                return await getCantidadSolicitudesPersona(usuario.id);
            }
        },
        enabled: rol === "Administrador" || rol === "Consultor" || rol === "Persona",
        onError: (error) => { alertError(`Error al cargar las solicitudes: ${error.message}`); },
    });

    const { data: contSolicitudesEstados } = useAppQuery({
        queryKey: ['contSolicitudesEstados', usuario.id],
        queryFn: async () => {
            const pendiente = await getCantidadSolicitudesEstado(usuario.id, "PENDIENTE");
            const enProceso = await getCantidadSolicitudesEstado(usuario.id, "EN PROCESO");
            const cerrada = await getCantidadSolicitudesEstado(usuario.id, "CERRADA");
            return { pendiente, enProceso, cerrada };
        },
        enabled: rol === "Consultor",
    });

    const { data: promedio } = useAppQuery({
        queryKey: ['promedio', institucion.id],
        queryFn: () => getPromedioSolicitudesInstitucion(institucion.id),
        enabled: rol === "Administrador",
    });

    return {
        ContInstituciones,
        contSolicitudes,
        solicitudesPendientes: contSolicitudesEstados?.pendiente,
        solicitudesEnProceso: contSolicitudesEstados?.enProceso,
        solicitudesCerradas: contSolicitudesEstados?.cerrada,
        promedio
    };
}
