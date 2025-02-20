// import React from 'react'

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setpasswordModificado] = useState(false);

  const params = useParams();
  // console.log(params)
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        setAlerta({
          mensaje: 'Coloca tu Nuevo Password'
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({
          mensaje: 'Hubo un error con el enlace',
          error: true,
        });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(Password.length < 6) {
      setAlerta({
        mensaje: 'El Password debe ser minimode 6 caracteres',
        error: true
      })
      return
    }

    try {
      const url = `/veterinarios/olvide-paswword/${token}`
      const {data} = await clienteAxios.post(url, {password})
      // console.log(data)
      setAlerta({
        mensaje: data.mensaje
      })
      setpasswordModificado(true)
    } catch (error) {
      setAlerta({
        mensaje: error.response.data.mensaje,
        error: true
      })
    }
  }

  const { mensaje } = alerta;
  
  return (
    <>
      <div>
        <h1 style={{ color: 'indigo' }}>
          Reestablece tu password y no Pierdas Acceso a tus {''}
          <span style={{ color: 'black' }}>Pacientes Amigo</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
          {mensaje && <Alerta alerta={alerta} />} 
          {tokenValido && (
            <>
             <form>
             <div className="my-5">
                  <label className="uppercase text-gray-600 block text-xl font-bold">
                    Nuevo Password
                  </label>
                  <input
                    type="password"
                    placeholder="Tu Nuevo Password"
                    className="border w-full p-3 mt-3 bg-gray-100 rounded-xl"
                    value={Password}
                    onChange={(evento) => setPassword(evento.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Guardar Nuevo Password"
                  className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold
                  mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
              </form>
              
            </>
            )}
            {passwordModificado && 
              <Link 
              className='block text-center my-5 text-gray-500'
              to="/">Inicia Sesión</Link>
            }
      </div>
    </>
  );
};

export default NuevoPassword;
