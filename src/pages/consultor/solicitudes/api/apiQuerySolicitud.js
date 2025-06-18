import { useAppMutation, useAppQuery, useAppQueryClient, useAppSelector } from "../../../../hooks/useStore";
import { asignPersonaSolicitud, cambiarPrioridad, getSolicitudes, getSolicitudesPersona, responderSolicitud, setEnProceso } from "./solicitud.service";

export default function apiQuerySolicitud() {

    const queryClient = useAppQueryClient();
    const id = useAppSelector(state => state.user.id);
    const rol = useAppSelector(state => state.credenciales.rol);

    //=========== CONSULTAR ==========================

    const { data: solicitudes = [], isLoading } = useAppQuery({
        queryKey: ["solicitudes", id],
        queryFn: async () => {
            if (rol === "Persona") {
                return await getSolicitudesPersona(id);
            } else {
                return await getSolicitudes(id)
            }
        },
        onError: (error) => { console.log(`Error al cargar solicitudes: ${error.message}`); },
    });

    //=========== CAMBIAR PRIORIDAD ==============================

    const { mutate: prioridadSolicitudMutation, isPending: isChangingPriority } = useAppMutation({
        mutationFn: cambiarPrioridad,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['solicitudes'] }),
    });

    //=========== EN PROCESO ==============================

    const { mutate: enProcesoMutation } = useAppMutation({
        mutationFn: setEnProceso,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['solicitudes'] }),
    });

    //=========== ASIGNAR RESPONSABLE ==============================

    const { mutate: responsableSolicitudMutation, isPending: isAsigning } = useAppMutation({
        mutationFn: asignPersonaSolicitud,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['solicitudes'] }),
    });

    //=========== RESPONDER ==============================

    const { mutate: responderSolicitudMutation, isPending: isResponding } = useAppMutation({
        mutationFn: ({ id, solicitud }) => responderSolicitud(id, solicitud),
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['solicitudes'] }),
    });

    return {
        solicitudes,
        isLoading,
        isChangingPriority,
        isAsigning,
        isResponding,
        enProcesoMutation,
        prioridadSolicitudMutation,
        responsableSolicitudMutation,
        responderSolicitudMutation,
    }
}
