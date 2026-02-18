import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

import { OBTENER_DOCENTES } from '../../graphql/queries';
import { ELIMINAR_DOCENTE } from '../../graphql/mutations';

import type { Docente } from '../../types';

import Titulo from '../ui/Titulo';
import Tabla from '../ui/Tabla';
import Paginacion from '../ui/Paginacion';
import Busqueda from '../ui/Buscador';
import Button from '../ui/Boton';

const ITEMS_POR_PAGINA = 5;

const ListaDocentes: React.FC = () => {
  const navigate = useNavigate();

  const { loading, error, data, refetch } =
    useQuery<{ obtenerDocentes: Docente[] }>(OBTENER_DOCENTES);

  const [eliminarDocente] = useMutation(ELIMINAR_DOCENTE);
  const [paginaActual, setPaginaActual] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleEliminar = async (id: string) => {
    if (!window.confirm('¿Estás seguro de eliminar este docente?')) return;
    await eliminarDocente({ variables: { id } });
    refetch();
  };

  const docentesFiltrados =
    data?.obtenerDocentes.filter((d) =>
      `${d.nombre} ${d.apellido}`.toLowerCase().includes(busqueda.toLowerCase())
    ) || [];

  const totalPaginas = Math.ceil(docentesFiltrados.length / ITEMS_POR_PAGINA);

  const docentesPaginados = docentesFiltrados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  return (
    <div>
      <Titulo texto="Gestión de Docentes" nivel={1} />

      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Button variant="primary" onClick={() => navigate('/docentes/nuevo')}>
          <i className="bi bi-person-plus" style={{ marginRight: '6px' }}></i>
          Nuevo Docente
        </Button>
      </div>

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
            <td style={{ padding: '10px' }}>{docente.nombre}</td>
            <td style={{ padding: '10px' }}>{docente.apellido}</td>
            <td style={{ padding: '10px' }}>{docente.correo}</td>
            <td style={{ padding: '10px' }}>{docente.telefono}</td>
            <td style={{ padding: '10px' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => navigate(`/docentes/editar/${docente.id}`)}
                >
                  <i className="bi bi-pencil-square me-2"></i>
                  Editar
                </Button>

                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleEliminar(docente.id)}
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

export default ListaDocentes;
