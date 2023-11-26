import React, { useState, useEffect } from 'react';
import Header from '../../header';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import backendUrl from '../../configServer';
import Chart from 'chart.js/auto';
import './graficas.css';

function MenuEstadisticas() {
  const [estadisticas, setEstadisticas] = useState([]);
  const [aciertosErrores, setAciertosErrores] = useState([]);

  useEffect(() => {
    axios.get(backendUrl + '/api/estadisticas/graphic')
      .then(response => {
        setEstadisticas(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos de pacientes:', error);
      });
  }, []);

  useEffect(() => {
    // Limpiar la instancia anterior de Chart.js
    const canvasGenero = document.getElementById('genero-chart');
    const contextGenero = canvasGenero.getContext('2d');
    contextGenero.clearRect(0, 0, canvasGenero.width, canvasGenero.height);

    const canvasAciertosErrores = document.getElementById('aciertos-errores-chart');
    const contextAciertosErrores = canvasAciertosErrores.getContext('2d');
    contextAciertosErrores.clearRect(0, 0, canvasAciertosErrores.width, canvasAciertosErrores.height);

    const canvasRutinas = document.getElementById('rutinas-chart');
    const contextRutinas = canvasRutinas.getContext('2d');
    contextRutinas.clearRect(0, 0, canvasRutinas.width, canvasRutinas.height);

    // Renderizar los nuevos gráficos
    renderGeneroChart();
    renderAciertosErroresChart();
    renderRutinasChart();
  }, [estadisticas]);

  const generoData = {
    labels: ['Hombres', 'Mujeres'],
    datasets: [
      {
        data: [estadisticas.TotalHombres, estadisticas.TotalMujeres],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const puntajeData = {
    labels: ['Aciertos', 'Errores'],
    datasets: [
      {
        label: ['Aciertos', 'Errores'],
        data: [estadisticas.TotalAciertos, estadisticas.TotalErrores],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const rutinasData = {
    labels: estadisticas.Rutinas ? estadisticas.Rutinas.map(rutina => rutina.nombre) : [],
    datasets: [
      {
        label: 'Cantidad',
        backgroundColor: '#FFC107',
        borderColor: '#FF9800',
        borderWidth: 1,
        hoverBackgroundColor: '#FFC107',
        hoverBorderColor: '#FF9800',
        data: estadisticas.Rutinas ? estadisticas.Rutinas.map(rutina => Number(rutina.cantidad)) : [],
      },
    ],
  };

  const renderGeneroChart = () => {
    const canvas = document.getElementById('genero-chart');
    const context = canvas.getContext('2d');

    if (canvas.chart) {
      canvas.chart.destroy();
    }

    canvas.chart = new Chart(context, {
      type: 'pie',
      data: generoData,
      options: {
        responsive: true,
      },
    });
  };

  const renderAciertosErroresChart = () => {
    const canvas = document.getElementById('aciertos-errores-chart');
    const context = canvas.getContext('2d');

    if (canvas.chart) {
      canvas.chart.destroy();
    }

    canvas.chart = new Chart(context, {
      type: 'bar',
      data: puntajeData,
      options: {
        responsive: true,
      },
    });
  };

  const renderRutinasChart = () => {
    const canvas = document.getElementById('rutinas-chart');
    const context = canvas.getContext('2d');

    if (canvas.chart) {
      canvas.chart.destroy();
    }

    canvas.chart = new Chart(context, {
      type: 'bar',
      data: rutinasData,
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  };

  return (
    <div className="ContentHome">
      <Header />
      <div className="contentActivities">
        <div className="contTitle">
          <h1 className='secondTittle'>Estadísticas</h1>
        </div>
        <div className="fila">
          <div className="GraficaHombres">
            <h4>Gráfica de Hombres y Mujeres</h4>
            <canvas className='grafica' id="genero-chart" />
          </div>
          <div className="GraficaAciertos">
            <h4>Gráfica de aciertos</h4>
            <canvas className='grafica' id="aciertos-errores-chart" />
          </div>
          <div className="GraficaRutinas">
            <h4>Gráfica de Rutinas</h4>
            <canvas className='graficaRutinas' id="rutinas-chart" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuEstadisticas;
