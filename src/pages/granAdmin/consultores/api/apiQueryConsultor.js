import { useAppMutation, useAppQuery, useAppQueryClient } from "../../../../hooks/useStore";
import { createConsultor, deleteConsultor, getConsultores, updateConsultor } from "./consultor.service";

export default function apiQueryConsultor() {

    const queryClient = useAppQueryClient();

    //=========== CREAR ==============================

    const { mutate: createConsultorMutation, isPending: isCreating } = useAppMutation({
        mutationFn: createConsultor,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['Consultores'] }),
    });

    //=========== CONSULTAR ==========================

    const { data: consultores = [], isLoading } = useAppQuery({
        queryKey: ["Consultores"], queryFn: getConsultores,
        onError: (error) => { console.log(`Error al cargar los Consultores: ${error.message}`) },
    });

    //=========== EDITAR ==============================

    const { mutate: actualizarConsultorMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: updateConsultor,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['Consultores'] }),
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarConsultorMutation } = useAppMutation({
        mutationFn: deleteConsultor,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['Consultores'] }),
    });

    return {
        consultores,
        isLoading,
        isCreating,
        isUpdating,
        createConsultorMutation,
        actualizarConsultorMutation,
        eliminarConsultorMutation
    }
}
