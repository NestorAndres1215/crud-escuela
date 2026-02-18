import React, { useState } from 'react';
import ListaAlumnos from '../Alumno/ListaAlumnos';
import FormularioAlumno from '../Alumno/FormularioAlumno';
import ListaDocentes from '../Docente/ListaDocentes';
import ListaAulas from '../Aula/ListaAula';
import ListaNotas from '../Nota/ListaNota';
import ListaCursos from '../Curso/ListaCursos';


type MenuOption = 'alumnos' | 'docentes' | 'aulas' | 'cursos' | 'notas';

const AdminPanel: React.FC = () => {
  const [menu, setMenu] = useState<MenuOption>('alumnos');

  const sidebarStyle: React.CSSProperties = {
    width: '240px',
    backgroundColor: '#0B3D91',
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
    color: '#ffffff',
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
    color: isActive ? '#0B3D91' : '#ffffff',
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
      <main style={mainStyle}>
        {menu === 'alumnos' && (
          <>
            <ListaAlumnos />
          </>
        )}

        {menu === 'docentes' && (
          <>
            <ListaDocentes />
          </>
        )}

        {menu === 'aulas' && (
          <>

            <ListaAulas />
          </>
        )}

        {menu === 'cursos' && (
          <>
            <ListaCursos />
          </>
        )}

        {menu === 'notas' && (
          <>
            <ListaNotas />
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
