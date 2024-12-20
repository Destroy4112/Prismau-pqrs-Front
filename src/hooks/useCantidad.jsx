import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCantidadInstituciones } from '../service/InstitucionesService';
import { getCantidadRoles } from '../service/RolesService';
import { getCantidadSolicitudesConsultor, getCantidadSolicitudesEstado, getCantidadSolicitudesInstitucion, getCantidadSolicitudesPersona, getPromedioSolicitudesInstitucion } from '../service/SolicitudesService';

export default function useCantidad() {

    const rol = useSelector(state => state.credenciales.rol.id);
    const institucion = useSelector(state => state.institucion);
    const usuario = useSelector(state => state.user);
    const [roles, setRoles] = useState(0);
    const [instituciones, setInstituciones] = useState(0);
    const [solicitudes, setSolicitudes] = useState(0);
    const [solicitudesPendientes, setSolicitudesPendientes] = useState(0);
    const [solicitudesEnProceso, setSolicitudesEnProceso] = useState(0);
    const [solicitudesCerradas, setSolicitudesCerradas] = useState(0);
    const [promedio, setPromedio] = useState('');

    const cantidadRoles = async () => {
        try {
            const data = await getCantidadRoles();
            setRoles(data);
        } catch (error) {
            console.log(error);
        }
    }

    const cantidadInstituciones = async () => {
        try {
            const data = await getCantidadInstituciones();
            setInstituciones(data);
        } catch (error) {
            console.log(error);
        }
    }

    const cantidadSolicitudes = async () => {
        try {
            let data;
            if (rol == 3) {
                data = await getCantidadSolicitudesInstitucion(institucion.id);
            } else if (rol == 4) {
                data = await getCantidadSolicitudesConsultor(usuario.id);
            } else {
                data = await getCantidadSolicitudesPersona(usuario.id);
            }
            setSolicitudes(data);
        } catch (error) {
            console.log(error);
        }
    }

    const cantidadSolicitudesEstados = async () => {
        try {
            const pendiente = await getCantidadSolicitudesEstado("PENDIENTE");
            const enProceso = await getCantidadSolicitudesEstado("EN PROCESO");
            const cerrada = await getCantidadSolicitudesEstado("CERRADA");
            setSolicitudesPendientes(pendiente);
            setSolicitudesEnProceso(enProceso);
            setSolicitudesCerradas(cerrada);
        } catch (error) {
            console.log(error);
        }
    }
    
    const promedioSolicitudes = async () => {
        try {
           const data = await getPromedioSolicitudesInstitucion(institucion.id);
           setPromedio(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (rol === 4) {
            cantidadSolicitudesEstados();
        }
        if (rol == 3 || rol == 4 || rol == 5) {
            cantidadSolicitudes();
            promedioSolicitudes();
        }
        if (rol == 1) {
            cantidadRoles();
            cantidadInstituciones();
        }
    }, []);

    return {
        roles,
        instituciones,
        solicitudes,
        solicitudesPendientes,
        solicitudesEnProceso,
        solicitudesCerradas,
        promedio
    }
}
