import React from 'react';

import { OBTENER_ALUMNOS } from '../../graphql/queries';
import { ELIMINAR_ALUMNO } from '../../graphql/mutations';
import type { Alumno } from '../../types';
import { useMutation, useQuery } from '@apollo/client/react';

const ListaAlumnos: React.FC = () => {
  const { loading, error, data, refetch } = useQuery<{ obtenerAlumnos: Alumno[] }>(OBTENER_ALUMNOS);
  const [eliminarAlumno] = useMutation(ELIMINAR_ALUMNO);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    await eliminarAlumno({ variables: { id } });
    refetch();
  };

  return (
    <div>
      <h2>Alumnos</h2>
      <ul>
        {data?.obtenerAlumnos.map((alumno) => (
          <li key={alumno.id}>
            {alumno.nombre} {alumno.apellido} - {alumno.email} - {alumno.telefono}
            <button onClick={() => handleEliminar(alumno.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaAlumnos;
