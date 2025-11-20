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
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Usuario</label>
                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUsuario(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                        <label class="form-check-label" for="exampleCheck1">Recordarme</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Ingresar</button>
                </form>
            </div>
        </section>
    )       
}       

export default Login