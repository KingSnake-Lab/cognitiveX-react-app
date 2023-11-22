

import Header from '../../header';
import './styleMenuActivitie.css';

import axios from 'axios';
import { useNavigate } from "react-router-dom";

import backendUrl from '../../configServer';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';

import addIcon from '../../assets/icons/addIcon.png';
import viewIcon from '../../assets/icons/ojo.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import editIcon from '../../assets/icons/editIcon.png';
import playIcon from '../../assets/icons/playIcon.png';

import ActividadPanel from './actividadesDashboard';
import { useLocation } from 'react-router-dom';


function ActivityMenu() {

  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const navigate = useNavigate();
  const [rutinas, setRutinas] = useState([]);


  const deleteRutina = (id) => {


    axios.delete(backendUrl + '/api/rutinas/delete/' + id)
      .then(response => {
        if (response.status === 200) {
          Swal.fire({
            title: 'Eliminada',
            icon: 'success',

            willClose: () => {
              // Este código se ejecuta cuando el alert se cierra
              window.location.reload();
            }
          });

        }

      })
      .catch(error => {
        console.error('Error al eliminar rutina:', error);
      });


  }

  const viewPersonal = (paciente) => {
    var Nombre = paciente.nombre;

    Swal.fire({
      title: 'Información del usuario',
      icon: 'info',
      html:
        '<b>Nombre: </b> ' + paciente.nombre + '<br>' +
        '<b>Apellido Paterno: </b> ' + paciente.apellidop + '<br>' +
        '<b>Apellido Materno: </b> ' + paciente.apellidom + '<br>' +
        '<b>Email: </b> ' + paciente.email + '<br>' +
        '<b>Password:  </b> ' + paciente.password + '<br>' +
        '<b>Telefono:  </b> ' + paciente.telefono + '<br>' +
        '<b>Genero:  </b> ' + paciente.genero + '<br>' +
        '<b>Cargo:  </b> ' + paciente.cargo + '<br>' +
        '<b>Especialidad: </b> ' + paciente.especialidad + '<br>',

      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Aceptar!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    })
  }

  const goToEdit = (data) => {


    navigate('/ModifyPersonal', { state: { data } });
  }



  useEffect(() => {
    // Realiza una solicitud al servidor para obtener los datos de pacientes
    axios.get(backendUrl + '/api/rutinas/all') // Ajusta la URL de la API según tu configuración
      .then(response => {
        setRutinas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de pacientes:', error);
      });

      axios.get(backendUrl+'/api/pacientes') // Ajusta la URL de la API según tu configuración
      .then(response => {
        setPacientes(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de pacientes:', error);
      });
  }, []);




  const AddRutina = (pacienteID) => {
   
    navigate('/RutinaAdd', { state: { pacienteID } });
  }


   const goActividades = (pacienteID, rutinaID, instrucciones) => {
    if (pacienteID !== null) {
      navigate('/ActividadDashboard', { state: { pacienteID, rutinaID, instrucciones}});
    } else {
      Swal.fire({
        title: 'Selecciona un paciente',
        icon: 'error',
      });
    }
   
  }


  return (
    <div className="ContentHome">
      <Header />
      <div className="contentActivities">
        <div className="contTitle">
          <h1 className='secondTittle'>Rutinas</h1>
        </div>
        <div className="contSub">
          <h4>Seleccionar paciente</h4>
     
          <select
  id="pacientesSelect"
  value={selectedPaciente}
  onChange={(e) => setSelectedPaciente(e.target.value)}
>
  <option value={null}>Selecciona un paciente</option>
  {pacientes.map((paciente) => (
    <option key={paciente.pid} value={paciente.pid}>
      {paciente.nombre} {paciente.apellidop} {paciente.apellidom}
    </option>
  ))}
</select>


        </div>
        <div className="contTable">
          <table class="pacientes-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción </th>
                <th>Fecha de creacion</th>

                <th>Play</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {rutinas.map(rutina => (
                <tr key={rutina.rid}>
                  <td>{rutina.nombre}</td>
                  <td>{rutina.descripcion}</td>
                  <td>{rutina.fechacreacion}</td>

                  <td className='iconTable' onClick={() => goActividades(selectedPaciente, rutina.rid, rutina.instruccions)}><img src={playIcon} className='iconIMG' /></td>
                  <td className='iconTable' onClick={() => goToEdit(rutina)}><img src={editIcon} className='iconIMG' /></td>
                  <td className='iconTable' onClick={() => deleteRutina(rutina.rid)}><img src={deleteIcon} className='iconIMG' /></td>
                </tr>
              ))}
            </tbody>

          </table>






        </div>
        <div className="contFooter">
        <button className="btnAgregar" onClick={() => AddRutina(selectedPaciente)}>Agregar</button>

        </div>
      </div>


    </div>

  );
}
export default ActivityMenu;