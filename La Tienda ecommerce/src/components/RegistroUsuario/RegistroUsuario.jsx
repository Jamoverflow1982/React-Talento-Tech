import React, { useEffect } from 'react'
import { useUsuario } from "../../context/UsuarioContext";
import { useState } from "react";
import { AlertaContext } from '../../context/AlertaContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import style from "./RegistroUsuario.module.css"

const RegistroUsuario = () => {

    const Navigate = useNavigate();

    const [usuario, setUsuario] = useState({});
    const [errorReg, setErrorReg] = useState({});

    const { mostrarAlerta } = useContext(AlertaContext);

    const {crearUsuario, error} = useUsuario();


    useEffect(() => {
        if (error) {
            mostrarAlerta("Se ha producido un error al registrarse");
        }
    }, [error, mostrarAlerta]);

    const manejoCambio = (e) => {
        setUsuario({...usuario, [e.target.name]: e.target.value});
    }

    const validarRegistro = () => {
        const errores = {};

        if(!usuario.nombre || !usuario.nombre.trim() || usuario.nombre.length < 3) {
            errores.nombre = 'El nombre real es obligatorio y debe tener al menos 3 caracteres';
        }

        if(!usuario.usu || !usuario.usu.trim() || usuario.usu.length < 3) {
            errores.usu = 'El nombre de usuario es obligatorio y debe tener al menos 3 caracteres';
        }

        if(!usuario.pass || !usuario.pass.trim() || usuario.pass.length < 4) {
            errores.pass = 'La contraseña es obligatoria y debe tener al menos 4 caracteres';
        }

        if(usuario.pass !== usuario.password2) {
            errores.pass = 'Las contraseñas no coinciden';
        }

        setErrorReg(errores);

        console.log("Los errores son:", errores);

        return Object.keys(errores).length === 0
    }

    const manejarSubmit = (e) => {
        e.preventDefault();
        console.log("Manejo de registro, el usuario es:", usuario);
        if (validarRegistro()) {
            crearUsuario(usuario);
            Navigate('/login');
        }
    }
    
    return (
        <>
            <h2>Registro de Usuario</h2>
            <form className={style.formulario} onSubmit={manejarSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Ingrese su Nombre</label>
                    <input type="text" className="form-control" name="nombre" value={usuario.nombre} onChange={manejoCambio} />
                    {errorReg.nombre && <p className={style.error}>{errorReg.nombre}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="usu" className="form-label">Nombre de Usuario</label>
                    <input type="text" className="form-control" name="usu" value={usuario.usu} onChange={manejoCambio}/>
                    {errorReg.usu && <p className={style.error}>{errorReg.usu}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" className="form-control" name="pass" value={usuario.pass} onChange={manejoCambio}/>
                    {errorReg.pass && <p className={style.error}>{errorReg.pass}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">Repetir Password</label>
                    <input type="password" className="form-control" name="password2" value={usuario.password2} onChange={manejoCambio}/>
                    {errorReg.password2 && <p className={style.error}>{errorReg.password2}</p>}
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </>

    )
}

export default RegistroUsuario