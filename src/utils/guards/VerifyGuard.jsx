import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from "../../hooks/useStore";
import { PrivateRoutes } from '../../models/RoutesModel';

export const VerifyGuard = () => {
    const usuario = useAppSelector((state) => state.user);
    return usuario.nombres ? <Navigate replace to={PrivateRoutes.DASHBOARD} /> : <Outlet />;
};
