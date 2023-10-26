import React from 'react'
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css'
import { Button, Select, InputLabel,MenuItem } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate }  from 'react-router-dom'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

function Register() {

    const initialValues = {
        nombre: "",
        correo:"",
        fecha_nacimiento:"",
        password:"",
        identificacion:""
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required(),
        correo:Yup.string().required(),
        fecha_nacimiento:Yup.date().required(),
        clave:Yup.string().required(),
        identificacion: Yup.number().required(),
    })

    let navigate = useNavigate();

    const [listaEps, setListaEps] = useState([]);

    const [eps, setEps] = useState('');

    useEffect(() =>{
        axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/eps").then((response) => {
            setListaEps(response.data);
            console.log(response.data);
        });
    },[]);

    const handleChange = (event) => {
        setEps(event.target.value);
    }

    const onSubmit= (data) =>{
        axios.post("https://tramisalud-08cd54cb2a05.herokuapp.com/usuarios", 
            {
                nombre:data.nombre,
                correo:data.correo,
                fecha_nacimiento: data.fecha_nacimiento,
                password:data.clave,
                epsId:eps, 
                identificacion:data.identificacion,
            }).then((response) =>{   
                Swal.fire({
                    icon: 'success',
                    title: 'El usuario se ha registrado correctamente'
                })
        })
        setTimeout(function(){
            navigate("/login");
          }, 2000)
    }

    return (
        <div className='form-container'>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form className="formContainer">
                    <PersonIcon sx={{ fontSize: 110, color: '#393E46'}}></PersonIcon>
                    <ErrorMessage name="nombre" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="nombre"
                        placeholder="Nombre"
                        label = "Nombre"
                    />

                    <ErrorMessage name="correo" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="correo"
                        placeholder="Correo"
                        label = "Correo"
                    />

                    <ErrorMessage name="identificacion" component="span" />
                    <Field
                        autocomplete="off"
                        id="inputCreatePost"
                        name="identificacion"
                        placeholder="Cedula"
                        label = "Identificacion"
                    />

                    <ErrorMessage name="fecha_nacimiento" component="span" />
                    <Field
                        autocomplete="off"
                        type="date"
                        id="inputCreatePost"
                        name="fecha_nacimiento"
                        placeholder="Fecha Nacimiento"
                        label = "Fecha Nacimiento"
                    />

                    <ErrorMessage name="clave" component="span" />
                    <Field
                        autocomplete="off"
                        type="password"
                        id="inputCreatePost"
                        name="clave"
                        placeholder="Clave"
                        label = "Clave"
                    />
                    <InputLabel id="eps-id">Eps</InputLabel>
                    <Select
                        labelId="eps-id"
                        id="select-eps"
                        value={eps}
                        onChange={handleChange}
                        sx = {{width:200}}
                    >
                        {listaEps.map((eps) => {
                            return(
                                <MenuItem key={eps.id} value={eps.id}>{eps.nombre}</MenuItem>
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
    )
}

export default Register