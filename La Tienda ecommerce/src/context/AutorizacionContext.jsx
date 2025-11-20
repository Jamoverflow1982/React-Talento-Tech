//Contexto de autorización de usuario. Creando un hook personalizado

import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";

export const AutorizacionContext = createContext();

export const AutorizacionProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null);

    const login = (nombreUsuario) => {
        const token = `fake-token-${nombreUsuario}`;
        localStorage.setItem('token', token);
        setUsuario(nombreUsuario);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
    }

    return (
        <AutorizacionContext.Provider value={{ usuario, login, logout }} >
            {children}
        </AutorizacionContext.Provider>
    );
};

export const useAutorizacion = () => useContext(AutorizacionContext);