import * as React from "react";
import { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NavBar(){

    const [rol, setRol] = useState(null);
    let listaMenu = []

    useEffect(() =>{
        axios.get("https://tramisalud-08cd54cb2a05.herokuapp.com/usuarios/miUsuario",{
            headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
        }).then((response) => {
            setRol(response.data.rol);
            console.log(response.data)
        });
    },[]);

    if(rol){
      listaMenu =  [{
        nombre : 'Agendar Cita',
        ruta: "/nuevaCita",
      },
      {
        nombre : 'Mis Citas',
        ruta: "/misCitas",
      },
      {
        nombre : 'Eps',
        ruta: "/listarEps",
      },
      {
        nombre : 'Especialidades',
        ruta: "/listarEspecialidades",
      },
      {
        nombre : 'Medicos',
        ruta: "/listarMedicos",
      },
      {
        nombre : 'Administrar Citas',
        ruta: "/listarCitas",
      }]
    }else{
      listaMenu = [{
        nombre : 'Agendar Cita',
        ruta: "/nuevaCita",
      },
      {
        nombre : 'Mis Citas',
        ruta: "/misCitas",
      }]
    }

    const [state, setState] = useState({
        left: false,
      });
    
    let navigate = useNavigate();

    if(!localStorage.getItem("accessToken")){
      localStorage.removeItem("accessToken");
      navigate("/login")
    };
    
    
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };
    
    const list = (anchor) => (
        <List>
        {listaMenu.map((text, index) => (
          <ListItem key={text.nombre} disablePadding>
            <ListItemButton onClick={() => {navigate(text.ruta)}}>
              <ListItemIcon>
              </ListItemIcon>
              <ListItemText primary={text.nombre} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    );
    
    const logout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login")
    };

    return(
        <AppBar component="nav">
            <Toolbar
            sx={{ display: 'flex', justifyContent:'space-between'  }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Button
                    variant="h6"
                    component="div"
                    sx={{flexGrow: 0, width: 10}}
                    onClick={toggleDrawer('left', true)}
                >
                    <MenuIcon sx={{ fontSize: 35, color: 'white'}} />
                </Button>
                <Box>
                    <Button 
                        sx={{color: 'white'}}
                        onClick={logout}
                    >
                        Cerrar Sesion
                    </Button>
                </Box>
                {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                    >
                    {list(anchor)}
                    </Drawer>
                </React.Fragment>
                ))}
            </Toolbar>
        </AppBar>
    )
}


export default NavBar;
