// import React from 'react'
import { useState } from 'react';
import AdminNav from '../components/AdminNav';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';


const CambiarPassword = () => {

  const {guardarPassword} = useAuth();

  const [alerta, setAlerta] = useState({});

  const [password, setPassword] = useState({
      pwd_actual: '',
      pwd_nuevo: ''
  });
      
  
  const handleSutmit = async e => {
    e.preventDefault();

    // console.log(Object.values(password).every(campo => campo === ''));
    // console.log(Object.values(password).some(campo => campo === ''));
    if(Object.values(password).some(campo => campo === '')) {
        setAlerta({
          mensaje: 'Todos los campos son obligatorios',
          error: true
        });
        return
    }
    if(password.pwd_nuevo.length < 6) {
      setAlerta({
        mensaje: 'El Password debe tener minimo 6 caracteres',
        error: true
      })
      return
    }

    const respuesta = await guardarPassword(password)
    setAlerta(respuesta)
  }
  const {mensaje} = alerta
  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-centr mt-10">Cambiar Paswword</h2>
      <p className="text-indigo-600 font-bold">Modifica tu {''} <span>Password aqui</span> </p>
      <div className="flex justify-centr">
        <div className="w-full md:w-1/2 shadow rounded-lg p-5">

            {mensaje && <Alerta alerta={alerta} />}
            
            <form
                onSubmit={handleSutmit}
            >
                <div className="my-3">
                    <label className="uppercase font-bold text-gray-600">Password Actual</label>
                    <input
                        type="password"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="pwd_actual"
                        placeholder='Escribe tu password Actual'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                    />
                </div>
                <div className="my-3">
                    <label className="uppercase font-bold text-gray-600">Password Nuevo</label>
                    <input
                        type="password"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="pwd_nuevo"
                        placeholder='Escribe tu nuevo password'
                        onChange={e => setPassword({
                          ...password,
                          [e.target.name] : e.target.value
                        })}
                    />
                </div>
            
                    <input
                        type="submit"
                        value="Actualizar Password"
                        className="bg-indigo-700 px-10py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />
            </form>
        </div>
      </div>
    </>
  )
};
export default CambiarPassword;
