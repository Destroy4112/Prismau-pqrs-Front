import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import Sidebar from "./aside/Sidebar";
import ContainerContenido from "./content/ContainerContenido";
import Navbar from "./nav/Navbar";

function Plantilla() {

    const usuario = useSelector((state) => state.user);
    const credenciales = useSelector((state) => state.credenciales);
    const { openAside, openNav, toggleAside, toggleNav, logout } = useLogin();

    return (
        <>
            <Navbar toggleAside={toggleAside} toggleNav={toggleNav} open={openNav} logout={logout}
                credenciales={credenciales} usuario={usuario} />
            <Sidebar open={openAside} />
            <ContainerContenido>
                <Outlet />
            </ContainerContenido>
        </>
    );
}

export default React.memo(Plantilla);