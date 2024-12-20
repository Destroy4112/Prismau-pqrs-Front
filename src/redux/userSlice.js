import { createSlice } from "@reduxjs/toolkit";
import { crearStorage, removerStorage, usarStorage } from "../utils/localstorage/localstorage";

const key = "@prismau_usuario";
const localStorage = usarStorage(key);

const userEmpty = {}

export const userSlice = createSlice({
    name: 'user',
    initialState: localStorage ? localStorage : userEmpty,
    reducers: {
        createUser: (state, action) => {
            crearStorage(key, action.payload)
            return action.payload
        },
        updateUser: (state, action) => {
            state.clave = action.payload
        },
        resetUser: () => {
            removerStorage(key);
            return userEmpty
        }
    },
})

export const { createUser, updateUser, resetUser } = userSlice.actions;
export default userSlice.reducer;