import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPersona, deletePersona, getPersonas, updatePersona } from "../service/PersonaService";

export default function apiQueryPersonal(setOpenModal) {

    const queryClient = useQueryClient();

    //=========== CREAR ==============================

    const { mutate: createPersonalMutation, isPending: isCreating } = useMutation({
        mutationFn: createPersona,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['personas'] });
                setOpenModal(false);
                toast.success("Usuario creado con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => { toast.error(`Error al crear el usuario: ${error.message}`); }
    });

    //=========== CONSULTAR ==========================

    const { data: personas = [], isLoading } = useQuery({
        queryKey: ["personas"], queryFn: getPersonas,
        onError: (error) => { toast.error(`Error al cargar los personas: ${error.message}`); console.log(error); },
    });


    //=========== EDITAR ==============================

    const { mutate: actualizarPersonalMutation, isPending: isUpdating } = useMutation({
        mutationFn: updatePersona,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['personas'] });
                setOpenModal(false);
                toast.success("Usuario actualizado con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => { toast.error(`Error al actualizar el Personal: ${error.message}`) },
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarPersonalMutation } = useMutation({
        mutationFn: deletePersona,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries(["personas"]);
                toast.success("Usuario eliminado con éxito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al eliminar el Usuario: ${error.message}`);
        },
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
