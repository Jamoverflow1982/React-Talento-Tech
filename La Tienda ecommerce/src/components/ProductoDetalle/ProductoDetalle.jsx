import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./ProductoDetalle.module.css";
import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Alert, Modal } from "react-bootstrap";

const ProductoDetalle = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    const { agregarAlCarrito } = useContext(CarritoContext);

    useEffect(() => {
        fetch(`https://68ddf55ad7b591b4b78e014a.mockapi.io/articulos/${id}`)
        .then(res => res.json())
        .then(data => setProducto(data))
    }, [id])

    if (!producto) {
        return <p>Cargando producto...</p>;
    }

    console.log(producto);

    const productoCarrito = {id: producto.id, nombre: producto.nombre, precio: producto.precio, img: producto.img};

    return (
        <div>
            <h2>Descripcion del Producto</h2>
            <br />
            <p className={style.titulo}>{producto.nombre}</p>
            <p className={style.precio}>${parseFloat(producto.precio).toFixed(2)}</p>
            <img src={producto.img} alt={producto.nombre} />
            <p className={style.descripcion}>{producto.descripcion}</p>
            <div className={style.botonesCompra}>
                <Link to = "/Productos" className="btn btn-info">Volver</Link>
                <button type="button" className="btn btn-primary" onClick={() => alert("El producto " + producto.nombre + " fue comprado")}>Comprar</button>
                <button type="button" className="btn btn-warning" onClick={() => {agregarAlCarrito(productoCarrito); /*alert("El producto " + producto.title + " fue agregado al carrito")*/}}>Agregar al Carrito</button>
            </div>
        </div>
    );
};

export default ProductoDetalle;