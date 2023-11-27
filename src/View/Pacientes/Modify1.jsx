
// App.js

import '../styles/Login.css';

import image from '../img/fondoPaciente.png';
import logo from '../img/CognitiveX-logo.svg';
import Header from '../../header';
import './stylePacientes.css';
import addIcon from '../../assets/icons/addIcon.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import editIcon from '../../assets/icons/editIcon.png';
import axios from 'axios';
import { useNavigate , useLocation} from "react-router-dom";
import React, { useState } from 'react';
import backendUrl from '../../configServer';


function PacientesModify1() {
    const location = useLocation();
    const { data } = location.state; // Obten los datos del usuario a editar

    // Inicializa el estado con los datos del usuario
    const [userData, setUserData] = useState(data);
   


   
    const { uid } = location.state;
    const navigate = useNavigate(); // Get the navigation function

    const NavSiguiente = () => {
        navigate('/FormPacientes2', { state: { pacienteData } });
      }
      const Back = () => {
        navigate(-1);
      }

       // Estado para almacenar los datos del paciente
    const [pacienteData, setPacienteData] = useState({
        UID: uid
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }



    const handleEditSubmit = (e) => {
        e.preventDefault();
  
        //constuir json
        const newData = {
            nombre: userData.nombre,
            apellidop: userData.apellidop,
            apellidom: userData.apellidom,
            genero: userData.genero,
            direccion: userData.direccion,
            telefono: userData.telefono,
            fechaingreso: userData.fechaingreso,
            fechanacimiento: userData.fechanacimiento
        }
        // Realiza la solicitud de actualización al servidor con los datos de userData
        axios.put(backendUrl + `/api/pacientes/update/${userData.pid}`, newData)
            .then((response) => {
                if (response.status === 200) {
                    // Redirige al usuario a la página de detalles del usuario o a donde desees
                    goToSocial();
                }
            })
            .catch((error) => {
                console.error('Error al editar usuario:', error);
            });
    };

    const goToSocial = () => {
        axios.get(backendUrl + `/api/pacientes/social/${userData.pid}`)
            .then((response) => {
                const datasocial = response.data;
                console.log(datasocial); // Imprime infoData, no 'a'
                
                navigate('/Modify2', { state: { datasocial } });
            })
            .catch((error) => {
                console.error('Error al editar usuario:', error);
            });
    };
    

    return (
        <html>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css'></link>
            <header>
                <Header />
            </header>
            <body className='containerPacientesMenu'>

                <h3 className='secondTittle'>Edita la información</h3>
                <p>No dejes ningún campo en blanco </p>
               <p>{userData.telefono}</p>
                <div className='containerForm'>
                <form className='formPacientes' onSubmit={handleEditSubmit} >
                    <input
                        className='inputForm'
                        type='text'
                        name='Nombre'
                        placeholder='Nombre(s)'
                        value={userData.nombre}
                        onChange={(e) => setUserData({ ...userData, nombre: e.target.value })}
                    />
                    <input
                        className='inputForm'
                        type='text'
                        name='ApellidoP'
                        placeholder='Apellido Paterno'
                        value={userData.apellidop}
                        onChange={(e) => setUserData({ ...userData, apellidop: e.target.value })}
                    />
                    <input
                        className='inputForm'
                        type='text'
                        name='ApellidoM'
                        placeholder='Apellido Materno'
                        value={userData.apellidom}
                        onChange={(e) => setUserData({ ...userData, apellidom: e.target.value })}
                    />
                    <div className='contentInput'>
                        <input
                            className='inputTelefono'
                            type="text"
                            name='telefono'
                            placeholder='Telefono'
                            value={userData.telefono}
                            onChange={(e) => setUserData({ ...userData, telefono: e.target.value })}
                        />
                        <select
                            className='inputSexo'
                            name='Genero'
                            value={userData.genero}
                            onChange={(e) => setUserData({ ...userData, genero: e.target.value })}
                        >
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                        </select>
                    </div>
                    <input
                        className='inputForm'
                        type='text'
                        name='Direccion'
                        placeholder='Dirección'
                        value={userData.direccion}
                        onChange={(e) => setUserData({ ...userData, direccion: e.target.value })}
                    />
                    <div className='contentInput'>
                        <input
                            className='inputTelefono'
                            type='date'
                            name='FechaIngreso'
                            placeholder='Fecha'
                            value={userData.fechaingreso}
                            onChange={(e) => setUserData({ ...userData, fechaingreso: e.target.value })}
                        />
                        <input
                            className='inputIngreso'
                            type='date'
                            name='FechaNacimiento'
                            placeholder='Ingreso'
                            value={userData.fechanacimiento}
                            onChange={(e) => setUserData({ ...userData, fechanacimiento: e.target.value })}
                        />
                    </div>
                    <input
                        type='button'
                        className='ButtonSecondary'
                        onClick={Back}
                        value="Regresar"
                    />
                    <button className='ButtonPrimary' >Siguiente</button>
                </form>
            </div>
            </body>
        </html>
    );
}

export default PacientesModify1;
