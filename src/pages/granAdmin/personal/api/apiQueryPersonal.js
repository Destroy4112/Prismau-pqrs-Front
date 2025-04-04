import { useAppMutation, useAppQuery, useAppQueryClient } from "../../../../hooks/useStore";
import { createPersona, deletePersona, getPersonas, updatePersona } from "./persona.service";

export default function apiQueryPersonal() {

    const queryClient = useAppQueryClient();

    //=========== CREAR ==============================

    const { mutate: createPersonalMutation, isPending: isCreating } = useAppMutation({
        mutationFn: createPersona,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['personas'] }),
    });

    //=========== CONSULTAR ==========================

    const { data: personas = [], isLoading } = useAppQuery({
        queryKey: ["personas"], queryFn: getPersonas,
        onError: (error) => { console.log(`Error al cargar los personas: ${error.message}`) },
    });

    //=========== EDITAR ==============================

    const { mutate: actualizarPersonalMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: updatePersona,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['personas'] }),
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarPersonalMutation } = useAppMutation({
        mutationFn: deletePersona,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['personas'] }),
    });

    return {
        personas,
        isLoading,
        isCreating,
        isUpdating,
        createPersonalMutation,
        actualizarPersonalMutation,
        eliminarPersonalMutation
    }
}
