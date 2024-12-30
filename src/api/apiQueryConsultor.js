import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createConsultor, deleteConsultor, getConsultores, updateConsultor } from "../service/ConsultoresService";

export default function apiQueryConsultor(setOpenModal) {

    const queryClient = useQueryClient();

    //=========== CREAR ==============================

    const { mutate: createConsultorMutation, isPending: isCreating } = useMutation({
        mutationFn: createConsultor,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['Consultores'] });
                setOpenModal(false);
                toast.success("Consultor creado con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al crear el Consultor: ${error.message}`);
        }
    });

    //=========== CONSULTAR ==========================

    const { data: consultores = [], isLoading } = useQuery({
        queryKey: ["Consultores"], queryFn: getConsultores,
        onError: (error) => {
            toast.error(`Error al cargar los Consultores: ${error.message}`); console.log(error);
        },
    });


    //=========== EDITAR ==============================

    const { mutate: actualizarConsultorMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateConsultor,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['Consultores'] });
                setOpenModal(false);
                toast.success("Consultor actualizado con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al actualizar el consultor: ${error.message}`);
        },
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarConsultorMutation } = useMutation({
        mutationFn: deleteConsultor,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries(["Consultores"]);
                toast.success("Consultor eliminado con éxito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al eliminar el Consultor: ${error.message}`);
        },
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
