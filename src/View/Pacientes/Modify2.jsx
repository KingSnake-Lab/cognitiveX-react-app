
// App.js
import React, { useState } from 'react';
import '../styles/Login.css';

import image from '../img/fondoPaciente.png';
import logo from '../img/CognitiveX-logo.svg';
import Header from '../../header';
import './stylePacientes.css';
import addIcon from '../../assets/icons/addIcon.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import editIcon from '../../assets/icons/editIcon.png';
import backendUrl from '../../configServer';
import axios from 'axios';
import { useNavigate, useLocation} from "react-router-dom";

function Modify2() {
    const location = useLocation();
    const { datasocial } = location.state; // Obten los datos del usuario a editar
    const [infoData, setInfoData] = useState(datasocial);

    const navigate = useNavigate(); // Get the navigation function

    const NavSiguiente = () => {
        navigate('/FormPacientes3');
      }
    
      const Back = () => {
        navigate(-1);
      }

    
      // Obtener los datos del paciente de props.location.state
      const pacienteData = location.state && location.state.pacienteData;
      const a = () => {
        alert(pacienteData.Nombre);
      }

      const handleEditSubmit = (e) => {
        e.preventDefault();
  
        //constuir json
        const newData = {
            niveleducativo: infoData.niveleducativo,
            profesion: infoData.profesion,
            estadocivil: infoData.estadocivil
        }
        // Realiza la solicitud de actualización al servidor con los datos de userData
        axios.put(backendUrl + `/api/pacientes/updateSocial/${infoData.pid}`, newData)
            .then((response) => {
                if (response.status === 200) {
                    // Redirige al usuario a la página de detalles del usuario o a donde desees
                    goToMedico();
                }
            })
            .catch((error) => {
                console.error('Error al editar usuario:', error);
            });
    };
  
      const goToMedico = () => {
        axios.get(backendUrl + `/api/pacientes/medico/${infoData.pid}`)
            .then((response) => {
                const datamedico = response.data;
                console.log(datamedico); // Imprime infoData, no 'a'
                
                navigate('/Modify3', { state: { datamedico } });
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

                <h3 className='secondTittle'>Editar información social</h3>
                <p>No dejes ningún campo en blanco</p>
               
                <div className='containerForm'>
                    <form className='formPacientes' onSubmit={handleEditSubmit}>

                        <input className='inputForm' 
                        type='text' placeholder='Nivel educativo'
                        name='NivelEducativo'
                        value={infoData.niveleducativo}
                        onChange={(e) => setInfoData({ ...infoData, niveleducativo: e.target.value })}/>

                        <input className='inputForm' type='text' 
                        placeholder='Profesión'
                        name='Profesion'
                        value={infoData.profesion}
                        onChange={(e) => setInfoData({ ...infoData, profesion: e.target.value })}/>

                        <input className='inputForm' type='text' 
                        placeholder='Estado Civil'
                        name='EstadoCivil'
                        value={infoData.estadocivil}
                        onChange={(e) => setInfoData({ ...infoData, estadocivil: e.target.value })}/>

                        <input type='button' className='ButtonSecondary' onClick={a} value="Regresar"/>
                        <button className='ButtonPrimary' >Siguiente</button>
                        
                    </form>
                   
                </div>
            </body>
        </html>
    );
}

export default Modify2;
