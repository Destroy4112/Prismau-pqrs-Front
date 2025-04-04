import { PrivateRoutes } from "../../../models/RoutesModel";

const GRAN_ADMIN_ITEMS = [
    { icono: "landmark", texto: "Instituciones", color: "gray", opacidad: '700', link: PrivateRoutes.INSTITUCIONES, activeSubroutes: [PrivateRoutes.INSTITUCION, PrivateRoutes.ADMINS] },
    { icono: "user-cog", texto: "Roles", color: "gray", opacidad: '700', link: PrivateRoutes.ROLES },
];

const ADMIN_ITEMS = [
    { icono: "envelope-open-text", texto: "Solicitudes", color: "gray", opacidad: '700', link: PrivateRoutes.SOLICITUDES, activeSubroutes: [PrivateRoutes.RESPUESTA] },
];

const CONSULTOR_ITEMS = [
    { icono: "envelope-open-text", texto: "Solicitudes", color: "gray", opacidad: '700', link: PrivateRoutes.SOLICITUDES_INSTITUCIONES, activeSubroutes: [PrivateRoutes.RESPUESTA_CONSULTOR] },
];

export function getMenuItemsByRole(role) {
    switch (role) {
        case "SuperAdmin":
            return GRAN_ADMIN_ITEMS;
        case "Administrador":
            return ADMIN_ITEMS;
        case "Consultor":
            return CONSULTOR_ITEMS;
        default:
            return CONSULTOR_ITEMS;
    }
}
