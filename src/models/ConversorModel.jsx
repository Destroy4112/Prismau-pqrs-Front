import { format } from "date-fns";
import { es } from "date-fns/locale";

export const fechaNumero = (date) => {
    return format(new Date(date), 'dd/MM/yyyy', { locale: es });
}