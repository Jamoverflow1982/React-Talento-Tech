import { createContext, useEffect, useState } from "react";

export const AlertaContext = createContext();

export const AlertaProvider = ({ children }) => {
    
    const [MensajeAlerta, setMensajeAlerta] = useState(null);

    const mostrarAlerta = (mensaje) => {setMensajeAlerta(mensaje);};

    const ocultarAlerta = () => {setMensajeAlerta(null);};

    useEffect(() => {
        if (MensajeAlerta) {
            
            const timer = setTimeout(() => {
                setMensajeAlerta(null);
            }, 2000);
            
            return () => clearTimeout(timer);
        }
    }, [MensajeAlerta]);
    
    return (
        <AlertaContext.Provider value={{MensajeAlerta, mostrarAlerta, ocultarAlerta}}>
            {children}
        </AlertaContext.Provider>
    );
}
