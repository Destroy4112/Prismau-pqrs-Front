import { useAppMutation, useAppQuery, useAppQueryClient, useAppSelector } from "../../../../hooks/useStore";
import { createSolicitud, getSolicitudes, updateSolicitud } from "./solicitud.service";

export default function apiQuerySolicitud() {

    const queryClient = useAppQueryClient();
    const id = useAppSelector(state => state.institucion.id);

    //=========== CREAR ==============================

    const { mutate: createSolicitudMutation, isPending: isCreating } = useAppMutation({
        mutationFn: createSolicitud,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['solicitudes'] }),
    });

    //=========== CONSULTAR ==========================

    const { data: solicitudes = [], isLoading } = useAppQuery({
        queryKey: ["solicitudes", id], queryFn: () => getSolicitudes(id),
        onError: (error) => { console.log(`Error al cargar solicitudes: ${error.message}`); },
    });

    //=========== EDITAR ==============================

    const { mutate: actualizarSolicitudMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: ({ id, solicitud }) => updateSolicitud(id, solicitud),
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['solicitudes'] }),
    });

    return {
        solicitudes,
        isLoading,
        isCreating,
        isUpdating,
        createSolicitudMutation,
        actualizarSolicitudMutation,
    }
}
