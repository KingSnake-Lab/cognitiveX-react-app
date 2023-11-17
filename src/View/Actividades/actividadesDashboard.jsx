import React from 'react';
import QuizApp from './QuizApp'; // Ajusta la ruta a tu archivo QuizApp
import questions from './imgs/questions.json'; // Ajusta la ruta a tu archivo JSON de preguntas

import { useLocation } from 'react-router-dom';


function ActividadPanel() {

  const location = useLocation();
  const pacienteID = location.state?.pacienteID;

  const id = {
    "id": pacienteID
  }
  //funcion para obtener el instruccion y crear instancia dle json nuevo 

  
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
  
    // Mapea las rutas de las imágenes en el JSON a las imágenes reales
    const questionsWithImages = questions.map((question) => ({
      ...question,
      questionImage: loadImage(question.questionImage),
      options: question.options.map((option) => loadImage(option)),
    }));
  
    return (
      <div className="App">

        <QuizApp questions={questionsWithImages}/>
      </div>
    );
  }

export default ActividadPanel;
