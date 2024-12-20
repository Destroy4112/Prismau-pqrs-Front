import { createSlice } from "@reduxjs/toolkit";
import { crearStorage, removerStorage, usarStorage } from "../utils/localstorage/localstorage";

const key = "@prismau_institucion";
const localStorage = usarStorage(key);

const instituteEmpty = {}

export const institucionSlice = createSlice({
    name: 'institucion',
    initialState: localStorage ? localStorage : instituteEmpty,
    reducers: {
        createInstitucion: (state, action) => {
            crearStorage(key, action.payload)
            return action.payload
        },
        resetInstitucion: () => {
            removerStorage(key);
            return instituteEmpty
        }
    },
})

export const { createInstitucion, resetInstitucion } = institucionSlice.actions;
export default institucionSlice.reducer;