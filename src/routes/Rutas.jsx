import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Plantilla from '../components/layouts/Plantilla';
import { HelpRoutes, PrivateRoutes, PublicRoutes } from '../models/RoutesModel';
import RespuestasPage from '../pages/admins/solicitudes/RespuestasPage';
import SolicitudesPage from '../pages/admins/solicitudes/SolicitudesPage';
import RespuestasConsultorPage from '../pages/consultor/solicitudes/RespuestasConsultorPage';
import SolicitudesConsultorPage from '../pages/consultor/solicitudes/SolicitudesConsultorPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import Page403 from '../pages/errors/Page403';
import AdministradoresPage from '../pages/granAdmin/admins/AdministradoresPage';
import ConsultoresPage from '../pages/granAdmin/consultores/ConsultoresPage';
import PlantillaInstitucion from '../pages/granAdmin/instituciones/components/PlantillaInstitucion';
import InstitucionesPage from '../pages/granAdmin/instituciones/InstitucionesPage';
import InstitucionPage from '../pages/granAdmin/instituciones/InstitucionPage';
import PersonalPage from '../pages/granAdmin/personal/PersonalPage';
import RolesPage from '../pages/granAdmin/roles/RolesPage';
import LoginPage from '../pages/login/LoginPage';
import AuthGuard from '../utils/guards/AuthGuard';
import { AdminGuard, ConsultorGuard, SuperadminGuard } from '../utils/guards/RolGuard';
import { VerifyGuard } from '../utils/guards/VerifyGuard';
import Page404 from '../pages/errors/Page404';

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
                        <Route element={<SuperadminGuard />}>
                            <Route element={<InstitucionesPage />} path={PrivateRoutes.INSTITUCIONES} />
                            <Route element={<PlantillaInstitucion />} path={PrivateRoutes.INSTITUCION}>
                                <Route index element={<InstitucionPage />} />
                                <Route element={<AdministradoresPage />} path={PrivateRoutes.ADMINS} />
                                <Route element={<ConsultoresPage />} path={PrivateRoutes.CONSULTORES} />
                                <Route element={<PersonalPage />} path={PrivateRoutes.PERSONAL} />
                            </Route>
                            <Route element={<RolesPage />} path={PrivateRoutes.ROLES} />
                        </Route>
                        <Route element={<AdminGuard />}>
                            <Route element={<SolicitudesPage />} path={PrivateRoutes.SOLICITUDES} />
                            <Route element={<RespuestasPage />} path={PrivateRoutes.RESPUESTA} />
                        </Route>
                        <Route element={<ConsultorGuard />}>
                            <Route element={<SolicitudesConsultorPage />} path={PrivateRoutes.SOLICITUDES_INSTITUCIONES} />
                            <Route element={<RespuestasConsultorPage />} path={PrivateRoutes.RESPUESTA_CONSULTOR} />
                        </Route>
                    </Route>
                    <Route element={<Page403 />} path={HelpRoutes.PAGE403} />
                    <Route element={<Page404 />} path="*" />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Rutas;