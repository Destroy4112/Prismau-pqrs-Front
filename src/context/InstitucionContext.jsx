import { createContext, useContext, useEffect, useState } from "react";

export const InstitucionContext = createContext();

export const useInstitucionContext = () => useContext(InstitucionContext);

export const InstitucionProvider = ({ children }) => {

    const [institucion, setInstitucion] = useState(() => {
        const storedInstitucion = localStorage.getItem('@prismau_institucion');
        return storedInstitucion ? JSON.parse(storedInstitucion) : null;
    });

    useEffect(() => {
        if (institucion) {
            localStorage.setItem('@prismau_institucion', JSON.stringify(institucion));
        } else {
            localStorage.removeItem('@prismau_institucion');
        }
    }, [institucion]);

    return (
        <InstitucionContext.Provider value={{ institucion, setInstitucion }}>
            {children}
        </InstitucionContext.Provider>
    );
}
