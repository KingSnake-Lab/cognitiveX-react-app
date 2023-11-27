
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

function PacientesAdd3() {

  const location = useLocation();

// Obtener los datos del paciente de props.location.state
const pacienteData2 = location.state && location.state.pacienteData2;
const a = () => {
  alert(pacienteData2.Profesion);
}

const [pacienteDataFinal, setPacienteData] = useState({
  UID: pacienteData2.UID,
  Nombre: pacienteData2.Nombre,
  ApellidoP: pacienteData2.ApellidoP,
  ApellidoM: pacienteData2.ApellidoM,
  Genero: pacienteData2.Genero,
  Direccion: pacienteData2.Direccion,
  telefono: pacienteData2.telefono,
  FechaIngreso: pacienteData2.FechaIngreso,
  FechaNacimiento: pacienteData2.FechaNacimiento,
  NivelEducativo: pacienteData2.NivelEducativo,
  Profesion: pacienteData2.Profesion,
  EstadoCivil: pacienteData2.EstadoCivil

});

const handleChange = (e) => {
  const { name, value } = e.target;
  setPacienteData({ ...pacienteDataFinal, [name]: value });
}
    const navigate = useNavigate(); // Get the navigation function


    const NavSiguiente = () => {
        navigate('/Pacientes');
      }
      const Back = () => {
        navigate(-1);
      }



      const handleSubmit = (e) => {
        e.preventDefault();
    
    
    
        // Ahora puedes realizar operaciones de guardado en la base de datos o cualquier otra acción
        // con la instancia 'paciente', por ejemplo, enviándola a tu servidor.
    
        // Ejemplo de cómo enviar la instancia al servidor usando axios
        axios.post(backendUrl+'/api/paciente/add', pacienteDataFinal)
          .then(response => {
            // Realizar acciones después de guardar exitosamente (por ejemplo, redireccionar).
            if (response.status === 201) {
                // La solicitud se completó con éxito (código de estado 200 OK).
                // Realiza acciones después de guardar exitosamente, por ejemplo, redirigir.
                console.log('Guardado exitosamente');
                // Ejemplo de redirección a una página de éxito.
                // navigate('/exito');
                Swal.fire({
                  icon: 'success',
                  title: 'Paciente agregado',
                  text: 'Se agregó un nuevo paciente',
                  confirmButtonColor: '#4CAF50',
                  confirmButtonText: 'Aceptar'
                })
                navigate('/Home', { state: { pacienteDataFinal } });
              } else {
                // La solicitud no se completó con éxito, puedes manejar errores aquí.
                console.log('Error al guardar');
              }
          })
          .catch(error => {
            console.error('Error al guardar paciente:', error);
            // Realizar acciones en caso de error.
          });
      };

    return (
        <html>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css'></link>
            <header>
                <Header />
            </header>
            <body className='containerPacientesMenu'>

                <h3 className='secondTittle'>Información Médica</h3>
                <p>No dejes </p>
                <div className='containerForm' onSubmit={handleSubmit}>
                    <form className='formPacientes'>

                    <input className='inputForm' 
                        type='text' placeholder='Enfermedades'
                        name='Enfermedades'
                        value={pacienteDataFinal.Enfermedades}
                        onChange={handleChange}/>

<input className='inputForm' 
                        type='text' placeholder='Alergias'
                        name='Alergias'
                        value={pacienteDataFinal.Alergias}
                        onChange={handleChange}/>

<input className='inputForm' 
                        type='text' placeholder='Antecedentes'
                        name='Antecedentes'
                        value={pacienteDataFinal.Antecedentes}
                        onChange={handleChange}/>

<input className='inputForm' 
                        type='text' placeholder='Medicamentos'
                        name='Medicamentos'
                        value={pacienteDataFinal.Medicamentos}
                        onChange={handleChange}/>

                        <input type='button' className='ButtonSecondary' onClick={Back} value="Regresar"/>
                        <button className='ButtonPrimary' >Enviar información</button>

                    </form>
                </div>
            </body>
        </html>
    );
}

export default PacientesAdd3;
