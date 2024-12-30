import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PrivateRoutes } from "../models/RoutesModel";
import { asignPersonaSolicitud, cambiarPrioridad, createSolicitud, getSolicitudesConsultor, getSolicitudesInstitucion, getSolicitudesPersona, responderSolicitud, updateSolicitud } from "../service/SolicitudesService";

export default function apiQuerySolicitud(setOpenModal) {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const user = useSelector(state => state.credenciales);
    const usuario = useSelector(state => state.user);
    const institucion = useSelector(state => state.institucion);

    //=========== CREAR ==============================

    const { mutate: createSolicitudMutation, isPending: isCreating } = useMutation({
        mutationFn: createSolicitud,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['solicitudes'] });
                setOpenModal(false);
                toast.success("Solicitud creada con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al crear la solicitud: ${error.message}`);
        }
    });

    //=========== CONSULTAR ==========================

    const { data: solicitudes = [], isLoading } = useQuery({
        queryKey: ["solicitudes", institucion.id, user.rol.id, user.id],
        queryFn: async () => {
            if (user.rol.id == 3) {
                return await getSolicitudesInstitucion(institucion.id);
            } else if (user.rol.id == 4) {
                return await getSolicitudesConsultor(usuario.id);
            } else {
                return await getSolicitudesPersona(usuario.id);
            }
        },
        onError: (error) => { toast.error(`Error al cargar solicitudes: ${error.message}`); },
    });


    //=========== EDITAR ==============================

    const { mutate: actualizarSolicitudMutation, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, solicitud }) => updateSolicitud(id, solicitud),
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['solicitudes'] });
                setOpenModal(false);
                toast.success("Solicitud actualizada con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => { toast.error(`Error al actualizar la solicitud: ${error.message}`); },
    });

    //=========== CAMBIAR PRIORIDAD ==============================

    const { mutate: prioridadSolicitudMutation, isPending: isChangingPriority } = useMutation({
        mutationFn: cambiarPrioridad,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['solicitudes'] });
                toast.success("Prioridad cambiada con exito", { autoClose: 2000 });
                navigate(PrivateRoutes.SOLICITUDES);
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => { toast.error(`Error al actualizar la solicitud: ${error.message}`); },
    });

    //=========== ASIGNAR RESPONSABLE ==============================

    const { mutate: responsableSolicitudMutation, isPending: isAsigning } = useMutation({
        mutationFn: asignPersonaSolicitud,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['solicitudes'] });
                toast.success("Asignado con exito", { autoClose: 2000 });
                navigate(PrivateRoutes.SOLICITUDES);
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => { toast.error(`Error al actualizar la solicitud: ${error.message}`); },
    });

    //=========== RESPONDER ==============================

    const { mutate: responderSolicitudMutation, isPending: isResponding } = useMutation({
        mutationFn: responderSolicitud,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['solicitudes'] });
                toast.success("Respondido con exito", { autoClose: 2000 });
                navigate(PrivateRoutes.SOLICITUDES);
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => { toast.error(`Error al actualizar la solicitud: ${error.message}`); },
    });

    return {
        solicitudes,
        isLoading,
        isCreating,
        isUpdating,
        isChangingPriority,
        isAsigning,
        isResponding,
        createSolicitudMutation,
        actualizarSolicitudMutation,
        prioridadSolicitudMutation,
        responsableSolicitudMutation,
        responderSolicitudMutation
    }
}
