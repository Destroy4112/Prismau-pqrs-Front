import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { PrivateRoutes, PublicRoutes } from '../models/RoutesModel';
import { createAcceso, resetAcceso } from '../redux/credencialesSlice';
import { createInstitucion, resetInstitucion } from '../redux/institucionSlice';
import { createUser, resetUser } from '../redux/userSlice';
import { validarSesion } from '../service/AuthService';
import { crearStorage, removerStorage } from '../utils/localstorage/localstorage';

function useLogin() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [openAside, setOpenAside] = useState(false);
    const [openNav, setOpenNav] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [usuario, setUsuario] = useState({
        usuario: "",
        password: ""
    });

    const handleChange = ({ target }) => {
        setUsuario({
            ...usuario,
            [target.name]: target.value
        });
    };

    const toggleAside = useCallback(() => {
        setOpenAside((prevOpenAside) => !prevOpenAside);
        setOpenNav(false);
    }, []);

    const toggleNav = useCallback(() => {
        setOpenNav((prevOpenNav) => !prevOpenNav);
        setOpenAside(false);
    }, []);

    const toggleVisible = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const resultado = await validarSesion(usuario);
            if (!resultado.status) {
                setUsuario({ usuario: "", password: "" })
                resultado.errors.forEach(err => {
                    toast.warn(err);
                })
            } else {
                crearStorage("@prismau_token", resultado.token);
                dispatch(createUser(resultado.usuario));
                dispatch(createAcceso(resultado.credenciales));
                dispatch(createInstitucion(resultado.institucion));
                navigate(PrivateRoutes.DASHBOARD, { replace: true });
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = useCallback((e) => {
        e.preventDefault();
        toggleNav();
        Swal.fire({
            title: '¿Quiere cerrar la sesión actual?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, salir!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                removerStorage("@prismau_token");
                dispatch(resetUser());
                dispatch(resetAcceso());
                dispatch(resetInstitucion());
                navigate(PublicRoutes.LOGIN, { replace: true });
            }
        })
    }, [toggleNav]);

    return {
        openNav,
        openAside,
        loading,
        usuario,
        visible,
        toggleVisible,
        handleSubmit,
        handleChange,
        logout,
        toggleNav,
        toggleAside
    };
}

export default useLogin;