import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const { loading, error, data, refetch } =
    useQuery<{ obtenerAula: Aula[] }>(OBTENER_AULAS);

  const [eliminarAula] = useMutation(ELIMINAR_AULA);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar esta aula?')) return;
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

      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Button variant="primary" onClick={() => navigate('/aulas/nuevo')}>
          <i className="bi bi-building" style={{ marginRight: '6px' }}></i>
          Registrar Aula
        </Button>
      </div>

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
            <td style={{ padding: '10px' }}>{aula.aula}</td>
            <td style={{ padding: '10px' }}>{aula.aforo}</td>
            <td style={{ padding: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Button
                  variant="warning"
                  onClick={() => navigate(`/aulas/editar/${aula.id}`)}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Editar
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(aula.id)}
                >
                  <i className="bi bi-trash" style={{ marginRight: '5px' }}></i>
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

export default ListaAulas;
