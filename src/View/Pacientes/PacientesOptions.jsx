
// App.js

import '../styles/Login.css';

import image from '../img/fondoPaciente.png';
import logo from '../img/CognitiveX-logo.svg';
import Header from '../../header';
import './stylePacientes.css';
import addIcon from '../../assets/icons/addIcon.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import editIcon from '../../assets/icons/editIcon.png';

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Asegúrate de importar axios o la biblioteca que estés utilizando para hacer solicitudes HTTP.
// Otras importaciones...
import backendUrl from '../../configServer';
import Swal from 'sweetalert2';

function PacientesOptions() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);


  const deletePaciente = (id) => {

    Swal.fire({
      title: '¿Seguro que quieres eliminarlo?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Accept',
      denyButtonText: `Don't save`,
      willClose: () => {
        // Este código se ejecuta cuando el alert se cierra
        window.location.reload();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(backendUrl + '/api/paciente/delete/' + id)
          .then(response => {
            if (response.status === 200) {
              Swal.fire('Eliminado!', '', 'success');
            }
            
          })
          .catch(error => {
            console.error('Error al eliminar paciente:', error);
          });
      } else if (result.isDenied) {
        // Hacer algo si se deniega
      }
    });
    

    
  }
  
  const goToEdit = (data) => {

   
    navigate('/PacientesModify1', { state: { data } });
  }

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener los datos de pacientes
    axios.get(backendUrl+'/api/pacientes') // Ajusta la URL de la API según tu configuración
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de pacientes:', error);
      });
  }, []);

  return (
    <html>
    <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css'></link>
    <header>
      <Header />
    </header>
    <body className='containerPacientesMenu'>

      <h3 className='secondTittle'>Pacientes</h3>

      <div className='TablecontainerPacientes'>
        <table class="pacientes-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>FechaNacimeinto</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
        {pacientes.map(paciente => (
          <tr key={paciente.pid}>
            <td>{paciente.nombre}</td>
            <td>{paciente.apellidop}</td>
            <td>{paciente.apellidom}</td>
            <td>{paciente.fechaingreso}</td>
            <td className='iconTable' onClick={() => goToEdit(paciente)}><img src={editIcon} className='iconIMG'/></td>
            <td className='iconTable'  onClick={() => deletePaciente(paciente.pid)}><img src={deleteIcon} className='iconIMG'/></td>
          </tr>
        ))}
      </tbody>

        </table>
      </div>



    </body>
  </html>
  );
}

export default PacientesOptions;
