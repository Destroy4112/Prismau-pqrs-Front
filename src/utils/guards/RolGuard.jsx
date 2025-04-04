import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import { HelpRoutes } from "../../models/RoutesModel";

const prohibido = <Navigate replace to={HelpRoutes.PAGE403} />;

export const SuperadminGuard = () => {
    const rol = useAppSelector((state) => state.credenciales.rol);
    return rol === "SuperAdmin" ? <Outlet /> : prohibido;
}

export const AdminGuard = () => {
    const rol = useAppSelector((state) => state.credenciales.rol);
    return (rol === "Administrador") ? <Outlet /> : prohibido;
}

export const ConsultorGuard = () => {
    const rol = useAppSelector((state) => state.credenciales.rol);
    return (rol === "Persona" || rol === "Consultor") ? <Outlet /> : prohibido;
}