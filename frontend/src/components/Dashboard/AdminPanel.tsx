import React, { useState } from 'react';
import ListaAlumnos from '../Alumno/ListaAlumnos';
import FormularioAlumno from '../Alumno/FormularioAlumno';


type MenuOption = 'alumnos' | 'docentes' | 'aulas' | 'cursos' | 'notas';

const AdminPanel: React.FC = () => {
  const [menu, setMenu] = useState<MenuOption>('alumnos');

  const sidebarStyle: React.CSSProperties = {
    width: '240px',
    backgroundColor: '#f8f9fa',
    borderRight: '1px solid #dee2e6',
    padding: '1.5rem 1rem',
    height: '100vh',
    position: 'sticky',
    top: 0,
    overflowY: 'auto',
  };

  const navTitleStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#2c3e50',
    fontWeight: 600,
  };

  const menuItemStyle: React.CSSProperties = {
    listStyle: 'none',
    margin: '0.5rem 0',
  };

  const buttonStyle = (isActive: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    backgroundColor: isActive ? '#e9ecef' : 'transparent',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1.05rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: isActive ? '#0d6efd' : '#495057',
    fontWeight: isActive ? 600 : 400,
  });

  const mainStyle: React.CSSProperties = {
    flex: 1,
    padding: '2rem',
    backgroundColor: '#ffffff',
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f3f5' }}>
      {/* Sidebar */}
      <nav style={sidebarStyle}>
        <h2 style={navTitleStyle}>Administrador</h2>
        <ul style={{ padding: 0, margin: 0 }}>
          <li style={menuItemStyle}>
            <button onClick={() => setMenu('alumnos')} style={buttonStyle(menu === 'alumnos')}>Alumnos</button>
          </li>
          <li style={menuItemStyle}>
            <button onClick={() => setMenu('docentes')} style={buttonStyle(menu === 'docentes')}>Docentes</button>
          </li>
          <li style={menuItemStyle}>
            <button onClick={() => setMenu('aulas')} style={buttonStyle(menu === 'aulas')}>Aulas</button>
          </li>
          <li style={menuItemStyle}>
            <button onClick={() => setMenu('cursos')} style={buttonStyle(menu === 'cursos')}>Cursos</button>
          </li>
          <li style={menuItemStyle}>
            <button onClick={() => setMenu('notas')} style={buttonStyle(menu === 'notas')}>Notas</button>
          </li>
        </ul>
      </nav>

      {/* Contenido principal */}
      <main style={mainStyle}>
        {menu === 'alumnos' && (
          <>
            <h3 style={{ marginTop: 0, color: '#343a40', fontSize: '1.8rem' }}>Gestión de Alumnos</h3>
            <div style={{ marginBottom: '2rem' }}><FormularioAlumno /></div>
            <ListaAlumnos />
          </>
        )}

   {/*     {menu === 'docentes' && (
          <>
            <h3 style={{ marginTop: 0, color: '#343a40', fontSize: '1.8rem' }}>Gestión de Docentes</h3>
            <div style={{ marginBottom: '2rem' }}><FormularioDocente /></div>
            <ListaDocentes />
          </>
        )}

        {menu === 'aulas' && (
          <>
            <h3 style={{ marginTop: 0, color: '#343a40', fontSize: '1.8rem' }}>Gestión de Aulas</h3>
            <div style={{ marginBottom: '2rem' }}><FormularioAula /></div>
            <ListaAulas />
          </>
        )}

        {menu === 'cursos' && (
          <>
            <h3 style={{ marginTop: 0, color: '#343a40', fontSize: '1.8rem' }}>Gestión de Cursos</h3>
            <div style={{ marginBottom: '2rem' }}><FormularioCurso /></div>
            <ListaCursos />
          </>
        )}

        {menu === 'notas' && (
          <>
            <h3 style={{ marginTop: 0, color: '#343a40', fontSize: '1.8rem' }}>Gestión de Notas</h3>
        Sidebar        <div style={{ marginBottom: '2rem' }}><FormularioNota /></div>
            <ListaNotas />  
          </>
        )}*/} 
      </main>
    </div>
  );
};

export default AdminPanel;
