import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useInstitucionContext } from "../context/InstitucionContext";
import { createAdministrador, deleteAdministrador, getAdministradoresInstitucion, updateAdministrador } from "../service/AdministradoresService";

export default function apiQueryAdministrador(setOpenModal) {

    const queryClient = useQueryClient();
    const { institucion } = useInstitucionContext();

    //=========== CREAR ==============================

    const { mutate: createAdministradorMutation, isPending: isCreating } = useMutation({
        mutationFn: createAdministrador,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['administradores'] });
                setOpenModal(false);
                toast.success("Administrador creado con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al crear el administrador: ${error.message}`);
        }
    });

    //=========== CONSULTAR ==========================

    const { data: administradores = [], isLoading } = useQuery({
        queryKey: ["administradores", institucion.id], queryFn: () => getAdministradoresInstitucion(institucion.id),
        onError: (error) => { toast.error(`Error al cargar los administradores: ${error.message}`); },
    });


    //=========== EDITAR ==============================

    const { mutate: actualizarAdministradorMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateAdministrador,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['administradores'] });
                setOpenModal(false);
                toast.success("Administrador actualizado con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al actualizar el admin: ${error.message}`);
        },
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarAdministradorMutation } = useMutation({
        mutationFn: deleteAdministrador,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries(["administradores"]);
                toast.success("Administrador eliminado con éxito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al eliminar el administrador: ${error.message}`);
        },
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
