import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRoutes } from '../../models/RoutesModel';

export const VerifyGuard = () => {
    const usuario = useSelector((state) => state.user);

    return usuario.nombres ? <Navigate replace to={PrivateRoutes.DASHBOARD} /> : <Outlet />;
};
