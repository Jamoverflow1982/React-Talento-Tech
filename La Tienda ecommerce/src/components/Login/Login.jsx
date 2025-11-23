import { useState } from "react"
import { useAutorizacion } from "../../context/AutorizacionContext";
import style from "./Login.module.css"
import { useNavigate } from "react-router-dom";
import Admin from "../Admin/Admin";


const Login = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAutorizacion();

    const manejoSubmit = (e) => {
        e.preventDefault();
        console.log(`El usuario es: ${usuario} y la contraseña es: ${password}`);
        if (usuario === 'admin' && password === '1234') {
            console.log('El usuario es admin');
            login('admin');
            navigate('/');
        } else {
            console.log('El usuario no es admin');
            alert('El usuario no es admin');
        }
    }

    return (
        <section className={style.login}>
            <div className={style.divLogin}>
                <h2>Por favor ingrese su nombre de usuario y contraseña</h2>
            </div>
            <div className={style.divLogin}>
                <form className={style.formulario} onSubmit={manejoSubmit} >
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUsuario(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Recordarme</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                </form>
            </div>
        </section>
    )       
}       

export default Login