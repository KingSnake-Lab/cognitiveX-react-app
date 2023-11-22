import React from 'react';
import QuizApp from './QuizApp'; // Ajusta la ruta a tu archivo QuizApp
import domino from './imgs/domino.json'; // Ajusta la ruta a tu archivo JSON de preguntas
import billetes from './imgs/billetes.json'; // Ajusta la ruta a tu archivo JSON de preguntas
import letras from './imgs/letras.json'; // Ajusta la ruta a tu archivo JSON de preguntas
import comparar from './imgs/comparar.json'; // Ajusta la ruta a tu archivo JSON de preguntas

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

  const questions = [...domino, ...comparar];


   // Mapea las rutas de las imágenes en el JSON a las imágenes reales   
   const questionsWithImages = questions.map((question) => ({
    ...question,
    questionImage: loadImage(question.questionImage),
    options: question.options.map((option) => loadImage(option)),
  }));


  const ver = () => {
    console.log(combinedData);
  }
  const verRecibido = () => {
    console.log(instruccionesObj);
  }


  // <QuizApp questions={questionsWithImages} pacienteID={pacienteID} rutinaID={rutinaID} />
  return (
    <div className="App">
     <button onClick={ver}>Ver</button>
     <button onClick={verRecibido}>Ver recibido</button>
     <h1>{instrucciones}</h1>
      <QuizApp questions={questionsWithImages} pacienteID={pacienteID} rutinaID={rutinaID} />

    
    </div>
  );
}

export default ActividadPanel;
