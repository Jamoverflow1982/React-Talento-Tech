import { useState, useContext, createContext } from "react";

const BuscarContext = createContext();

export const BuscarProvider = ({children}) => {

    const [busqueda, setBusqueda] = useState('');

    return (
        <BuscarContext.Provider value={{busqueda, setBusqueda}} >
            {children}
        </BuscarContext.Provider>
    );
}

export const useBuscar = () => useContext(BuscarContext);

