import style from "./Inicio.module.css"
import { useEffect, useState } from "react"
import TarjetaProducto from "../TarjetaProducto/TarjetaProducto"

const Inicio = () => {

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch('https://68ddf55ad7b591b4b78e014a.mockapi.io/articulos')
        .then(res => res.json())
        .then(data => setProductos(data))
    }, [])

    return (
        <>
            <section className={style.inicio} class="container mt-5">
                <h1>Bienvenido a Emporium</h1>
                <h2>Nuestra Misión: Crear un Verdadero Emporium</h2>
                <p className={style.parrafo}>La palabra Emporium significa un gran centro de comercio. En la era digital, ese es nuestro objetivo: ser el único destino que necesitas. En lugar de especializarnos en una sola cosa, hemos decidido especializarnos en tu conveniencia. Hemos reunido una vasta y selecta colección de productos de todos los rubros, desde gadgets de última generación hasta artículos atemporales para el hogar. Cada producto en Emporium ha sido elegido por su calidad y valor, asegurando que cada compra sea una inversión inteligente. Queremos que encuentres, sin esfuerzo, todo lo que deseas y necesitas.</p>
            </section>
        </>
    )
}

export default Inicio