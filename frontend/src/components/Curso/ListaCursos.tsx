import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

import { OBTENER_CURSOS } from '../../graphql/queries';

import type { Curso } from '../../types';

import Titulo from '../ui/Titulo';
import Tabla from '../ui/Tabla';
import Paginacion from '../ui/Paginacion';
import Busqueda from '../ui/Buscador';
import Button from '../ui/Boton';
import { ELIMINAR_CURSO } from '../../graphql/mutations';

const ITEMS_POR_PAGINA = 5;

const ListaCursos: React.FC = () => {
  const { loading, error, data, refetch } =
    useQuery<{ obtenerCurso: Curso[] }>(OBTENER_CURSOS);

  const [eliminarCurso] = useMutation(ELIMINAR_CURSO);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    await eliminarCurso({ variables: { id } });
    refetch();
  };

  const cursosFiltrados = data?.obtenerCurso.filter((c) =>
    c.curso.toLowerCase().includes(busqueda.toLowerCase())
  ) || [];

  const totalPaginas = Math.ceil(cursosFiltrados.length / ITEMS_POR_PAGINA);

  const cursosPaginados = cursosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div>
      <Titulo texto="Gestión de Cursos" nivel={1} />

      <Busqueda
        value={busqueda}
        onChange={(value) => {
          setBusqueda(value);
          setPaginaActual(1);
        }}
      />

      <Tabla headers={['Curso', 'Acciones']}>
        {cursosPaginados.map((curso) => (
          <tr key={curso.id}>
            <td>{curso.curso}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleEliminar(curso.id)}
              >
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

export default ListaCursos;
