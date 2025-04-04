import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../../hooks/useStore';
import { PrivateRoutes, PublicRoutes } from '../../../models/RoutesModel';
import { createAcceso, resetAcceso } from '../../../redux/credencialesSlice';
import { createInstitucion, resetInstitucion } from '../../../redux/institucionSlice';
import { createUser, resetUser } from '../../../redux/userSlice';
import { alertError, alertWarning } from '../../../utils/alerts/alertas.utility';
import { crearStorage, removerStorage } from '../../../utils/localstorage/localstorage';
import useQueryLogin from '../api/useQueryLogin';

export default function useLogin() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isPending: loading, loginMutation } = useQueryLogin();

    const [visible, setVisible] = useState(false);
    const [usuario, setUsuario] = useState({
        usuario: "",
        password: ""
    });

    const handleChange = ({ target }) => {
        setUsuario({ ...usuario, [target.name]: target.value });
    };

    const toggleVisible = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        loginMutation(usuario, {
            onSuccess: (data) => {
                if (!data.status) {
                    setUsuario({ usuario: "", password: "" })
                    data.errors.forEach(err => { alertWarning(err); })
                } else {
                    crearStorage("@prismau_token", data.token);
                    dispatch(createUser(data.usuario));
                    dispatch(createAcceso(data.credenciales));
                    dispatch(createInstitucion(data.institucion));
                    navigate(PrivateRoutes.DASHBOARD, { replace: true });
                }
            },
            onError: (error) => { alertError(error.message); }
        });
    };

    const logout = useCallback((e) => {
        e.preventDefault();
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
    }, []);

    return {
        loading,
        usuario,
        visible,
        toggleVisible,
        handleSubmit,
        handleChange,
        logout,
    };
}