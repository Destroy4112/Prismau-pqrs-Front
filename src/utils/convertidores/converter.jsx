import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";

const zonaHoraria = 'America/Bogota';

export const normalizeText = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export const formatearFecha = (valor = null) => {
    if (!valor) return "-";
    const fecha = new Date(valor);
    if (isNaN(fecha.getTime())) return "-";
    const zonedDate = toZonedTime(fecha, zonaHoraria);
    return format(zonedDate, 'dd/MM/yyyy', { locale: es });
};

export const formatearFechaString = (valor) => {
    const zonedDate = toZonedTime(valor, zonaHoraria);
    return format(zonedDate, 'dd MMMM yyyy', { locale: es });
}

export const formatearFechaHora = (valor) => {
    const zonedDate = toZonedTime(valor, zonaHoraria);
    return format(zonedDate, 'dd MMMM yyyy hh:mm a', { locale: es });
}