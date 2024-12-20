import { PublicRoutes } from "../../models/RoutesModel";

export const TokenGuard = () => {
    localStorage.clear();
    window.location.assign(PublicRoutes.LOGIN);
}