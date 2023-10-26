import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const ListarMedicos = () => {

  const [listaMedicos, setListaMedicos] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/medicos", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
        setListaMedicos(response.data);
        console.log(response.data);
    });
  },[]);

  const NuevoRegistro =  () => {
      navigate("/registrarMedico");
  }

  const columns = [
    {field: 'nombre', headerName: 'Nombre', width: 150, headerClassName:'table-container'},
    {field: 'especialidad', headerName: 'Especialidad', width: 150, headerClassName:'table-container'},
    {field: 'eps', headerName: 'Eps', width: 150, headerClassName:'table-container'},
  ]

  const rows = listaMedicos?.map(medico => {
    return {
        nombre: medico?.nombre,
        especialidad: medico?.especialidad?.nombre,
        eps: medico?.eps?.nombre,
        id:medico?.id
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

export default ListarMedicos