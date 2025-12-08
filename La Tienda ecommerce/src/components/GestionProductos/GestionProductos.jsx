import { useState } from "react";
import { useProductoContext } from "../../context/ProductoContext";
import FormularioProducto from "../FormularioProducto/FormularioProducto";
import style from "./GestionProductos.module.css"

const GestionProductos = () => {

    const { productos, eliminarProducto } = useProductoContext();
    const [ formulario, setFormulario] = useState("agregar");
    const [ mostrarFormulario, setMostrarFormulario] = useState(false);
    const [ productoSeleccionado, setProductoSeleccionado] = useState(null);

    const agregarProductoFormulario = () => {
        console.log("Producto a agregar dentro de la funcion de GestionProductos.jsx:");
        setFormulario("agregar");
        setMostrarFormulario(true);
        setProductoSeleccionado(null);
    }

    const editarProductoFormulario = (producto) => {
        console.log("Producto a editar dentro de la funcion de GestionProductos.jsx:", producto);
        setFormulario("editar");
        setMostrarFormulario(true);
        setProductoSeleccionado(producto);
    }

    const cerrarFormulario = () => {
        setMostrarFormulario(false);
        setProductoSeleccionado(null);
    }

    const borradoProducto = (id) => {
        if (window.confirm("¿Desea eliminar el producto?")) {
            console.log("Producto a borrar dentro de la funcion de GestionProductos.jsx:", id);
            eliminarProducto(id);
            setMostrarFormulario(false);
            setProductoSeleccionado(null);
        }
    }

    return (
        <>
            <div class="container mt-5">
                <button className="btn btn-success" onClick={agregarProductoFormulario}>Agregar Producto</button>
                {formulario === "agregar" && mostrarFormulario && <FormularioProducto formulario={formulario} onCerrar={cerrarFormulario} />}
            </div>
            <div>
                {productos.map((productoLista) => (
                    <div key={productoLista.id} className={productoSeleccionado ? style.cardStyleSelected : style.card}>
                        <div className={style.cardStyle}>
                            <img src={productoLista.img} alt={productoLista.nombre} />
                            <h5 className="card-title">{productoLista.nombre}</h5>
                            <p className={style.precio}> ${parseFloat(productoLista.precio).toFixed(2)}</p>
                            <p className={style.descripcion}>Es producto destacado: {productoLista.destacado ? "Si" : "No"}</p>
                            <div className={style.cardBody}>
                                <button className="btn btn-primary" onClick={() => editarProductoFormulario(productoLista)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => borradoProducto(productoLista.id)}>Eliminar</button>
                            </div>
                        </div>
                        {formulario === "editar" && mostrarFormulario && productoSeleccionado.id === productoLista.id && <FormularioProducto formulario={formulario} productoIngresado={productoSeleccionado} onCerrar={cerrarFormulario} />}
                    </div>
                ))}
            </div>
        </>
    )
}

export default GestionProductos