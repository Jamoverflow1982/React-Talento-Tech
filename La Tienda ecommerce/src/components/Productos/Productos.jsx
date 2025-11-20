import { useEffect, useState } from 'react'
import TarjetaProducto from '../TarjetaProducto/TarjetaProducto'
import style from "./Productos.module.css"
const Productos = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('https://68ddf55ad7b591b4b78e014a.mockapi.io/articulos')
        .then(res => res.json())
        .then(data => setProductos(data))
        .catch(error => console.log(error))
    }, [])

    if (!productos) {
        return <p>Cargando productos...</p>;
    }
    
    return (
        <div className={style.productos}>
            {
                productos.map(producto => (
                    <div key={producto.id}><TarjetaProducto id={producto.id} nombre={producto.nombre} precio={producto.precio} img={producto.img} /></div>
                ))
            }
        </div>
    )
}

export default Productos