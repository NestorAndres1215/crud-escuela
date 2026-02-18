import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

import { OBTENER_NOTAS } from '../../graphql/queries';
import { ELIMINAR_NOTA } from '../../graphql/mutations';
import type { Nota } from '../../types';

import Titulo from '../ui/Titulo';
import Tabla from '../ui/Tabla';
import Paginacion from '../ui/Paginacion';
import Busqueda from '../ui/Buscador';
import Button from '../ui/Boton';

const ITEMS_POR_PAGINA = 5;

const ListaNotas: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery<{ obtenerNotas: Nota[] }>(OBTENER_NOTAS);
  const [eliminarNota] = useMutation(ELIMINAR_NOTA);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando notas...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Función para parsear strings tipo "Alumno(id=3, nombre=Nestor, apellido=Atiro, ...)"
  const extraerNombreApellido = (str: string) => {
    const nombreMatch = str.match(/nombre=([^,]+)/);
    const apellidoMatch = str.match(/apellido=([^,]+)/);
    const nombre = nombreMatch ? nombreMatch[1] : '';
    const apellido = apellidoMatch ? apellidoMatch[1] : '';
    return `${nombre} ${apellido}`;
  };

  // Función para extraer solo el nombre del curso
  const extraerCurso = (str: string) => {
    const match = str.match(/curso=([^,]+)/);
    return match ? match[1] : str;
  };

  const handleEliminar = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar esta nota?')) return;
    await eliminarNota({ variables: { id } });
    refetch();
  };

  // Filtrado
  const notasFiltradas =
    data?.obtenerNotas.filter((n) =>
      `${extraerNombreApellido(n.alumno)} ${extraerNombreApellido(n.docente)} ${extraerCurso(n.curso)}`
        .toLowerCase()
        .includes(busqueda.toLowerCase())
    ) || [];

  const totalPaginas = Math.ceil(notasFiltradas.length / ITEMS_POR_PAGINA);

  const notasPaginadas = notasFiltradas.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div>
      <Titulo texto="Gestión de Notas" nivel={1} />

      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Button variant="primary" onClick={() => navigate('/notas/nuevo')}>
          <i className="bi bi-plus-circle" style={{ marginRight: '6px' }}></i>
          Nueva Nota
        </Button>
      </div>

      <Busqueda
        value={busqueda}
        onChange={(value) => {
          setBusqueda(value);
          setPaginaActual(1);
        }}
      />

      <Tabla headers={['Alumno', 'Curso', 'Docente', 'Parcial', 'Examen Final', 'Prácticas', 'Acciones']}>
        {notasPaginadas.map((nota) => (
          <tr key={nota.id}>
            <td>{extraerNombreApellido(nota.alumno)}</td>
            <td>{extraerCurso(nota.curso)}</td>
            <td>{extraerNombreApellido(nota.docente)}</td>
            <td>{nota.parcial}</td>
            <td>{nota.examenFinal}</td>
            <td>{nota.practicas}</td>
            <td>
              <Button variant="danger" size="sm" onClick={() => handleEliminar(nota.id)}>
                Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </Tabla>

      <Paginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        onPageChange={setPaginaActual}
      />
    </div>
  );
};

export default ListaNotas;
