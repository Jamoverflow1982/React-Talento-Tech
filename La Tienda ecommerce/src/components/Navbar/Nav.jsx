import React, { use, useContext } from "react";
import style from "./Navbar.module.css";
import { useAutorizacion } from "../../context/AutorizacionContext";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {

    const navigate = useNavigate();
    const { logout } = useAutorizacion();
    const { usuario } = useAutorizacion();
    const { usuarioNom } = useAutorizacion();

    const {cantidadProductosEnCarrito} = useContext(CarritoContext);

    const esAdministrador = usuario === 'admin';

    return (
        <section className={style.nav}>
            <ul>
                <li>
                    {usuario ?
                    <p className={style.bienvenida}>Bienvenido {usuarioNom}</p>
                    :
                    <p className={style.bienvenida}>Bienvenido</p>
                    }
                </li>
            </ul>
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to = "/" className="nav-link">Inicio</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to = "/Productos" className="nav-link">Productos</Link>
                                </li>
                                {esAdministrador && // Si el usuario es admin mostrar el link
                                <li className="nav-item">
                                    <Link to = "/Admin" className="nav-link">Administrador</Link>
                                </li>}
                                <li className="nav-item">
                                    {usuario ? 
                                    <button className="btn btn-danger" onClick={() => logout()}>Cerrar Sesión</button>
                                    :
                                    <button className="btn btn-info" onClick={() => navigate("/Login")}>Iniciar Sesión / Registrarse</button>
                                    }
                                </li>
                                <li className="nav-item">
                                    <Link to = "/Carrito" className="nav-link d-flex align-items-center"><FontAwesomeIcon icon={faCartShopping} style={{color: "#4c76ffff",}} className={style.iconCarrito}/>
                                        {cantidadProductosEnCarrito > 0 && (
                                            <span className={style.cartBadge}>
                                                {cantidadProductosEnCarrito}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            </ul>
                        </div>
                </div>
            </nav>
        </section>
    );
}

export default Nav