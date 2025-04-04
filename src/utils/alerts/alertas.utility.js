import { toast } from 'react-toastify';

export const alertSucces = (text) => {
    toast.success(text);
}

export const alertError = (text) => {
    toast.error(text);
}

export const alertWarning = (text) => {
    toast.warn(text);
}