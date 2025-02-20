import { createContext, useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';

const PacientesContext = createContext();

export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const {auth} = use();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios('/pacientes', config);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };
        obtenerPacientes();
    }, [auth]);

    const guardarPaciente = async (paciente) => {
        // console.log(paciente)
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        // console.log(paciente);
        if (paciente.id) {
            // console.log('editando...');
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                // console.log(data)
                const pacientesActualizado = pacientes.mao(pacienteState => pacienteState.id ===
                    data._id ? data : pacienteState )
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const { data } = await clienteAxios.post('/pacientes', paciente, config);
                // console.log(data);
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;

                // console.log(pacienteAlmacenado);
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.mensaje);
            }
        }
    };

    const setEdicion = (id) => {
        // console.log('editando', id);
        setPaciente(paciente);
    };
    const eliminarPaciente = async id => {
        // console.log(id)
        const confirmar = confirm('¿Confirmas que quieres eliminar ?')
        // console.log(confirmar)
        if(confirmar) {
            try {
                const  token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const {data} = await clienteAxios.delete(`/pacientes/${id}`, config);   
                // console.log(data)  
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState.id_ !== id)
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
};

export default PacientesContext;
