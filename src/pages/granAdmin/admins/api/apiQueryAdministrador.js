import { useInstitucionContext } from "../../../../context/InstitucionContext";
import { useAppMutation, useAppQuery, useAppQueryClient } from "../../../../hooks/useStore";
import { createAdministrador, deleteAdministrador, getAdministradoresInstitucion, updateAdministrador } from "./administrador.service";

export default function apiQueryAdministrador() {

    const queryClient = useAppQueryClient();
    const { institucion } = useInstitucionContext();

    //=========== CREAR ==============================

    const { mutate: createAdministradorMutation, isPending: isCreating } = useAppMutation({
        mutationFn: createAdministrador,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['administradores'] }),
    });

    //=========== CONSULTAR ==========================

    const { data: administradores = [], isLoading } = useAppQuery({
        queryKey: ["administradores", institucion.id], queryFn: () => getAdministradoresInstitucion(institucion.id),
        onError: (error) => { console.log(`Error al cargar los administradores: ${error.message}`); },
    });

    //=========== EDITAR ==============================

    const { mutate: actualizarAdministradorMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: updateAdministrador,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['administradores'] }),
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarAdministradorMutation } = useAppMutation({
        mutationFn: deleteAdministrador,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['administradores'] }),
    });

    return {
        administradores,
        isLoading,
        isCreating,
        isUpdating,
        createAdministradorMutation,
        actualizarAdministradorMutation,
        eliminarAdministradorMutation
    }
}
