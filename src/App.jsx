// index es la version Actual  linea 12, tambien me dice que es el primer componente.

import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

import  Login  from './paginas/Login';
import  Registrar  from './paginas/Registrar';
import  OlvidePassword  from './paginas/OlvidePassword';
import  ConfirmarCuenta  from './paginas/ConfirmarCuenta';
import  NuevoPassword  from './paginas/NuevoPassword';
import  AdministrarPacientes  from './paginas/AdministrarPacientes';
import  EditarPerfil  from './paginas/EditarPerfil';
import  CambiarPassword  from './paginas/CambiarPassword';

import  {AuthProvider}  from './context/AuthProvider';
import  {PacientesProvider}  from './context/PacientesProvider';

function App() {

  return (

    <BrowserRouter future={{ v7_startTransition: true }}>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />}/>
                  <Route path="registrar" element={<Registrar />}/>
                  <Route path="olvide-Password" element={<OlvidePassword />}/>
                  <Route path="olvide-Password/:token" element={<NuevoPassword />}/>
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />}/>
            </Route>
                <Route path="/admin" element={<RutaProtegida />}>
                    <Route index element={<AdministrarPacientes/>}/>
                    <Route path="perfil" element={<EditarPerfil />} />
                    <Route path="cambiar-password" element={<CambiarPassword />} />
                </Route>
              </Routes>
            </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;
