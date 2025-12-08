import style from "./Inicio.module.css"
import { useEffect, useState, useContext } from "react"
import TarjetaProducto from "../TarjetaProducto/TarjetaProducto"
import { useProductoContext } from "../../context/ProductoContext"
import { CarritoContext } from "../../context/CarritoContext"

const Inicio = () => {

    const [ productosDest, setProductosDest ] = useState([]);
    const { productos } = useProductoContext();
    const { agregarAlCarrito } = useContext(CarritoContext);

    useEffect(() => {
        const productosDestacados = productos.filter(producto => producto.destacado === "on");
        setProductosDest(productosDestacados);
    }, [productos]);

    console.log("Los productos destacados son: ", productosDest);
    

    return (
        <>
            <section className={style.inicio} class="container mt-5">
                <h1>Bienvenido a Emporium</h1>
                <h2>Nuestra Misión: Crear un Verdadero Emporium</h2>
                <p className={style.parrafo}>La palabra Emporium significa un gran centro de comercio. En la era digital, ese es nuestro objetivo: ser el único destino que necesitas. En lugar de especializarnos en una sola cosa, hemos decidido especializarnos en tu conveniencia. Hemos reunido una vasta y selecta colección de productos de todos los rubros, desde gadgets de última generación hasta artículos atemporales para el hogar. Cada producto en Emporium ha sido elegido por su calidad y valor, asegurando que cada compra sea una inversión inteligente. Queremos que encuentres, sin esfuerzo, todo lo que deseas y necesitas.</p>
            </section>
            <section className={style.destacados}>
                <h2>Productos Destacados</h2>
                <div id="carouselExampleInterval" className="carousel carousel-dark slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {productosDest.map(producto =>
                            <div className={productosDest.indexOf(producto) === 0 ? "carousel-item active" : "carousel-item"} data-bs-interval="3000" key={producto.id}>
                                    <div><p>{producto.nombre}</p></div>
                                    <div><img src={producto.img} alt={producto.nombre}></img></div>
                                    <div><p className={style.precio}>${parseFloat(producto.precio).toFixed(2)}</p></div>
                                    <div><button type="button" class="btn btn-warning" onClick={() => {agregarAlCarrito(producto)}}>Agregar al Carrito</button></div>
                            </div>
                        )}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>
        </>
    )
}

export default Inicio