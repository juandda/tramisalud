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

function RegistrarEspecialidad    () {

    const initialValues = {
        nombre: "",
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required()
    })
    let navigate = useNavigate();

    const onSubmit= (data) =>{
        axios.post("https://tramisalud-08cd54cb2a05.herokuapp.com/especialidades", 
            {
                nombre:data.nombre
            },{
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                  },
            }).then((response) =>{   
                Swal.fire({
                    icon: 'success',
                    title: 'la especialidad se ha registrado correctamente'
                })
                setTimeout(function(){
                    navigate("/listarEspecialidades");
                  }, 3000)
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
                        <h2> Registro de Especialidad</h2>
                        <ErrorMessage name="nombre" component="span" />
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="nombre"
                            placeholder="Nombre"
                            label = "Nombre"
                        />

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


export default RegistrarEspecialidad;


