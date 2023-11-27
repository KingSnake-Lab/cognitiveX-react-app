import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {createBrowserRouter, Navigate, RouterProvider,} from "react-router-dom";
import ErrorPage from "./error-page";

import Login from "./View/Login/Login";
import Home from './View/Home/Home';
import PacientesMenu from './View/Pacientes/PacientesMenu';
import PacientesOptions from './View/Pacientes/PacientesOptions';
import PacientesAdd1 from './View/Pacientes/PacientesAdd1';
import PacientesAdd2 from './View/Pacientes/PacientesAdd2';
import PacientesAdd3 from './View/Pacientes/PacientesAdd3';
import PersonalAdd from './View/Personal/addPersonal';
import PersonalMenu from './View/Personal/PersonalMenu';
import PersonalDashboard from './View/Personal/PersonalDashboard';
import ModifyPersonal from './View/Personal/ModifyPersonal';
import ActividadDashboard from './View/Actividades/actividadesDashboard';

import ActivityMenu from './View/Actividades/ActivityMenu';
import RutinaAdd from './View/Actividades/addRutina';

import MenuEstadisticas from './View/Estadisticas/MenuEstadisticas';
import Expedientes from './View/Expedientes/Expedientes';

import PacientesModify1 from './View/Pacientes/Modify1';
import Modify2 from './View/Pacientes/Modify2';
import Modify3 from './View/Pacientes/Modify3';

import ModifyRutina from './View/Actividades/modifyRutina';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="Login"/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/Login",
    element:  <Login/>,
  },
  {
    path: "/Home",
    element:  <Home/>,
  },
  {
    path: "/Pacientes",
    element:  <PacientesMenu/>,
  },
  {
    path: "/PacientesOptions",
    element:  <PacientesOptions/>,
  },
  {
    path: "/FormPacientes1",
    element:  <PacientesAdd1/>,
  },
  {
    path: "/FormPacientes2",
    element:  <PacientesAdd2/>,
  },
  {
    path: "/FormPacientes3",
    element:  <PacientesAdd3/>,
  },

  {
    path: "/PersonalAdd",
    element:  <PersonalAdd/>,
  },
  {
    path: "/UsuariosMenu",
    element:  <PersonalMenu/>,
  },
  {
    path: "/PersonalDashboard",
    element:  <PersonalDashboard/>,
  },
  {
    path: "/ModifyPersonal",
    element:  <ModifyPersonal/>,
  },

  {
    path: "/ActividadDashboard",
    element:  <ActividadDashboard/>,
  },
  {
    path: "/ActivityMenu",
    element:  <ActivityMenu/>,
  },
  {
    path: "/RutinaAdd",
    element:  <RutinaAdd/>,
  },
  {
    path: "/MenuEstadisticas",
    element:  <MenuEstadisticas/>,
  },
  {
    path: "/Expedientes",
    element:  <Expedientes/>,
  },
  {
    path: "/PacientesModify1",
    element:  <PacientesModify1/>,
  },
  {
    path: "/Modify2",
    element:  <Modify2/>,
  },
  {
    path: "/Modify3",
    element:  <Modify3/>,
  },
  {
    path: "/ModifyRutina",
    element:  <ModifyRutina/>,
  },
  
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
