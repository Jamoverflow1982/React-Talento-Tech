import { useBuscar } from "../../context/BuscadorProductoContext";
import { useProductoContext } from "../../context/ProductoContext";
import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";
import style from "./ResultadoDeBusqueda.module.css"

const Buscar = () => {
    const { busqueda } = useBuscar();
    const { productos } = useProductoContext();

    const productoEncontrado = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    
    console.log("Resultado de busqueda en ResultadoDeBusqueda.jsx:", productoEncontrado);
    return (
        <div>
            {productoEncontrado.length > 0 ? (
                <div className={style.productos}>
                    <p>Se encontraron {productoEncontrado.length} resultados en la búsqueda:</p>
                    <ul>
                        {productoEncontrado.map(producto => (
                            <li key={producto.id}>
                                <TarjetaProducto id={producto.id} nombre={producto.nombre} precio={producto.precio} img={producto.img} />
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h2>No se encontraron resultados</h2>
            )}
        </div>
    )
}

export default Buscar