// import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault(); // Corregido: antes estaba mal escrito como "e.preventDefaul()"

    if (email === '' || email.length < 6) {
      setAlerta({ mensaje: 'El Email es obligatorio amigo', error: true });
      return;
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/olvide-password', {
        email,
      });

      console.log(data);
      setAlerta({ mensaje: data.mensaje });
    } catch (error) {
      setAlerta({
        mensaje: error.response?.data?.mensaje || 'Hubo un error',
        error: true,
      });
    }
  };

  const { mensaje } = alerta;

  return (
    <>
      <div>
        <h1 style={{ color: 'indigo' }}>
          Recupera tu Acceso y no Pierdas Tus {''}
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold
            mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
          />
        </form>

        <nav className="mt-10 lg:flex lg:justify-between">
          <Link className="block text-center my-5 text-gray-500" to="/">
            ¿Ya tienes una cuenta? Inicia Sesión
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

export default OlvidePassword;
