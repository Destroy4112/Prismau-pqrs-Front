import { useAppMutation, useAppQuery, useAppQueryClient } from "../../../../hooks/useStore";
import { createInstitucion, deleteInstitucion, getInstituciones, updateInstitucion, updateLogoInstitucion } from "./institucion.Service";

export default function apiQueryInstitucion() {

    const queryClient = useAppQueryClient();

    //=========== CREAR ==============================

    const { mutate: createInstitucionMutation, isPending: isCreating } = useAppMutation({
        mutationFn: createInstitucion,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['instituciones'] })
    });

    //=========== CONSULTAR ==========================

    const { data: instituciones = [], isLoading } = useAppQuery({
        queryKey: ["instituciones"], queryFn: getInstituciones,
    });

    //=========== EDITAR ==============================

    const { mutate: actualizarInstitucionMutation, isPending: isUpdating } = useAppMutation({
        mutationFn: updateInstitucion,
        onSuccess: () => queryClient.refetchQueries({ queryKey: ['instituciones'] })
    });

    //=========== ACTUALIZAR LOGO ==============================

    const { mutate: actualizarLogoMutation, isPending: isUpdatingLogo } = useAppMutation({
        mutationFn: ({ logo, id }) => updateLogoInstitucion(logo, id),
        onSuccess: () => queryClient.refetchQueries(["instituciones"])
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarInstitucion } = useAppMutation({
        mutationFn: deleteInstitucion,
        onSuccess: () => queryClient.refetchQueries(["instituciones"])
    });

    return {
        instituciones,
        isLoading,
        isCreating,
        isUpdating,
        isUpdatingLogo,
        createInstitucionMutation,
        actualizarInstitucionMutation,
        actualizarLogoMutation,
        eliminarInstitucion
    }
}
