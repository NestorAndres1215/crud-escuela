import React from 'react';
import { Routes, Route, Navigate, NavLink } from 'react-router-dom';

import Home from '../Home/Home';
import ListaAlumnos from '../Alumno/ListaAlumnos';
import FormularioAlumno from '../Alumno/FormularioAlumno';
import ActualizarAlumno from '../Alumno/ActualizarAlumno';
import ListaDocentes from '../Docente/ListaDocentes';
import ActualizarDocente from '../Docente/ActualizarDocente';
import FormularioDocente from '../Docente/FormularioDocente';

const AdminPanel: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>

      {/* Sidebar */}
      <aside
        style={{
          width: '220px',
          backgroundColor: '#0B3D91',
          padding: '2rem 1rem',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem', textAlign: 'center' }}>Administrador</h2>

        <NavLink
          to="/"
          style={({ isActive }) => ({
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: isActive ? '#062663' : 'transparent',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Inicio
        </NavLink>

        <NavLink
          to="/alumnos"
          style={({ isActive }) => ({
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: isActive ? '#062663' : 'transparent',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Alumnos
        </NavLink>
        <NavLink
          to="/docentes"
          style={({ isActive }) => ({
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: isActive ? '#062663' : 'transparent',
            textDecoration: 'none',
            fontWeight: isActive ? 'bold' : 'normal'
          })}
        >
          Docente
        </NavLink>

      </aside>

      {/* Contenido */}
      <main style={{
        flex: 1,
        padding: '2rem',
        backgroundColor: '#f4f5f7',
        borderRadius: '0 1rem 1rem 0',
        boxShadow: 'inset 0 0 10px rgba(0,0,0,0.03)'
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/alumnos" element={<ListaAlumnos />} />
          <Route path="/alumnos/nuevo" element={<FormularioAlumno />} />
          <Route path="/alumnos/editar/:id" element={<ActualizarAlumno />} />
          <Route path="/docentes" element={<ListaDocentes />} />
          <Route path="/docentes/nuevo" element={<FormularioDocente />} />
          <Route path="/docentes/editar/:id" element={<ActualizarDocente />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;
