import React from 'react'
import style from "./TarjetaProducto.module.css"
import { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { CarritoContext } from '../../context/CarritoContext'
import { useNavigate } from 'react-router-dom'
const TarjetaProducto = ({id, nombre, precio, img }) => {

    const navigate = useNavigate();

    const { agregarAlCarrito } = useContext(CarritoContext);

    const producto = {id, nombre, precio, img};
    
    return (
        <div className={style.card}>
            <img src={img} alt={nombre} />
            <div className={style.cardBody}>
                <h5 className="card-title">{nombre}</h5>
                <p className={style.precio}>${parseFloat(precio).toFixed(2)}</p>
                <Button type="button" className="btn btn-info" onClick={() => navigate(`/Productos/${id}`)}>Detalles</Button>
                <div className={style.botonesCompra}>
                    <Button type="button" className="btn btn-primary" onClick={() => alert("El producto " + nombre + " fue comprado")}>Comprar</Button>
                    <Button type="button" className="btn btn-warning" onClick={() => {agregarAlCarrito(producto)}}>Agregar al Carrito</Button>
                </div>
            </div>
        </div>
    )
}

export default TarjetaProducto