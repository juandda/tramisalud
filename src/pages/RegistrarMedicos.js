import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import '../App.css';
import { Button, Select, InputLabel,MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Swal from 'sweetalert2';
import NavBar  from './NavBar';
//sweet alert

function RegistrarMedico    () {

    const initialValues = {
        nombre: "",
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required()
    })

    let navigate = useNavigate();

    const [listaEps, setListaEps] = useState([]);

    const [eps, setEps] = useState('');

    const [listaEspecialidades, setListaEspecialidades] = useState([]);

    const [especialidad, setEspecialidad] = useState('');



    useEffect(() =>{
        axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/eps",{
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        }).then((response) => {
            setListaEps(response.data);
            console.log(response.data);
        });

        axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/especialidades",{
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        }).then((response) => {
            setListaEspecialidades(response.data);
            console.log(response.data);
        });
    },[]);

    const handleChangeEspecialidad = (event) => {
        setEspecialidad(event.target.value);
    }

    const handleChangeEps = (event) => {
        setEps(event.target.value);
    }


    const onSubmit= (data) =>{
        axios.post("https://tramisalud-08cd54cb2a05.herokuapp.com/medicos",{
                nombre:data.nombre,
                epsId:eps, 
                especialidadId:especialidad, 
            }, 
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                  },
            }).then((response) =>{   
                Swal.fire({
                    icon: 'success',
                    title: 'El medico se ha registrado correctamente'
                })
                setTimeout(function(){
                    navigate("/listarMedicos");
                  }, 2000)
        })
    }

    return (
        <>
            <NavBar/>
             <div className='form-container'>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    <Form className="formContainer">
                        <h2> Registro de Medicos</h2>
                        <ErrorMessage name="nombre" component="span" />
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="nombre"
                            placeholder="Nombre"
                            label = "Nombre"
                        />

                    
                        <InputLabel id="eps-id">Eps</InputLabel>
                        <Select
                            labelId="eps-id"
                            id="select-eps"
                            value={eps}
                            onChange={handleChangeEps}
                            sx = {{width:200}}
                        >
                            {listaEps.map((eps) => {
                                return(
                                    <MenuItem key={eps.id} value={eps.id}>{eps.nombre}</MenuItem>
                                );
                            })}
                        </Select>

                        <InputLabel id="especialidad-id">especialidad</InputLabel>
                        <Select
                            labelId="especialidad-id"
                            id="select-especialidad"
                            value={especialidad}
                            onChange={handleChangeEspecialidad}
                            sx = {{width:200}}
                        >
                            {listaEspecialidades.map((especialidad) => {
                                return(
                                    <MenuItem key={especialidad.id} value={especialidad.id}>{especialidad.nombre}</MenuItem>
                                );
                            })}
                        </Select>

                        <Button 
                            sx={{backgroundColor: 'white',
                                marginTop: '30px',
                                color: '#393E46'}}
                            type = "submit"    
                            onSubmit={onSubmit}>Registrar
                        </Button>
                    </Form>
                </Formik>
            </div>
        </>
       
    )
}


export default RegistrarMedico;


