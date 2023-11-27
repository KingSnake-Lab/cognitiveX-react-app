import React from 'react';
import QuizApp from './QuizApp'; // Ajusta la ruta a tu archivo QuizApp
import domino from './imgs/domino.json'; // Ajusta la ruta a tu archivo JSON de preguntas
import billetes from './imgs/billetes.json'; // Ajusta la ruta a tu archivo JSON de preguntas
import letras from './imgs/letras.json'; // Ajusta la ruta a tu archivo JSON de preguntas
import comparar from './imgs/comparar.json'; // Ajusta la ruta a tu archivo JSON de preguntas

import gnosiasSiluetas from './imgs/gnosiasSiluetas.json';
import refranes from './imgs/lenguajeRefranes.json';
import temporal from './imgs/temporal.json';

//import questions from './imgs/questions.json'; // Ajusta la ruta a tu archivo JSON de preguntas

import { useLocation } from 'react-router-dom';


function ActividadPanel() {

  const location = useLocation();
  const pacienteID = location.state?.pacienteID;
  const rutinaID = location.state?.rutinaID;
  const instrucciones = location.state?.instrucciones;

  let instruccionesObj;

  try {
    instruccionesObj = JSON.parse(location.state?.instrucciones);
  } catch (error) {
    console.error('Error al analizar JSON de instrucciones:', error);
    // Puedes tomar medidas adicionales aquí, como asignar un valor predeterminado a instruccionesObj
  }




  // Función para cargar dinámicamente las imágenes
  const loadImage = (imageName) => {
    try {
      return require(`./imgs/${imageName}`);
    } catch (e) {
      // Maneja cualquier error, como imagen no encontrada
      console.error(e);
      return null;
    }
  };

  const questionsTOTAL = [...domino, ...billetes, ...letras, ...comparar, ...gnosiasSiluetas, ...refranes, ...temporal];


  const ver = () => {
    
  }
  const verRecibido = () => {
    console.log(instruccionesObj);
  }

  // Función para filtrar las preguntas según las instrucciones
const filtrarPreguntas = (preguntas, instrucciones) => {
  const preguntasFiltradas = [];

  instrucciones.forEach(instruccion => {
    const { actividad, n1, n2, n3 } = instruccion;

    const preguntasActividad = preguntas.filter(
      pregunta => pregunta.type === actividad
    );

    const preguntasNivel1 = preguntasActividad.filter(
      pregunta => pregunta.level === "1"
    ).slice(0, n1);

    const preguntasNivel2 = preguntasActividad.filter(
      pregunta => pregunta.level === "2"
    ).slice(0, n2);

    const preguntasNivel3 = preguntasActividad.filter(
      pregunta => pregunta.level === "3"
    ).slice(0, n3);

    preguntasFiltradas.push(...preguntasNivel1, ...preguntasNivel2, ...preguntasNivel3);
  });

  return preguntasFiltradas;
};


  const instruccionesTEST = [
    {
      "actividad": "domino",
      "n1": 1,
      "n2": 2,
      "n3": 1  
    },
    {
      "actividad": "billetes",
      "n1": 2,
      "n2": 2,
      "n3": 2  
    },
    // ... (otras instrucciones si las hay)
  ];

// Aplicar la función y obtener la copia filtrada
const questions = filtrarPreguntas(questionsTOTAL, instruccionesObj);

// Imprimir la copia filtrada
console.log(questions);



   // Mapea las rutas de las imágenes en el JSON a las imágenes reales   
   const questionsWithImages = questions.map((question) => ({
    ...question,
    questionImage: loadImage(question.questionImage),
    options: question.options.map((option) => loadImage(option)),
  }));

  // <QuizApp questions={questionsWithImages} pacienteID={pacienteID} rutinaID={rutinaID} />
  return (
    <div className="App">

     <QuizApp questions={questionsWithImages} pacienteID={pacienteID} rutinaID={rutinaID} />
    
    </div>
  );
}

export default ActividadPanel;
