import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { PublicRoutes } from "../../models/RoutesModel";

export const AuthGuard = () => {
    const usuario = useSelector((state) => state.user);
    return usuario.nombres ? <Outlet /> : <Navigate replace to={PublicRoutes.LOGIN} />;
}

export default AuthGuard;