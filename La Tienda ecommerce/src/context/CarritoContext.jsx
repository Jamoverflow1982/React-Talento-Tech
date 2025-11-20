import { createContext, useState, useContext } from "react";
import { AlertaContext } from "./AlertaContext";

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const { mostrarAlerta } = useContext(AlertaContext);

    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find(item => item.id === producto.id);

        if (productoExistente) {

            const nuevaCantidad = productoExistente.cantidad + 1;

            setCarrito(
                carrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item
                )
            )
            mostrarAlerta("Hay " + nuevaCantidad + " del producto " + carrito.find(item => item.id === producto.id).nombre + " en el carrito");
            console.log("Hay " + nuevaCantidad + " del producto " + carrito.find(item => item.id === producto.id).nombre + " en el carrito");
        }else{
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
            mostrarAlerta("El producto " + producto.nombre + " fue agregado al carrito");
            console.log("El producto " + producto.nombre + " fue agregado al carrito");
        }
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        mostrarAlerta("El carrito fue vaciado");
        console.log("El carrito fue vaciado");
    }

    const eliminarDelCarrito = (productoId) => {
        setCarrito(carrito.filter(item => item.id !== productoId));
        mostrarAlerta("El producto " + carrito.find(item => item.id === productoId).nombre + " fue eliminado del carrito");
        console.log("El producto " + carrito.find(item => item.id === productoId).nombre + " fue eliminado del carrito");
    }

    return(
        <CarritoContext.Provider value={{carrito, agregarAlCarrito, vaciarCarrito, eliminarDelCarrito}}>
            {children}
        </CarritoContext.Provider>
    );
}