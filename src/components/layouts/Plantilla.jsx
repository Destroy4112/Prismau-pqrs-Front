import { initFlowbite } from "flowbite";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/useStore";
import useLogin from "../../pages/login/hooks/useLogin";
import Sidebar from "./aside/Sidebar";
import ContainerContenido from "./content/ContainerContenido";
import Navbar from "./nav/Navbar";

function Plantilla() {

    const usuario = useAppSelector((state) => state.user);
    const credenciales = useAppSelector((state) => state.credenciales);
    const { logout } = useLogin();
    useEffect(() => { initFlowbite(); }, []);

    return (
        <>
            <Navbar logout={logout} credenciales={credenciales} usuario={usuario} />
            <Sidebar usuario={usuario} rol={credenciales.rol} />
            <ContainerContenido>
                <Outlet />
            </ContainerContenido>
        </>
    );
}

export default React.memo(Plantilla);