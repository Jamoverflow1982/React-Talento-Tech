import { useState } from "react";
import style from "./FormularioProducto.module.css"
import { useProductoContext } from "../../context/ProductoContext";

const FormularioProducto = ({formulario="agregar", productoIngresado = {}, onCerrar}) => {

    console.log("Ingreso a Formulario de Producto en FormularioProducto.jsx");
    console.log("Producto ingresado:", productoIngresado);
    console.log("Tipo de Formulario elegido:", formulario);

    const { agregarProducto, editarProducto } = useProductoContext();
    const [producto, setProducto] = useState(productoIngresado);
    const [error, setError] = useState({});

    console.log("Producto:", producto);
    
    if (productoIngresado.id === producto.id) {
        console.log("Productos iguales");
    }else {
        console.log("Productos diferentes");
        setProducto(productoIngresado);
        console.log("Producto actualizado:", producto);
    }

    const manejarCambio = (evento) => {
        setProducto({...producto, [evento.target.name]: evento.target.value})
    }

    const validarFormulario = () => {
        const errores = {};

        if(!producto.nombre.trim()) {
            errores.nombre = 'El nombre del producto es obligatorio';
        }

        if(!producto.precio || producto.precio < 0) {
            errores.precio = 'El precio es obligatorio';
        }

        if(!producto.img.trim() || producto.img.length < 6) {
            errores.img = 'La imagen es obligatoria';
        }

        if(!producto.descripcion.trim() || producto.descripcion.length < 10) {
            errores.descripcion = 'La descripcion es obligatoria';
        }

        setError(errores);

        return Object.keys(errores).length === 0
    }

    const manejarSubmit = (evento) => {
        console.log(producto);
        evento.preventDefault();
        
        if (formulario == "agregar") {
            if(validarFormulario()) {
                agregarProducto(producto);
                onCerrar();
            }
        } else if (formulario == "editar") {
        if(validarFormulario()) {
            editarProducto(producto);
            onCerrar();
        }
        }
        setError({});
    }

    const manejarReset = () => {
        setProducto({
            nombre: '',
            precio: '',
            img: '',
            descripcion: ''
        });
        setError({});
    }

    return (
        <>
        <h1>{formulario==="agregar" ? "Formulario Agregar Producto" : "Formulario Edicion de Producto"}</h1>
        <form className={style.formulario} onSubmit={manejarSubmit} onReset={manejarReset}>
            <div className={style.input}>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" name="nombre" value={producto.nombre||""} onChange={manejarCambio} placeholder="Ingrese el nombre del producto" />
                {error.nombre && <p style={{ color : 'red' }}>{error.nombre}</p>}
            </div>
            <div className={style.input}>
                <label htmlFor="precio">Precio</label>
                <input type="number" name="precio" value={producto.precio||""} onChange={manejarCambio} placeholder="Ingrese el precio del producto" />
                {error.precio && <p style={{ color : 'red' }}>{error.precio}</p>}
            </div>
            <div className={style.input}>
                <label htmlFor="img">Imagen</label>
                <input type="text" name="img" value={producto.img||""} onChange={manejarCambio} placeholder="Ingrese la imagen del producto" />
                {error.img && <p style={{ color : 'red' }}>{error.img}</p>}
            </div>
            <div className={style.input}>
                <label htmlFor="descripcion">Descripcion</label>
                <input type="text" name="descripcion" value={producto.descripcion||""} onChange={manejarCambio} placeholder="Ingrese la descripcion del producto (minimo 10 caracteres)" />
                {error.descripcion && <p style={{ color : 'red' }}>{error.descripcion}</p>}
            </div>
            <div className={style.botones}>
                <button type="submit" class="btn btn-primary">{formulario==="agregar" ? "Agregar Producto" : "Actualizar Producto"}</button>
                {formulario==="agregar" && <button type="reset" class="btn btn-danger">Limpiar</button>}
                <button type="button" class="btn btn-secondary" onClick={onCerrar}>Cerrar</button>
            </div>
        </form>
        </>
    )
}

export default FormularioProducto