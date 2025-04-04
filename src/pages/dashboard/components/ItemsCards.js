import apiQueryCantidad from "../api/apiQueryCantidad";

const SUPER_ADMIN_CARDS = (instituciones) => [
    { color: "pink-500", cantidad: instituciones, titulo: "Instituciones", icono: "landmark" },
    { color: "green-500", cantidad: 4, titulo: "Roles", icono: "user-cog" },
];

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

    const { ContInstituciones, contSolicitudes, solicitudesCerradas, solicitudesEnProceso, solicitudesPendientes
    } = apiQueryCantidad();

    switch (role) {
        case "SuperAdmin":
            return SUPER_ADMIN_CARDS(ContInstituciones);
        case "Administrador":
            return ADMIN_CARDS(contSolicitudes);
        case "Consultor":
            return CONSULTOR_CARDS(contSolicitudes, solicitudesPendientes, solicitudesEnProceso, solicitudesCerradas);
        case "Persona":
            return PERSONA_CARDS(contSolicitudes);
        default:
            return null;
    }
}