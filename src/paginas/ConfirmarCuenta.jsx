
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
// import axios from 'axios';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const params = useParams();
  // console.log(params)
  const { id } = params;

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/api/veterinarios/confirmar/${id}`;
        // console.log(url)
        const { data } = await clienteAxios(url);
        // console.log(data)
        setCuentaConfirmada(true);
        setAlerta({
          mensaje: data.mensaje,
        });
      } catch (error) {
        setAlerta({
          mensaje: error.response?.data?.mensaje || 'Hubo un error',
          error: true,
        });
      }

      setCargando(false);
    };
    confirmarCuenta();
  }, [id]); // Agregado `id` como dependencia para evitar advertencias en React

  return (
    <>
      <div>
        <h1 style={{ color: 'indigo' }}>
          Confirma tu Cuenta y Comienza a Administrar Tus {''}
          <span style={{ color: 'black' }}>Pacientes Amigo</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <Link className="block text-center my-5 text-gray-500" to="/">
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
