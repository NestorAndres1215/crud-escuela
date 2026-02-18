import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

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
  const { loading, error, data, refetch } =
    useQuery<{ obtenerNotas: Nota[] }>(OBTENER_NOTAS);

  const [eliminarNota] = useMutation(ELIMINAR_NOTA);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    await eliminarNota({ variables: { id } });
    refetch();
  };

  const notasFiltradas = data?.obtenerNotas.filter((n) =>
    n.alumno.toLowerCase().includes(busqueda.toLowerCase())
  ) || [];

  const totalPaginas = Math.ceil(notasFiltradas.length / ITEMS_POR_PAGINA);

  const notasPaginadas = notasFiltradas.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div>
      <Titulo texto="Gestión de Notas" nivel={1} />

      <Busqueda
        value={busqueda}
        onChange={(value) => {
          setBusqueda(value);
          setPaginaActual(1);
        }}
      />

      <Tabla headers={['Alumno', 'Curso', 'Docente', 'Nota', 'Acciones']}>
        {notasPaginadas.map((nota) => (
          <tr key={nota.id}>
            <td>{nota.alumno}</td>
            <td>{nota.curso}</td>
            <td>{nota.docente}</td>
            <td>{nota.nota}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleEliminar(nota.id)}
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

export default ListaNotas;
