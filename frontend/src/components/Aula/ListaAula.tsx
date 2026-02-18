import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

import { OBTENER_AULAS } from '../../graphql/queries';
import { ELIMINAR_AULA } from '../../graphql/mutations';
import type { Aula } from '../../types';

import Titulo from '../ui/Titulo';
import Tabla from '../ui/Tabla';
import Paginacion from '../ui/Paginacion';
import Busqueda from '../ui/Buscador';
import Button from '../ui/Boton';

const ITEMS_POR_PAGINA = 5;

const ListaAulas: React.FC = () => {
  const { loading, error, data, refetch } =
    useQuery<{ obtenerAula: Aula[] }>(OBTENER_AULAS);

  const [eliminarAula] = useMutation(ELIMINAR_AULA);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    await eliminarAula({ variables: { id } });
    refetch();
  };

  const aulasFiltradas = data?.obtenerAula.filter((a) =>
    a.aula.toLowerCase().includes(busqueda.toLowerCase())
  ) || [];

  const totalPaginas = Math.ceil(aulasFiltradas.length / ITEMS_POR_PAGINA);

  const aulasPaginadas = aulasFiltradas.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div>
      <Titulo texto="Gestión de Aulas" nivel={1} />

      <Busqueda
        value={busqueda}
        onChange={(value) => {
          setBusqueda(value);
          setPaginaActual(1);
        }}
      />

      <Tabla headers={['Aula', 'Aforo', 'Acciones']}>
        {aulasPaginadas.map((aula) => (
          <tr key={aula.id}>
            <td>{aula.aula}</td>
            <td>{aula.aforo}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleEliminar(aula.id)}
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

export default ListaAulas;
