import React, { useState, useEffect } from 'react';
import './styleQuizz.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import backendUrl from '../../configServer';

const QuizApp = ({ questions, pacienteID, rutinaID }) => {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const startTimer = () => {
    setQuestionStartTime(new Date());
    setTimerRunning(true);
  };

  const stopTimer = () => {
    const endTime = new Date();
    const questionTimeInSeconds = (endTime - questionStartTime) / 1000;
    setTotalTime(totalTime + questionTimeInSeconds);
    setTimerRunning(false);
  };

  const handleAnswer = (selectedOptionIndex) => {
    if (selectedOptionIndex === questions[currentQuestion].correctOptionIndex) {
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      if (quizStarted) {
        // Inicia el temporizador para la siguiente pregunta
      }
    } else {
      if (quizStarted) {
        stopTimer(); // Detiene el temporizador cuando se completa el cuestionario
      }
      setIsQuizOver(true);
    }
  };

  const startQuiz = () => {
    setCurrentQuestion(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setIsQuizOver(false);
    setQuizStarted(true);
    startTimer(); // Inicia el temporizador al comenzar el cuestionario
  };

  const FinalAlert = () => {
    stopTimer(); // Detiene el temporizador al ver los resultados
    const totalQuizTime = totalTime.toFixed(0);
    let tiempo = parseFloat(totalTime.toFixed(0));
    
    const prom = (totalTime / questions.length).toFixed(2);
    let promedio = parseFloat(prom);
    Swal.fire({
      title: 'Resultados de quizz',
      text:
        `Has obtenido ${correctAnswers} aciertos y ${incorrectAnswers} errores. ` +
        `Tiempo total del quiz: ${totalQuizTime} segundos.`,
      icon: 'info',
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Guardar',
      denyButtonText: 'Reiniciar',
      cancelButtonText: 'Salir',
    }).then((result) => {
      if (result.isConfirmed) {
       
        Swal.fire({
          title: "Ingresa un comentario",
          input: "text",
          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonText: "Agregar",
          showLoaderOnConfirm: true,
          preConfirm: async (comentario) => {
            try {
              const dataJSON = {
                "Tiempo": tiempo,
                "Aciertos": correctAnswers,
                "Errores": incorrectAnswers,
                "TiempoPromedio": promedio,
                "Comentario": comentario,
                "PID": pacienteID,
                "RID": rutinaID
              };
    
              // Realizar la solicitud para agregar estadísticas aquí...
              axios.post(backendUrl + '/api/estadisticas/add', dataJSON)
              .then(response => {
                // Realizar acciones después de guardar exitosamente (por ejemplo, redireccionar).
                if (response.status === 201) {
                  // La solicitud se completó con éxito (código de estado 200 OK).
                  // Realiza acciones después de guardar exitosamente, por ejemplo, redirigir.
                  console.log('Guardado exitosamente');
                  // Ejemplo de redirección a una página de éxito.
                  // navigate('/exito');
                  Swal.fire({
                    title: 'Guardado',
                    text: 'Se ha guardado el resultado',
                    icon: 'success',
                  });
                  goReturn();
                } else {
                  // La solicitud no se completó con éxito, puedes manejar errores aquí.
                  console.log('Error al guardar');
                  goReturn();
                }
              })
              .catch(error => {
                console.error('Error al guardar paciente:', error);
                // Realizar acciones en caso de error.
              });

              // Puedes mostrar un mensaje de éxito o realizar otras acciones si lo deseas.
             
            } catch (error) {
              Swal.showValidationMessage(`
                Request failed: ${error}
              `);
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        });
      } else if (result.isDenied) {
        window.location.reload();
      } else {
        goReturn();
      }
    });
    



  };

  const goReturn = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!quizStarted) {
      startQuiz();
      startTimer();
    }
  }, []);



  return (
    <div className="quiz-container">
      <header className="quiz-header">
        <h1>{questions[currentQuestion].title}</h1>
        <h1>Nivel: {questions[currentQuestion].level}</h1>
      </header>
      {isQuizOver ? (
        <div>
          <h2>¡Quiz completado! </h2>
          
          <button onClick={FinalAlert}> Ver resultados</button>
        </div>
      ) : (
        <div>
          <h1>Pregunta {currentQuestion + 1}</h1>
          <img
            className="question-image"
            src={questions[currentQuestion].questionImage}
            alt="Pregunta"
          />
          <div className="answer-options">
            {questions[currentQuestion].options.map((option, index) => (
              <img
                key={index}
                className="option-image"
                src={option}
                alt={`Opción ${index + 1}`}
                onClick={() => handleAnswer(index)}
              />
            ))}
          </div>
          {quizStarted && !timerRunning && (
            <button onClick={startTimer}>Iniciar Temporizador</button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
