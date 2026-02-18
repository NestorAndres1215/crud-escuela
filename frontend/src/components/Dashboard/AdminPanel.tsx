import React, { useState } from 'react';
import ListaAlumnos from '../Alumno/ListaAlumnos';
import FormularioAlumno from '../Alumno/FormularioAlumno';


const AdminPanel: React.FC = () => {
  const [menu, setMenu] = useState<'alumnos' | 'docentes' | 'notas'>('alumnos');

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <nav style={{ width: '200px', borderRight: '1px solid #ccc', padding: '1rem' }}>
        <h2>Administrador</h2>
        <ul>
          <li><button onClick={() => setMenu('alumnos')}>Alumnos</button></li>
          <li><button onClick={() => setMenu('docentes')}>Docentes</button></li>
          <li><button onClick={() => setMenu('notas')}>Notas</button></li>
        </ul>
      </nav>

      {/* Main */}
      <main style={{ flex: 1, padding: '1rem' }}>
        {menu === 'alumnos' && (
          <>
            <h3>Alumnos</h3>
            <FormularioAlumno />
            <ListaAlumnos />
          </>
        )}


       
      </main>
    </div>
  );
};

export default AdminPanel;
