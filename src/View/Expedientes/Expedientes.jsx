

import Header from '../../header';


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

import ActividadPanel from '../Actividades/actividadesDashboard';
import { useLocation } from 'react-router-dom';


function Expedientes() {

  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);

  const navigate = useNavigate();
  const [estadisticas, setEstadisticas] = useState([]);
  const [pacienteInfo, setPacienteInfo] = useState([]);
  const [socialInfo, setSocial] = useState([]);
  const [medicoInfo, setMedico] = useState([]);






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







  

  const updateTable = (PID) => {
    axios.get(backendUrl + '/api/estadisticas/'+ PID) // Ajusta la URL de la API según tu configuración
    .then(response => {
      setEstadisticas(response.data);

      axios.get(backendUrl + '/api/estadisticas/paciente/'+ PID) // Ajusta la URL de la API según tu configuración
    .then(response => {
      setPacienteInfo(response.data);

      //social
      axios.get(backendUrl + '/api/estadisticas/social/'+ PID) // Ajusta la URL de la API según tu configuración
      .then(response => {
        setSocial(response.data);

        //medico
         axios.get(backendUrl + '/api/estadisticas/medica/'+ PID) // Ajusta la URL de la API según tu configuración
    .then(response => {
      setMedico(response.data);
    })
    .catch(error => {
      console.error('Error al obtener datos de pacientes:', error);
    });
      })
      .catch(error => {
        console.error('Error al obtener datos de pacientes:', error);
      });

    })
    .catch(error => {
      console.error('Error al obtener datos de pacientes:', error);
    });

    })
    .catch(error => {
      console.error('Error al obtener datos de pacientes:', error);
    });

  }

  return (
    <div className="ContentHome">
      <Header />
      <div className="contentActivities">
        <div className="contTitle">
          <h1 className='title'>Expedientes</h1>
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

<input type='button' value='Ver' className='btnAgregar' onClick={() => updateTable(selectedPaciente)}></input>


        </div>
        <p className='' >Rutinas realizadas</p>
        <div className="contTable">
          <table class="pacientes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha </th>
                <th>Aciertos</th>
                <th>Errores</th>
                <th>Tiempo total</th>
                <th>Tiempo promedio por pregunta</th>
                <th>Comentarios</th>


                
              </tr>
            </thead>
            <tbody>
              {estadisticas.map(rutina => (
                <tr key={rutina.rid}>
                  <td>{rutina.id}</td>
                  <td>{rutina.fecha}</td>
                  <td>{rutina.aciertos}</td>
                  <td>{rutina.errores}</td>
                  <td>{rutina.tiempo}</td>
                  <td>{rutina.tiempopromedio}</td>
                  <td>{rutina.comentario}</td>


                 
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        <p className='' >Información general</p>
        <div className="contTable">
          <table class="pacientes-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido P. </th>
                <th>Apellido M.</th>
                <th>Genero</th>
                <th>Dirección</th>
                <th>Telefono</th>
                <th>Fecha de nacimiento</th>
                <th>Fecha de ingreso</th>


                
              </tr>
            </thead>
            <tbody>
              {pacienteInfo.map(paciente => (
                <tr key={paciente.pid}>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.apellidop}</td>
                  <td>{paciente.apellidom}</td>
                  <td>{paciente.genero}</td>
                  <td>{paciente.direccion}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.fechanacimiento}</td>
                  <td>{paciente.fechaingreso}</td>


                 
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        <p className='' >Información Médica</p>
        <div className="contTable">
          <table class="pacientes-table">
            <thead>
              <tr>
                <th>Enfermedades</th>
                <th>Alergias</th>
                <th>Antecedentes M.</th>
                <th>Medicamentos</th>
                


                
              </tr>
            </thead>
            <tbody>
              {medicoInfo.map(medica => (
                <tr key={medica.pid}>
                  <td>{medica.enfermedades}</td>
                  <td>{medica.alergias}</td>
                  <td>{medica.antecedentes}</td>
                  <td>{medica.medicamentos}</td>
   


                 
                </tr>
              ))}
            </tbody>

          </table>
        </div>
        <p className='' >Información Social</p>
        <div className="contTable">
          <table class="pacientes-table">
            <thead>
              <tr>
                <th>Nivel educativo</th>
                <th>Profesión</th>
                <th>Estado civil</th>
                


                
              </tr>
            </thead>
            <tbody>
              {socialInfo.map(social => (
                <tr key={social.pid}>
                  <td>{social.niveleducativo}</td>
                  <td>{social.profesion}</td>
                  <td>{social.estadocivil}</td>
                 


                 
                </tr>
              ))}
            </tbody>

          </table>
        </div>


      </div>


    </div>

  );
}
export default Expedientes;