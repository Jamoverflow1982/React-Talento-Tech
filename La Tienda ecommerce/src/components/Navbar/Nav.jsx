import React from "react";
import style from "./Navbar.module.css";
import { useAutorizacion } from "../../context/AutorizacionContext";
import { Link } from "react-router-dom";
import {  useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {

    const navigate = useNavigate();
    const { logout } = useAutorizacion();
    const { usuario } = useAutorizacion();
    const { usuarioNom } = useAutorizacion();
    const esAdministrador = usuario === 'admin';

    return (
        <section className={style.nav}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    {usuario ?
                    <p className={style.bienvenida}>Bienvenido {usuarioNom}</p>
                    :
                    <p className={style.bienvenida}>Bienvenido</p>
                    }
                </li>
            </ul>
            <ul className="nav nav-tabs">
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
            </ul>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    {usuario ? 
                    <button className="btn btn-danger" onClick={() => logout()}>Cerrar Sesión</button>
                    :
                    <button className="btn btn-info" onClick={() => navigate("/Login")}>Iniciar Sesión / Registrarse</button>
                    }
                </li>
                <li className="nav-item">
                    <Link to = "/Carrito" className="nav-link"><FontAwesomeIcon icon={faCartShopping} style={{color: "#4c76ffff",}} className={style.iconCarrito}/></Link>
                </li>
            </ul>
        </section>
    );
}

export default Nav