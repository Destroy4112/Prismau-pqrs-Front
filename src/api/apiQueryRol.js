import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createRol, deleteRol, getRoles, updateRol } from "../service/RolesService";

export default function apiQueryRol(setOpenModal) {

    const queryClient = useQueryClient();

    //=========== CREAR ==============================

    const { mutate: createRolMutation, isPending: isCreating } = useMutation({
        mutationFn: createRol,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['roles'] });
                setOpenModal(false);
                toast.success("Rol creado con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al crear el rol: ${error.message}`);
        }
    });

    //=========== CONSULTAR ==========================

    const { data: roles = [], isLoading } = useQuery({
        queryKey: ["roles"], queryFn: getRoles,
        onError: (error) => { toast.error(`Error al cargar  Roles: ${error.message}`); },
    });


    //=========== EDITAR ==============================

    const { mutate: actualizarRolMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateRol,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['roles'] });
                setOpenModal(false);
                toast.success("Rol actualizada con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al actualizar el rol: ${error.message}`);
        },
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarRolMutation } = useMutation({
        mutationFn: deleteRol,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries(["roles"]);
                toast.success("Rol eliminado con éxito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al eliminar institución: ${error.message}`);
        },
    });

    return {
        roles,
        isLoading,
        isCreating,
        isUpdating,
        createRolMutation,
        actualizarRolMutation,
        eliminarRolMutation
    }
}
