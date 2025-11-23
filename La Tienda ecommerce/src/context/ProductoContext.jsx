import { createContext, useEffect, useState, useContext } from "react";

export const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {

    const API = 'https://68ddf55ad7b591b4b78e014a.mockapi.io/articulos'

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargaProductos()
    }, []);

    //Carga de productos en la constante productos
    const cargaProductos = async () => {
        try {
            setCargando(true);
            setError(null);
            const response = await fetch(API);

            if (!response.ok) {
                throw new Error('Error al cargar los productos (' + response.status + ')');
            }
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            setError(error.message || 'Error al cargar los productos');
            console.log("Error al cargar los productos:", error);
        }
        finally {
            setCargando(false);
        }
    }

    const agregarProducto = async (producto) => {
        try {
            setError(null);
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })
            const nuevoProducto = await response.json();

            console.log("Producto agregado:", nuevoProducto);

            if (!response.ok) {
                throw new Error('Error al agregar el producto (' + response.status + ')');
            }

            setProductos([...productos, nuevoProducto]);
        } catch (error) {
            setError(error.message || 'Error al agregar el producto');
            console.log("Error al agregar el producto:", error);
        }
    }

    const editarProducto = async (producto) => {
        try{
            setError(null);
            const response = await fetch(API + '/' + producto.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)
            })

            if (!response.ok) {
                throw new Error('Error al editar el producto (' + response.status + ')');
            }

            const productoActualizado = await response.json();

            console.log("Producto actualizado:", productoActualizado);

            setProductos(productos.map(item => item.id === producto.id ? productoActualizado : item));
        } catch (error) {
            setError(error.message || 'Error al editar el producto');
            console.log("Error al editar el producto:", error);
        }
    }

    const eliminarProducto = async (producto) => {
        try{
            setError(null);
            const response = await fetch(API + '/' + producto, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Error al eliminar el producto (' + response.status + ')');
            }

            setProductos(productos.filter(item => item.id !== producto));
        } catch (error) {
            setError(error.message || 'Error al eliminar el producto');
            console.log("Error al eliminar el producto:", error);
        }
    }

    return (
        <ProductoContext.Provider value={{ productos, cargando, error, agregarProducto, editarProducto, eliminarProducto }} >
            {children}
        </ProductoContext.Provider>
    )

}

export const useProductoContext = () => useContext(ProductoContext);