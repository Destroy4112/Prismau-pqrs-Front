import { PrivateRoutes } from "./RoutesModel";

const GRAN_ADMIN_ITEMS = [
    { icono: "landmark", texto: "Instituciones", color: "gray", opacidad: '700', link: PrivateRoutes.INSTITUCIONES, activeSubroutes: [PrivateRoutes.INSTITUCION, PrivateRoutes.ADMINS] },
    { icono: "user-cog", texto: "Roles", color: "gray", opacidad: '700', link: PrivateRoutes.ROLES },
];

const ADMIN_ITEMS = [
    { icono: "envelope-open-text", texto: "Solicitudes", color: "gray", opacidad: '700', link: PrivateRoutes.SOLICITUDES, activeSubroutes: [PrivateRoutes.RESPUESTA] },
];

export function getMenuItemsByRole(role) {
    switch (role) {
        case 1:
            return GRAN_ADMIN_ITEMS;
        default:
            return ADMIN_ITEMS;
    }
}
