import React from "react";
import style from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faXTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return (
        <div className={style.footer}>
            <div className={style.footerContainer}>
                <div>
                    <Link to = "/"><img src="../assets/img/logoTransparente.png" alt="Logo La Tienda"/></Link>
                </div>
                <div>
                    <ul className={style.redes}>
                        <li><a href="https://www.instagram.com/" target="_blank"><FontAwesomeIcon icon={faInstagram} style={{color: "#d26aac",}} className={style.icon}/></a></li>
                        <li><a href="https://www.facebook.com/" target="_blank"><FontAwesomeIcon icon={faFacebook} style={{color: "#2167fdff",}} className={style.icon}/></a><a href=""></a></li>
                        <li><a href="https://twitter.com/" target="_blank"><FontAwesomeIcon icon={faXTwitter} style={{color: "#000705ff",}} className={style.icon}/></a><a href=""></a></li>
                        <li><a href="https://web.whatsapp.com/" target="_blank"><FontAwesomeIcon icon={faWhatsapp} shake style={{color: "#028a02ff",}} className={style.iconWhatsapp}/></a><a href=""></a></li>
                    </ul>
                </div>
            </div>
            <p>Copyright 2025 - Todos los derechos reservados - Javier Monzon - Talento Tech React Comision 25236</p>
        </div>
    );
};

export default Footer;