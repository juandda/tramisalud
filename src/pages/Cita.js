import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar  from './NavBar';
//sweet alert

function Cita() {

    const [listaCitas, setListaCitas] = useState([]);

    useEffect(() =>{
        axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/citas",{
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        }).then((response) => {
            setListaCitas(response.data);
            console.log(response.data);
        });
    },[]);

    const reserve =  (id) => {
        const data = { estado: false};
        axios.put(`https://tramisalud-08cd54cb2a05.herokuapp.com/citas/${id}`, data,   {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }).then((response) => {
            Swal.fire({
                icon: 'success',
                title: response.data
            })
            setTimeout(function(){
                window.location.reload();
            }, 2000)
        });
    }

    
    const columns = [
        {field: 'direccion', headerName: 'Direccion', width: 150},
        {field: 'fecha', headerName: 'Fecha', width: 150},
        {field: 'hora', headerName: 'Hora', width: 150},
        {field: 'medico', headerName: 'Medico', width: 150},
        {
            field: 'reserve',
            headerName: 'Reservar',
            renderCell: (cita) =>{
                if(cita.row.estado === true){
                    return(
                        <Button
                        disabled={false}
                        onClick={()=>reserve(cita.id)}
                        >
                            reservar
                        </Button>
                    );
                }else{
                    return(
                        <Button
                        disabled={true}
                        onClick={()=>reserve(cita.id)}
                        >
                            reservar
                        </Button>
                    );
                }
            }
            
        }
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
            <div style={{ height: 500, width: '55%' }} class = "dataGrid-container">
                <DataGrid 
                     sx={{
                        backgroundColor: 'white',
                        display: 'flex',
                        margin: '0 auto',
                        marginTop: '100px',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }} 
                    rows={rows} 
                    columns={columns} 
                    rowsPerPageOptions={[10]}
                    isRowSelectable={(params) => false}/>        
            </div> 
        </>
    )
}

export default Cita;


