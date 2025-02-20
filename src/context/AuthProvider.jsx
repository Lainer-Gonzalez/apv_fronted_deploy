import {useState, useEffect, createContext} from 'react';
import clienteAxios from '../config/axios';

const AuthContext = createContext();
const AuthProvider = ({children}) => {

    const [cargando, setcargando] = useState(true);
    const [auth, setAuth] = useState({});
    
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            // console.log(token)
            if(!token) {
                setcargando(false)
                return
            }
            // console.log('si hay token')
            const config = {
                Headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                // console.log(data)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.mensaje)
                setAuth({})
            }
            setcargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerremosSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        // console.log(datos)
        const token = localStorage.getItem('token')
        if(!token) {
            setcargando(false)
            return
        }
        const config = {
            Headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)
            // console.log(data)
            return {
                mensaje: 'Almacenado Correctamente'
            }
        } catch (error) {
            // console.log(error.response)
            return {
                mensaje: error.response.data.mensaje,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        // console.log(datos)
        const token = localStorage.getItem('token')
        if(!token) {
            setcargando(false)
            return
        }
        const config = {
            Headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url, datos, config)
            console.log(data)

            return {
                mensaje: data.mensaje
            }
        } catch (error) {
            // console.log(error.response.data.mensaje)
            return {
                mensaje: error.response.data.mensaje,
                error: true
            }
        }

    }

    return (

        <AuthContext.Provider
            value={{
                auth, 
                setAuth,
                cargando,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>

    )
}
export {
    AuthProvider
}

export default AuthContext;