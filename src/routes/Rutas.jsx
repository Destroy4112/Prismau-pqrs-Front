import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlantillaInstitucion from '../components/granAdmin/instituciones/PlantillaInstitucion';
import Plantilla from '../components/layouts/Plantilla';
import { PrivateRoutes, PublicRoutes } from '../models/RoutesModel';
import RespuestasPage from '../pages/admins/solicitudes/RespuestasPage';
import SolicitudesPage from '../pages/admins/solicitudes/SolicitudesPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import AdministradoresPage from '../pages/granAdmin/admins/AdministradoresPage';
import ConsultoresPage from '../pages/granAdmin/consultores/ConsultoresPage';
import InstitucionesPage from '../pages/granAdmin/instituciones/InstitucionesPage';
import InstitucionPage from '../pages/granAdmin/instituciones/InstitucionPage';
import PersonalPage from '../pages/granAdmin/personal/PersonalPage';
import RolesPage from '../pages/granAdmin/roles/RolesPage';
import LoginPage from '../pages/login/LoginPage';
import AuthGuard from '../utils/guards/AuthGuard';
import { VerifyGuard } from '../utils/guards/VerifyGuard';

const Rutas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<VerifyGuard />}>
                    <Route element={<LoginPage />} path={PublicRoutes.LOGIN} />
                </Route>
                <Route element={<AuthGuard />}>
                    <Route element={<Plantilla />}>
                        <Route element={<DashboardPage />} path={PrivateRoutes.DASHBOARD} />
                        <Route element={<InstitucionesPage />} path={PrivateRoutes.INSTITUCIONES} />
                        <Route element={<PlantillaInstitucion />} path={PrivateRoutes.INSTITUCION}>
                            <Route index element={<InstitucionPage />} />
                            <Route element={<AdministradoresPage />} path={PrivateRoutes.ADMINS} />
                            <Route element={<ConsultoresPage />} path={PrivateRoutes.CONSULTORES} />
                            <Route element={<PersonalPage />} path={PrivateRoutes.PERSONAL} />
                        </Route>
                        <Route element={<RolesPage />} path={PrivateRoutes.ROLES} />
                        <Route element={<SolicitudesPage />} path={PrivateRoutes.SOLICITUDES} />
                        <Route element={<RespuestasPage />} path={PrivateRoutes.RESPUESTA} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Rutas;