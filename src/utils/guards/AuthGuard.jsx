import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../../models/RoutesModel";
import { useAppSelector } from "../../hooks/useStore";

export const AuthGuard = () => {
    const usuario = useAppSelector((state) => state.user);
    return usuario.nombres ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
}

export default AuthGuard;