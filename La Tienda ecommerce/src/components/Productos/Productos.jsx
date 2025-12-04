import { useContext, useEffect, useState } from 'react'
import TarjetaProducto from '../TarjetaProducto/TarjetaProducto'
import style from "./Productos.module.css"
import { useProductoContext } from '../../context/ProductoContext'
const Productos = () => {

    const { productos } = useProductoContext();
    
    const [ cantPaginas, setCantPaginas ] = useState();
    const [ prodPaginaActual, setProdPaginaActual ] = useState([]);
    const [ actualPagina, setActualPagina ] = useState(1);


    useEffect(() => {
        manejoProductos();
    }, [productos]);

    if (!productos) {
        return <p>Cargando productos...</p>;
    }

    const manejoProductos = () => {
        const cantProductos = productos.length;

        if (cantProductos % 6 === 0) {
            setCantPaginas(cantProductos / 6);
        } else {
            setCantPaginas(Math.floor(cantProductos / 6) + 1);
        }
        setActualPagina(1);
        vistaPaginaActual(1);
    };

    const vistaPaginaActual = (pagina) => {
        console.log("Pagina actual: ", pagina);
        const prodInicialEnPagina = (pagina * 4 - 4);
        const prodFinalEnPagina = ((pagina * 4));
        console.log("prodFinalEnPagina: ", prodFinalEnPagina);
        console.log("prodInicialEnPagina: ", prodInicialEnPagina);
        
        setProdPaginaActual(productos.slice(prodInicialEnPagina, prodFinalEnPagina));
        setActualPagina(pagina);
        console.log("Productos de la pagina actual: ", prodPaginaActual);
    };
    
    return (
        <>
            <div className={style.productos}>
                {
                    prodPaginaActual.map(producto => (
                        <div key={producto.id}><TarjetaProducto id={producto.id} nombre={producto.nombre} precio={producto.precio} img={producto.img} /></div>
                    ))
                }
            </div>
            <div className={style.botonesPaginacion}>
                <button class="btn btn-secondary" disabled={actualPagina === 1} onClick={() => vistaPaginaActual(actualPagina - 1)} >Anterior</button>
                <span> {actualPagina} de {cantPaginas} </span>
                <button class="btn btn-secondary" disabled={actualPagina === cantPaginas} onClick={() => vistaPaginaActual(actualPagina + 1)} >Siguiente</button>
            </div>
        </>
    )
}

export default Productos