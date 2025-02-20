import {useState} from 'react';
import {Link} from 'react-router-dom';
// import axios from 'axios';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')) {
            // console.log('Hay campos vacios')
            setAlerta({mensaje: 'Hay campos vacios', error: true})
            return;
        }    

        if(password !== repetirPassword) {
            // console.log('Los Password no  son iguales')
            setAlerta({mensaje: 'Los Password no son iguales', error: true})
            return;
        }

        if(password.length < 6) {
            // console.log('El Password es muy corto,agrega minimo 6 caracteres')
            setAlerta({mensaje: 'El Password es muy corto, agrega minimo 6 caracteres', error: true})
            return;
        }

        // console.log('Todo salio muy bien...')
        setAlerta({})

        // Crear el usuario en la api

        try {
            
            await clienteAxios.post('/veterrinarios', {nombre, email, password})
            setAlerta({
                mensaje: 'Creado Correctamente, revisa tu email',
                error: false
            })
            // console.log(respuesta)
        } catch (error) {
            // console.log(error.response)
            setAlerta({
                mensaje: error.response.data.mensaje,
                error: true
            })
        }
    }

    const {mensaje} = alerta

    return (
      <>
        <div>
            <h1 style={{ color: "indigo" }}>
                Crea tu Cuenta y Administra Tus {""} <span style={{ color: "black" }}>Pacientes Amigo</span>
            </h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {mensaje && <Alerta
                alerta={alerta}
            />}
            <form
                onSubmit={handleSubmit}
            >
            <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Nombre
                    </label>
                    <input 
                        type="text" 
                        placeholder="Tu Nombre"
                        className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                        value={nombre}
                        onChange={evento => setNombre(evento.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        placeholder="Email de Registro"
                        className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                        value={email}
                        onChange={evento => setEmail(evento.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Password
                    </label>
                    <input 
                        type="password" 
                        placeholder="Tu Password"
                        className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                        value={password}
                        onChange={evento => setPassword(evento.target.value)}
                    />
                </div>
                <div className="my-5">
                    <label
                        className="uppercase text-gray-600 block text-xl font-bold"
                    >
                        Repetir Password
                    </label>
                    <input 
                        type="password" 
                        placeholder="Repite tu Password"
                        className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                        value={repetirPassword}
                        onChange={evento => setRepetirPassword(evento.target.value)}
                    />
                </div>
                <input 
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold
                    mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
            </form> 
            <nav className='mt-10 lg:flex lg;justify-between'>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/">Ya tienes una cuenta? Inicia Sesión</Link>
                <Link 
                    className='block text-center my-5 text-gray-500'
                    to="/olvide-password">Olvide mi Paswword</Link>
            </nav>
        </div>       
      </>
    )
  }
  
  export default Registrar;