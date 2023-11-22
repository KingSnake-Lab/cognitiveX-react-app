import React from 'react';
import './Header.css'; // Importa un archivo CSS para estilizar el menú
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import ActividadDashboard from './View/Actividades/actividadesDashboard';
import ActivityMenu from './View/Actividades/ActivityMenu';
import  MenuEstadisticas from './View/Estadisticas/MenuEstadisticas';

import logo from './assets/CognitiveX-logo.png'
function Header({uid}) {



  const navigate = useNavigate(); // Get the navigation function

  const goToPacientes = () => {
    navigate('/Pacientes' ,{ state: { uid } }); // Use navigate to go to the '/Pacientes' route
  }
   const goToPersonalAdd = () => {
    navigate('/PersonalAdd'); // Use navigate to go to the '/Pacientes' route
  }
  const goToHome= () => {
    navigate('/Home'); // Use navigate to go to the '/Pacientes' route
  }
  const goToUsuarios= () => {
    navigate('/UsuariosMenu'); // Use navigate to go to the '/Pacientes' route
  }
  const goToActivity= () => {
    navigate('/ActivityMenu'); // Use navigate to go to the '/Pacientes' route
  }
  const goToEstaddisticas= () => {
    navigate('/MenuEstadisticas'); // Use navigate to go to the '/Pacientes' route
  }
  
  return (
    <header className="header">
      <div className="logo">
      <img src={logo}></img>
      </div>
      <nav className="nav">
        <ul>
          <li onClick={goToHome}>Home</li>
          <li onClick={goToPacientes}>Pacientes</li>
          <li onClick={goToUsuarios}>Personal</li>
          <li>Expedientes</li>
          <li onClick={goToEstaddisticas}>Estadísticas</li>
          <li onClick={goToActivity}>Actividades</li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
