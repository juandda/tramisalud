import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const ListarCitas = () => {

  const [listaCitas, setListaCitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/Citas", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
        setListaCitas(response.data);
        console.log(response.data);
    });
  },[]);

  const NuevoRegistro =  () => {
      console.log("<sdasd");
      navigate("/registrarCita");
  }

  const columns = [
    {field: 'direccion', headerName: 'Direccion', width: 150},
    {field: 'fecha', headerName: 'Fecha', width: 150},
    {field: 'hora', headerName: 'Hora', width: 150},
    {field: 'medico', headerName: 'Medico', width: 150},
  ]

  const rows = listaCitas?.map(cita => {
    return {
      direccion: cita?.direccion,
      fecha: cita?.fecha,
      hora: cita?.hora,
      medico: cita?.medico?.nombre,
      estado: cita?.estado,
      id: cita?.id,
    }
})

  return (
        <>
        <NavBar/>
        <div style={{ height: 300, width: '47%', textAlign:'-webkit-center' ,marginTop:'100px', backgroundColor:'white'}} className='table-container'>
                 <Button
                  color="primary"
                  disabled={false}
                  onClick={NuevoRegistro}
                >
                    Nuevo Registro
                </Button>
                <DataGrid 
                    sx={{
                            backgroundColor: 'white',
                            display: 'flex',
                            margin: '0 auto',
                            justifyContent: 'center',
                            textAlign: 'center',
                        }} 
                    rows={rows} 
                    columns={columns} 
                    isRowSelectable={() => false}/>        
        </div> 
        </>
  )
}

export default ListarCitas