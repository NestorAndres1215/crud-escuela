import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

import { OBTENER_DOCENTES } from '../../graphql/queries';

import type { Docente } from '../../types';

import Titulo from '../ui/Titulo';
import Tabla from '../ui/Tabla';
import Paginacion from '../ui/Paginacion';
import Busqueda from '../ui/Buscador';
import Button from '../ui/Boton';
import { ELIMINAR_DOCENTE } from '../../graphql/mutations';

const ITEMS_POR_PAGINA = 5;

const ListaDocentes: React.FC = () => {
  const { loading, error, data, refetch } =
    useQuery<{ obtenerDocentes: Docente[] }>(OBTENER_DOCENTES);

  const [eliminarDocente] = useMutation(ELIMINAR_DOCENTE);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    await eliminarDocente({ variables: { id } });
    refetch();
  };

  const docentesFiltrados = data?.obtenerDocentes.filter((d) =>
    `${d.nombre} ${d.apellido}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  ) || [];

  const totalPaginas = Math.ceil(docentesFiltrados.length / ITEMS_POR_PAGINA);

  const docentesPaginados = docentesFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div>
      <Titulo texto="Gestión de Docentes" nivel={1} />

      <Busqueda
        value={busqueda}
        onChange={(value) => {
          setBusqueda(value);
          setPaginaActual(1);
        }}
      />

      <Tabla headers={['Nombre', 'Apellido', 'Correo', 'Teléfono', 'Acciones']}>
        {docentesPaginados.map((docente) => (
          <tr key={docente.id}>
            <td>{docente.nombre}</td>
            <td>{docente.apellido}</td>
            <td>{docente.correo}</td>
            <td>{docente.telefono}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleEliminar(docente.id)}
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

export default ListaDocentes;
