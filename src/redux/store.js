import { configureStore } from "@reduxjs/toolkit";
import credencialesSlice from "./credencialesSlice";
import institucionSlice from "./institucionSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        credenciales: credencialesSlice,
        institucion: institucionSlice,
    },
});