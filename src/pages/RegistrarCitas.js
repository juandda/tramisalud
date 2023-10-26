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

function RegistrarCita() {

    const initialValues = {
        direccion: "",
        fecha:"",
        hora:""
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required(),
        fecha:Yup.date().required(),
    })

    let navigate = useNavigate();

    const [listaMedicos, setListaMedicos] = useState([]);

    const [medico, setMedico] = useState('');

    useEffect(() =>{
        axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/medicos", {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        }).then((response) => {
            setListaMedicos(response.data);
        });
    },[]);

    const handleChange = (event) => {
        setMedico(event.target.value);
    }

    const onSubmit= (data) =>{

        axios.post("https://tramisalud-08cd54cb2a05.herokuapp.com/citas", 
            {
                direccion:data.direccion,
                fecha: data.fecha,
                hora: data.hora,
                estado:true,
                medicoId: medico, 
            },
            {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                  },
            }).then((response) =>{   
                Swal.fire({
                    icon: 'success',
                    title: 'la cita se ha registrado correctamente'
                })
                setTimeout(function(){
                    navigate("/listarCitas");
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
                >
                    <Form className="formContainer">
                        <h2> Registro de citas</h2>
                        <ErrorMessage name="direccion" component="span" />
                        <Field
                            autoComplete="off"
                            id="inputCreatePost"
                            name="direccion"
                            placeholder="Direccion"
                            label = "Direccion"
                        />

                        <ErrorMessage name="fecha" component="span" />
                        <Field
                            autoComplete="off"
                            type="date"
                            id="inputCreatePost"
                            name="fecha"
                            placeholder="Fecha"
                            label = "Fecha"
                        />

                        <ErrorMessage name="hora" component="span" />
                        <Field
                            type="time"
                            id="inputCreatePost"
                            name="hora"
                            placeholder="hora"
                            label = "hora"
                        />
                        

                        <InputLabel id="medico-id">Medico</InputLabel>
                        <Select
                            labelId="medico-id"
                            id="select-medico"
                            value={medico}
                            onChange={handleChange}
                            sx = {{width:200}}
                        >
                            {listaMedicos.map((medico) => {
                                return(
                                    <MenuItem key={medico.id} value={medico.id}>{medico.nombre}</MenuItem>
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

export default RegistrarCita;


