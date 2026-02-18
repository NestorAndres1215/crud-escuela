import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';

import { OBTENER_ALUMNOS } from '../../graphql/queries';
import { ELIMINAR_ALUMNO } from '../../graphql/mutations';
import type { Alumno } from '../../types';

import Titulo from '../ui/Titulo';
import Tabla from '../ui/Tabla';
import Paginacion from '../ui/Paginacion';
import Busqueda from '../ui/Buscador';
import Button from '../ui/Boton';


const ITEMS_POR_PAGINA = 5;

const ListaAlumnos: React.FC = () => {
  const { loading, error, data, refetch } =
    useQuery<{ obtenerAlumnos: Alumno[] }>(OBTENER_ALUMNOS);

  const [eliminarAlumno] = useMutation(ELIMINAR_ALUMNO);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    await eliminarAlumno({ variables: { id } });
    refetch();
  };

  const alumnosFiltrados = data?.obtenerAlumnos.filter((a) =>
    `${a.nombre} ${a.apellido}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  ) || [];

  const totalPaginas = Math.ceil(alumnosFiltrados.length / ITEMS_POR_PAGINA);

  const alumnosPaginados = alumnosFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div>
      <Titulo texto="Gestión de Alumnos" nivel={1} />

      <Busqueda
        value={busqueda}
        onChange={(value) => {
          setBusqueda(value);
          setPaginaActual(1);
        }}
      />

      <Tabla headers={['Nombre', 'Apellido', 'Email', 'Teléfono', 'Acciones']}>
        {alumnosPaginados.map((alumno) => (
          <tr key={alumno.id}>
            <td style={{ padding: '10px' }}>{alumno.nombre}</td>
            <td style={{ padding: '10px' }}>{alumno.apellido}</td>
            <td style={{ padding: '10px' }}>{alumno.email}</td>
            <td style={{ padding: '10px' }}>{alumno.telefono}</td>
            <td style={{ padding: '10px' }}>
           <Button
  variant="danger"
  size="sm"
  onClick={() => handleEliminar(alumno.id)}
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

export default ListaAlumnos;
