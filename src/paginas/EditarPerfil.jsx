// import React from 'react'
import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from '../hooks/useAuth';
import Alerta from "../components/Alerta";

const EditarPerfil = () => {

    const {auth, actualizarPerfil} = useAuth();
    const [perfil, setPerfil] = useState({})
    // console.log(auth)
    const [alerta, setAlerta] = useState({});

    useEffect(() => {
        setPerfil(auth)
        
    }, [auth])
    // console.log(perfil)
    const handleSutmit = async e => {
        e.preventDefaul()

        const {nombre, email} = perfil
        if([nombre, email].includes('')) {
            setAlerta({
                mensaje: 'Email y Nombre son obligatorios',
                error: true
            })
            return
        }

        const resultado = await actualizarPerfil(perfil)
        setAlerta(resultado)
    }

    const {mensaje} = alerta

  return (
    <>
      <Admin />
      <h2 className="font-black text-3xl text-centr mt-10">Editar Perfil</h2>
      <p className="text-indigo-600 font-bold">Modifica tu {''} <span>Información aquí</span> </p>
      <div className="flex justify-centr">
        <div className="w-full md:w-1/2 shadow rounded-lg p-5">

            {mensaje && <Alerta alerta={alerta} />}
            
            <form
                onSubmit={handleSutmit}
            >
                <div className="my-3">
                    <label className="uppercase font-bold text-gray-600">Nombre</label>
                    <input
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="nombre"
                        value={perfil.nombre || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}   
                    />
                </div>
                <div className="my-3">
                    <label className="uppercase font-bold text-gray-600">Sitio Web</label>
                    <input
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="web"
                        value={perfil.web || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}   
                           
                    />
                </div>
                <div className="my-3">
                    <label className="uppercase font-bold text-gray-600">Celular</label>
                    <input
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="celular"
                        value={perfil.celular || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}      
                    />
                </div>
                <div className="my-3">
                    <label className="uppercase font-bold text-gray-600">Email</label>
                    <input
                        type="text"
                        className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                        name="email"
                        value={perfil.email || ''}
                        onChange={e => setPerfil({
                            ...perfil,
                            [e.target.name] : e.target.value
                        })}      
                    />
                    <input
                        type="submit"
                        value="Guardar Cambios"
                        className="bg-indigo-700 px-10py-3 font-bold text-white rounded-lg uppercase w-full mt-5"
                    />
                </div>
            </form>
        </div>
      </div>
    </>
  )
};
export default EditarPerfil;
