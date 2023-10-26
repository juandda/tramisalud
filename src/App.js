import './App.css';
import React from 'react';
import {BrowserRouter as Router, useNavigate, Route, Routes} from 'react-router-dom';
import Cita from './pages/Cita';
import Login from './pages/Login';
import Register from './pages/Register';
import MisCitas from './pages/MisCitas';
import RegistrarCita from './pages/RegistrarCitas';
import RegistrarMedico from './pages/RegistrarMedicos';
import RegistrarEps from './pages/RegistrarEps';
import RegistrarEspecialidad from './pages/RegistrarEspecialidad';
import {ThemeProvider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import theme from './ThemeConfig';
import ListarEps from './pages/ListarEps';
import ListarEspecialidades from './pages/ListarEspecialidades';
import ListarMedicos from './pages/ListarMedicos';
import ListarCitas from './pages/ListarCitas';

function App() {
      let navigate = useNavigate();

        return (
            <ThemeProvider theme={theme}>
                  <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/misCitas" element={<MisCitas/>}/>
                    <Route path="/nuevaCita" element={<Cita/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registrarCita" element={<RegistrarCita/>}/>
                    <Route path="/registrarMedico" element={<RegistrarMedico/>}/>
                    <Route path="/registrarEps" element={<RegistrarEps/>}/>
                    <Route path="/registrarEspecialidad" element={<RegistrarEspecialidad/>}/>
                    <Route path="/listarEps" element={<ListarEps/>}/>
                    <Route path="/listarEspecialidades" element={<ListarEspecialidades/>}/>
                    <Route path="/listarMedicos" element={<ListarMedicos/>}/>
                    <Route path="/listarCitas" element={<ListarCitas/>}/>
                  </Routes>
            </ThemeProvider>
      )
}

export default App;


