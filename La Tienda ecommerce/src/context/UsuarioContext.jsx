import { createContext, useEffect, useState, useContext } from "react";
import { AlertaContext } from "./AlertaContext";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children, usuarioNombre, usuarioPassword }) => {

    const API = 'https://68ddf55ad7b591b4b78e014a.mockapi.io/usuarios';

    const [usuarioLog, setUsuarioLog] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const { mostrarAlerta } = useContext(AlertaContext);

    useEffect(() => {
        if (usuarioNombre && usuarioPassword) {
            cargarUsuario(usuarioNombre, usuarioPassword);
        }else{
            setCargando(false);
        }
    }, [usuarioNombre, usuarioPassword]);

    const cargarUsuario = async (usuario, password) => {
        try{
            console.log("Dentro de UsuarioContext cargarUsuario los datos son: ", usuario, password);
            setCargando(true);
            setError(null);
            const response = await fetch(`${API}?usu=${usuario}`);
            if (!response.ok) {
                throw new Error('Error al cargar el usuario (' + response.status + ')');
            }
            const data = await response.json();

            if (data.length === 0) {
                console.log('Usuario no encontrado');
                setError('Usuario no encontrado');
                setUsuarioLog(null);
                mostrarAlerta('Usuario no encontrado');
                return;
            }
            
            const usuarioExiste = data[0];

            if (usuarioExiste.pass !== password) {
                console.log('Contraseña incorrecta');
                setError('Contraseña incorrecta');
                setUsuarioLog(null);
                return;
            }

            setUsuarioLog(usuarioExiste);

            mostrarAlerta('Bienvenido a nuestra tienda ' + usuarioExiste.nombre + '!!!');

        } catch (error) {
            setError(error.message || 'Error al cargar el usuario');
            console.log("Error al cargar el usuario:", error);
        }
        finally {
            setCargando(false);
        }
    }

    const eliminarUsuario = async (id) => {
        if (id == 0) {
            alert('No se puede eliminar el usuario Administrador');
            return
        }
        try {
            setError(null);
            const response = await fetch(API + '/' + id, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw new Error('Error al eliminar el usuario (' + response.status + ')');
            }
            setUsuarioLog(null);
        } catch (error) {
            setError(error.message || 'Error al eliminar el usuario');
            console.log("Error al eliminar el usuario:", error);
        }
    }

    const editarUsuario = async (id, usuario) => {
        if (id === 0) {
            alert('No se puede editar el usuario Administrador');
            return
        }
        try {
            setError(null);
            const response = await fetch(API + '/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            })
            if (!response.ok) {
                throw new Error('Error al editar el usuario (' + response.status + ')');
            }
            const usuarioActualizado = await response.json();
            setUsuarioLog(usuarioActualizado);
        } catch (error) {
            setError(error.message || 'Error al editar el usuario');
            console.log("Error al editar el usuario:", error);
        }
    }

    const crearUsuario = async (datos) => {
        const usuarioRegistro = {
            nombre: datos.nombre,
            usu: datos.usu,
            pass: datos.pass
        };
        console.log("Dentro de UsuarioContext crearUsuario los datos son: ", usuarioRegistro);
        try {
            setError(null);
            const response = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuarioRegistro)
            })
            if (!response.ok) {
                throw new Error('Error al crear el usuario (' + response.status + ')');
            }
            const nuevoUsuario = await response.json();
            setUsuarioLog(nuevoUsuario);

            mostrarAlerta('Bienvenido a nuestra tienda ' + nuevoUsuario.nombre + '!!! Te registraste correctamente');

        } catch (error) {
            setError(error.message || 'Error al crear el usuario');
            console.log("Error al crear el usuario:", error);
        }
    }

    return (
        <UsuarioContext.Provider value={{ setUsuarioLog, usuarioLog, cargando, error, eliminarUsuario, editarUsuario, crearUsuario, cargarUsuario }}>
            {children}
        </UsuarioContext.Provider>
    );

}

export const useUsuario = () => useContext(UsuarioContext);