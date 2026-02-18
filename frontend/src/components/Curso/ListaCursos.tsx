import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

import { OBTENER_CURSOS } from '../../graphql/queries';
import { ELIMINAR_CURSO } from '../../graphql/mutations';
import type { Curso } from '../../types';

import Titulo from '../ui/Titulo';
import Tabla from '../ui/Tabla';
import Paginacion from '../ui/Paginacion';
import Busqueda from '../ui/Buscador';
import Button from '../ui/Boton';

const ITEMS_POR_PAGINA = 5;

const ListaCursos: React.FC = () => {
  const navigate = useNavigate();

  const { loading, error, data, refetch } =
    useQuery<{ obtenerCurso: Curso[] }>(OBTENER_CURSOS);

  const [eliminarCurso] = useMutation(ELIMINAR_CURSO);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este curso?')) return;

    await eliminarCurso({ variables: { id } });
    refetch();
  };

  const cursosFiltrados =
    data?.obtenerCurso.filter(
      (c) =>
        c.curso.toLowerCase().includes(busqueda.toLowerCase()) ||
        c.credito.toString().includes(busqueda)
    ) || [];

  const totalPaginas = Math.ceil(cursosFiltrados.length / ITEMS_POR_PAGINA);

  const cursosPaginados = cursosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div>
      <Titulo texto="Gestión de Cursos" nivel={1} />

      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Button variant="primary" onClick={() => navigate('/cursos/nuevo')}>
          <i className="bi bi-plus-circle me-2"></i>
          Registrar Curso
        </Button>
      </div>

      <Busqueda
        value={busqueda}
        onChange={(value) => {
          setBusqueda(value);
          setPaginaActual(1);
        }}
      />

      <Tabla headers={['Curso', 'Crédito', 'Acciones']}>
        {cursosPaginados.map((curso) => (
          <tr key={curso.id}>
            <td style={{ padding: '10px' }}>{curso.curso}</td>
            <td style={{ padding: '10px' }}>{curso.credito}</td>
            <td style={{ padding: '10px' }}>
              <div
                style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}
              >
                <Button
                  variant="warning"
                  onClick={() => navigate(`/cursos/editar/${curso.id}`)}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Editar
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(curso.id)}
                >
                  <i className="bi bi-trash me-2"></i>
                  Eliminar
                </Button>
              </div>
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

export default ListaCursos;
