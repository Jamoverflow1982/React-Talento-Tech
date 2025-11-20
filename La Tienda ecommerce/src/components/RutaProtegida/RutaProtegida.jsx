import {Navigate} from "react-router-dom";
import { useAutorizacion } from "../../context/AutorizacionContext";
import { AlertaContext } from "../../context/AlertaContext";
import { useContext } from "react";

const RutaProtegida = ({pagina, children}) => {

    const {usuario} = useAutorizacion();

    const estaAutenticado = usuario !== null;

    const {mostrarAlerta} = useContext(AlertaContext);

    if (!estaAutenticado) {
        console.log('Ruta protegida no autorizada');
        mostrarAlerta('Inicie sesion para acceder al ' + pagina);
        return <Navigate to="/login" replace/>;
    }
    return children
    }

export default RutaProtegida