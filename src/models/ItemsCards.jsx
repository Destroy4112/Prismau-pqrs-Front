import apiQueryCantidad from "../api/apiQueryCantidad";

const GRAN_ADMIN_CARDS = (roles, instituciones) => [
    { color: "pink-500", cantidad: instituciones, titulo: "Instituciones", icono: "landmark" },
    { color: "green-500", cantidad: roles, titulo: "Roles", icono: "user-cog" },
];

const SUPER_ADMIN_CARDS = () => [
]

const ADMIN_CARDS = (solicitudes) => [
    { color: "green-500", cantidad: solicitudes, titulo: "Solicitudes", icono: "envelope-open-text" },
]

const CONSULTOR_CARDS = (solicitudes, pendiente, enProceso, cerrada) => [
    { color: "green-500", cantidad: solicitudes, titulo: "Solicitudes", icono: "envelope-open-text", },
    { color: "yellow-400", cantidad: pendiente, titulo: "Pendientes", icono: "clock", },
    { color: "blue-500", cantidad: enProceso, titulo: "En proceso", icono: "hourglass-end" },
    { color: "green-500", cantidad: cerrada, titulo: "Cerradas", icono: "check" },
]

const PERSONA_CARDS = (solicitudes) => [
    { color: "green-500", cantidad: solicitudes, titulo: "Solicitudes", icono: "envelope-open-text" },
]

export function getCardsByRole(role) {

    const { contRoles, ContInstituciones, contSolicitudes, solicitudesCerradas, solicitudesEnProceso, solicitudesPendientes
    } = apiQueryCantidad();

    switch (role) {
        case 1:
            return GRAN_ADMIN_CARDS(contRoles, ContInstituciones);
        case 2:
            return SUPER_ADMIN_CARDS();
        case 3:
            return ADMIN_CARDS(contSolicitudes);
        case 4:
            return CONSULTOR_CARDS(contSolicitudes, solicitudesPendientes, solicitudesEnProceso, solicitudesCerradas);
        case 5:
            return PERSONA_CARDS(contSolicitudes);
        default:
            return null;
    }
}