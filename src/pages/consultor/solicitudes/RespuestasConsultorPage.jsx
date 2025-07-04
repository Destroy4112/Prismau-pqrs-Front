import { useLocation } from "react-router-dom";
import Contenido from "../../../components/helpers/Contenido";
import TituloPage from "../../../components/helpers/TituloPage";
import { useAppSelector } from "../../../hooks/useStore";
import apiQueryPersonal from "../../granAdmin/personal/api/apiQueryPersonal";
import FormRespuestas from "./components/FormRespuestas";
import FormRespuestasConsultor from "./components/FormRespuestasConsultor";
import useSolicitud from "./hooks/useSolicitud";

export default function RespuestasConsultorPage() {

    const { personas } = apiQueryPersonal();
    const { state } = useLocation();
    const soli = state?.solicitud || {};
    const rol = useAppSelector((state) => state.credenciales.rol);
    const { solicitud, fileUrl, puedeResponder, loading, loadingAsignar, loadingPrioridad,fileRespuestaUrl,
        changePrioridad, asignarPersona, handleCheckboxChange, responder, handleChange, handleChangeFile } = useSolicitud(soli);

    return (
        <>
            <TituloPage titulo={"Detalle de la solicitud"} />
            <Contenido>
                {rol === "Persona" ?
                    <FormRespuestas
                        solicitud={solicitud}
                        handleChange={handleChange}
                        handleChangeFile={handleChangeFile}
                        fileUrl={fileUrl}
                        fileRespuestaUrl={fileRespuestaUrl}
                        loading={loading}
                        responder={responder}
                    /> :
                    <FormRespuestasConsultor
                        solicitud={solicitud}
                        personas={personas}
                        handleChange={handleChange}
                        handleChangeFile={handleChangeFile}
                        asignar={asignarPersona}
                        responder={responder}
                        handleChangeCheckbox={handleCheckboxChange}
                        loading={loading}
                        puedeResponder={puedeResponder}
                        changePrioridad={changePrioridad}
                        loadingPrioridad={loadingPrioridad}
                        loadingAsignar={loadingAsignar}
                        fileUrl={fileUrl}
                        fileRespuestaUrl={fileRespuestaUrl}
                    />
                }
            </Contenido>
        </>
    );
}
