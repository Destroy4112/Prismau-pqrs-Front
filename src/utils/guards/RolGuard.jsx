import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PrivateRoutes } from "../../models/RutasModel";

const prohibido = <Navigate replace to={PrivateRoutes.PAGE403} />;

export const SuperadminGuard = () => {
    const rol = useSelector((state) => state.credenciales.Rol);
    return rol == 0 ? <Outlet /> : prohibido;
}

export const AdminGuard = () => {
    const rol = useSelector((state) => state.credenciales.Rol);
    return (rol == 1 || rol == 0) ? <Outlet /> : prohibido;
}

export const SocioGuard = () => {
    const rol = useSelector((state) => state.credenciales.Rol);
    return rol == 2 || rol == 3 ? <Outlet /> : prohibido;
}

