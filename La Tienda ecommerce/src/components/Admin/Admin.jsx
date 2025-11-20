import FormularioProducto from "../FormularioProducto/FormularioProducto"
import { useContext } from "react"
import { AlertaContext } from "../../context/AlertaContext"
import GestionProductos from "../GestionProductos/GestionProductos"

const Admin = () => {
    return (
        <GestionProductos />
    )
}

export default Admin