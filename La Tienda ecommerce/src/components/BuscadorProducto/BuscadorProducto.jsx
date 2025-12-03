import React from 'react'
import { useBuscar } from '../../context/BuscadorProductoContext'
import { useNavigate } from 'react-router-dom'

const BuscadorProducto = () => {

    const { busqueda, setBusqueda } = useBuscar();
    const navigate = useNavigate();

    const manejoBusqueda = (e) => {
        const dato = e.target.value;
        console.log(dato);
        setBusqueda(dato);
        if (dato.trim()) {
            navigate('/busqueda');
        }
    }

    return (
        <form class="d-flex" role="search">
            <input class="form-control me-2" type="search" placeholder="Buscar producto..." aria-label="Search" value={busqueda} onChange={manejoBusqueda}/>
        </form>
    )
}

export default BuscadorProducto