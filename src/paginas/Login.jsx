// import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';
import clienteAxios from '../config/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const {setAuth} = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log('Iniciando sesion')
        if([email, password].includes('')) {
            setAlerta({
                mensaje: 'Todos los campos son obligatorios',
                error: true
            });
            return
        }
        try {
            const {data} = await clienteAxios.post('/veterinarios/login', {email, password})
            // console.log(data)
            localStorage.setItem('token', data.token)
            // console.log(data)
            setAuth(data)
            navigate('/admin')
        } catch (error) {
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
        <h1 style={{ color: 'indigo' }}>
          Inicia Tu Sesión y Administra Tus {''}
          <span style={{ color: 'black' }}>Pacientes Amigo</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {mensaje && <Alerta alerta={alerta} />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="Email de Registro"
              className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="Tu Password"
              className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Inicia tu Sesión"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold
            mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-gray-500"
            to="/registrar"
          >
            ¿No tienes una cuenta? Regístrate
          </Link>
          <Link
            className="block text-center my-5 text-gray-500"
            to="/olvide-password"
          >
            Olvidé mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Login;
