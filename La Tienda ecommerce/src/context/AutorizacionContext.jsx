//Contexto de autorización de usuario. Creando un hook personalizado

import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useUsuario } from "./UsuarioContext";

export const AutorizacionContext = createContext();

export const AutorizacionProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(null);
    const [usuarioNom, setUsuarioNom] = useState(null);

    const { setUsuarioLog } = useUsuario();

    const login = (nombreUsuario, usuarioLlama) => {
        const token = `fake-token-${nombreUsuario}`;
        localStorage.setItem('token', token);
        setUsuario(nombreUsuario);
        setUsuarioNom(usuarioLlama);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUsuario(null);
        setUsuarioLog(null);
    }

    return (
        <AutorizacionContext.Provider value={{ usuario, login, logout, usuarioNom }} >
            {children}
        </AutorizacionContext.Provider>
    );
};

export const useAutorizacion = () => useContext(AutorizacionContext);