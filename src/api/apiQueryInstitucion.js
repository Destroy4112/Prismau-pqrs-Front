import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createInstitucion, deleteInstitucion, getInstituciones, updateInstitucion, updateLogoInstitucion } from "../service/InstitucionesService";

export default function apiQueryInstitucion(setOpenModal, setOpenModalImagen) {

    const queryClient = useQueryClient();

    //=========== CREAR ==============================

    const { mutate: createInstitucionMutation, isPending: isCreating } = useMutation({
        mutationFn: createInstitucion,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['instituciones'] });
                setOpenModal(false);
                toast.success("Institucion creada con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al crear institucion: ${error.message}`);
        }
    });

    //=========== CONSULTAR ==========================

    const { data: instituciones = [], isLoading } = useQuery({
        queryKey: ["instituciones"], queryFn: getInstituciones,
        onError: (error) => { toast.error(`Error al cargar instituciones: ${error.message}`); },
    });


    //=========== EDITAR ==============================

    const { mutate: actualizarInstitucionMutation, isPending: isUpdating } = useMutation({
        mutationFn: updateInstitucion,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries({ queryKey: ['instituciones'] });
                setOpenModal(false);
                toast.success("Institucion actualizada con exito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al actualizar institución: ${error.message}`);
        },
    });

    //=========== ACTUALIZAR LOGO ==============================

    const { mutate: actualizarLogoMutation, isPending: isUpdatingLogo } = useMutation({
        mutationFn: ({ logo, id }) => updateLogoInstitucion(logo, id),
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries(["instituciones"]);
                setOpenModalImagen(false);
                toast.success("Logo actualizado con éxito");
            } else {
                data.errors.forEach(err => {
                    toast.warn(err);
                });
            }
        },
        onError: (error) => {
            toast.error(`Error al actualizar logo: ${error.message}`);
        },
    });

    //=========== ELIMINAR ==============================

    const { mutate: eliminarInstitucion } = useMutation({
        mutationFn: deleteInstitucion,
        onSuccess: (data) => {
            if (data.status) {
                queryClient.invalidateQueries(["instituciones"]);
                toast.success("Institución eliminada con éxito");
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
