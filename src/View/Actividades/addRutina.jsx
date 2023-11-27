
// App.js

import '../styles/Login.css';

import image from '../img/fondoPaciente.png';
import logo from '../img/CognitiveX-logo.svg';
import Header from '../../header';

import addIcon from '../../assets/icons/addIcon.png';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import editIcon from '../../assets/icons/editIcon.png';
import axios from 'axios';
import { useNavigate , useParams} from "react-router-dom";
import React, { useState } from 'react';
import backendUrl from '../../configServer';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';



function RutinaAdd() {
  
  const location = useLocation();
  const pacienteID = location.state?.pacienteID;

    const navigate = useNavigate(); // Get the navigation function

    const Home = () => {
        navigate('/ActivityMenu');
    }
    const Back = () => {
        navigate(-1);
    }

    // Estado para almacenar los datos del paciente
    const [rutinaData, setRutina] = useState({

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRutina({ ...rutinaData, [name]: value });
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        const cadenaJSON = JSON.stringify(data);

      const dataJSON = {
        "Nombre": rutinaData.Nombre,
        "Descripcion": rutinaData.Descripcion,
        "Instruccions": cadenaJSON
      }
        // Ahora puedes realizar operaciones de guardado en la base de datos o cualquier otra acción
        // con la instancia 'paciente', por ejemplo, enviándola a tu servidor.

        // Ejemplo de cómo enviar la instancia al servidor usando axios
        axios.post(backendUrl + '/api/rutinas/add', dataJSON)
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
                        title: 'Agregado',
                        text: 'Se agregó correctamente',
                        confirmButtonColor: '#4CAF50',
                        confirmButtonText: 'Aceptar'
                    });

                    Home();
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

    const help = () => {
        Swal.fire({
            title: "Guía para actividades",
            imageUrl: deleteIcon
          });
    }

// Inicializa el JSON
// Inicializa el JSON como un array
const data = [];

// Función para agregar actividades al JSON
const addActividad = () => {
  Swal.fire({
    title: "Agregar información",
    html: `
      <select id="actividadCombobox" class="swal2-input">
        <option value="domino">Domino</option>
        <option value="Letras">Letras</option>
        <option value="billetes">Billetes</option>
        <option value="comparar">Comparar</option>
        <option value="nocion">Nocion</option>
      </select>
      <input id="nivel1Input" class="swal2-input" placeholder="Nivel 1" type="number" max="5" value="0">
      <input id="nivel2Input" class="swal2-input" placeholder="Nivel 2" type="number" max="5" value="0">
      <input id="nivel3Input" class="swal2-input" placeholder="Nivel 3" type="number" max="5" value="0">
    `,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    showLoaderOnConfirm: true,
    preConfirm: () => {
      const actividadCombobox = document.getElementById('actividadCombobox').value;
      const nivel1Input = parseInt(document.getElementById('nivel1Input').value);
      const nivel2Input = parseInt(document.getElementById('nivel2Input').value);
      const nivel3Input = parseInt(document.getElementById('nivel3Input').value);

      // Limitar el valor máximo a 5
      const limiteNiveles = (valor) => Math.min(5, valor);

      // Agrega la actividad al JSON como un nuevo objeto al array
      const nuevaActividad = {
        actividad: actividadCombobox,
        n1: limiteNiveles(nivel1Input),
        n2: limiteNiveles(nivel2Input),
        n3: limiteNiveles(nivel3Input)
      };

      data.push(nuevaActividad);

      return nuevaActividad;
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      // Actualizar el contenido del textarea con la información del JSON
      const textarea = document.querySelector('.dataAqui');
      textarea.value = JSON.stringify(data, null, 2);

      Swal.fire({
        title: "Información agregada",
        html: `
          <p>Actividad: ${result.value.actividad}</p>
          <p>Nivel 1: ${result.value.n1}</p>
          <p>Nivel 2: ${result.value.n2}</p>
          <p>Nivel 3: ${result.value.n3}</p>
        `
      });
    }
  });
};



  

  const mostrar =(idPaciente, nombre, descripcion, instrucciones) => {
    const cadenaJSON = JSON.stringify(instrucciones);

    Swal.fire({
      title: "Información agregada",  
      html: `
        <p>Paciente: ${idPaciente}</p>
        <p>Nombre: ${nombre}</p>
        <p>Descrip: ${descripcion}</p>
        <p>instrucciones: ${cadenaJSON}</p>
      `
    });
  }

    return (
        <html>
            <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css'></link>
            <header>
                <Header />
            </header>
            <body className='containerPacientesMenu'>

                <h3 className='secondTittle'>Crear una nueva rutina</h3>
                <p>No dejes ningún campo en blanco</p>
                <div className='containerForm'>
                    <form className='formPacientes' onSubmit={handleSubmit}>
                        <input
                            className='inputForm'
                            type='text'
                            name='Nombre'
                            placeholder='Nombre de la rutina'
                            value={rutinaData.Dombre}
                            onChange={handleChange}
                            required
                        />
                        <input
                            className='inputForm'
                            type='text'
                            name='Descripcion'
                            placeholder='Descripción'
                            value={rutinaData.Descripcion}
                            onChange={handleChange}
                            required
                        />
                        <p className='' onClick={help} >¿Tienes dudas con las actividades?</p>

                        <p className='' onClick={addActividad}> + Agregar actividades</p>
                        
                        <textarea 
                        className='dataAqui' readOnly>

                        </textarea>
                        


                        <button className='ButtonPrimary'  >Finalizar</button>
                    </form>
                </div>
            </body>
        </html>
    );
}

export default RutinaAdd;
