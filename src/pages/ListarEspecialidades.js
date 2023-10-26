import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const ListarEspecialidades = () => {

  const [listaEspecialidades, setListaEspecialidades] = useState([]);
  let navigate = useNavigate();

  useEffect(() =>{
    axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/especialidades", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
        setListaEspecialidades(response.data);
        console.log(response.data);
    });
  },[]);

  const NuevoRegistro =  () => {
      navigate("/registrarEspecialidad");
  }

  const columns = [
    {field: 'nombre', headerName: 'Nombre', width: 150, headerClassName:'table-container'},
  ]

  const rows = listaEspecialidades?.map(especialidad => {
    return {
        nombre: especialidad?.nombre,
        id:especialidad?.id
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

export default ListarEspecialidades