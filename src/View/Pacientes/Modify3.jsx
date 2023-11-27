
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
import { useNavigate, useLocation} from "react-router-dom";
import React, { useState } from 'react';
import backendUrl from '../../configServer';
import Swal from 'sweetalert2';

function Modify3() {

 const location = useLocation();
  const { datamedico } = location.state; // Obten los datos del usuario a editar
  console.log(datamedico);
  const [infoMedico, setInfoMedico] = useState(datamedico);
  const pid = datamedico.pid;

    const navigate = useNavigate(); // Get the navigation function


    const NavSiguiente = () => {
        navigate('/Pacientes');
      }
      const Back = () => {
        navigate(-1);
      }

      const handleEditSubmit = (e) => {
        e.preventDefault();
  
        //constuir json
        const newData = {
          enfermedades: infoMedico.enfermedades,
          alergias: infoMedico.alergias,
          antecedentes: infoMedico.antecedentes,
          medicamentos: infoMedico.medicamentos
        }
        // Realiza la solicitud de actualización al servidor con los datos de userData
        axios.put(backendUrl + `/api/pacientes/updateMedico/${pid}`, newData)
            .then((response) => {
                if (response.status === 200) {
                    // Redirige al usuario a la página de detalles del usuario o a donde desees
                    Swal.fire({
                      icon: 'success',
                      title: 'Paciente editado',
                      text: 'Se editó un paciente',
                      confirmButtonColor: '#4CAF50',
                      confirmButtonText: 'Aceptar'
                    })
                    navigate('/Home');
                }
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

                <h3 className='secondTittle'>Editar información Médica</h3>
                <p>No dejes información en blanco</p>
              
                <div className='containerForm'>
                    <form className='formPacientes' onSubmit={handleEditSubmit}>

                    <input className='inputForm' 
                        type='text' placeholder='Enfermedades'
                        name='Enfermedades'
                        value={infoMedico.enfermedades}
                        onChange={(e) => setInfoMedico({ ...infoMedico, enfermedades: e.target.value })}/>

<input className='inputForm' 
                        type='text' placeholder='Alergias'
                        name='Alergias'
                        value={infoMedico.alergias}
                        onChange={(e) => setInfoMedico({ ...infoMedico, alergias: e.target.value })}/>

<input className='inputForm' 
                        type='text' placeholder='Antecedentes'
                        name='Antecedentes'
                        value={infoMedico.antecedentes}
                        onChange={(e) => setInfoMedico({ ...infoMedico, antecedentes: e.target.value })}/>

<input className='inputForm' 
                        type='text' placeholder='Medicamentos'
                        name='Medicamentos'
                        value={infoMedico.medicamentos}
                        onChange={(e) => setInfoMedico({ ...infoMedico, medicamentos: e.target.value })}/>

                     
                        <button className='ButtonPrimary' >Enviar información</button>

                    </form>
                </div>
            </body>
        </html>
    );
}

export default Modify3;
