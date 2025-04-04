import { useAppMutation } from "../../../hooks/useStore";
import { iniciarSesion } from "./login.service";

export default function useQueryLogin() {

    const { mutate: loginMutation, isPending } = useAppMutation({
        mutationFn: iniciarSesion,
    });

    return {
        isPending,
        loginMutation
    }
}
