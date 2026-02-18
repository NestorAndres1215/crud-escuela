import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client/react';

import { OBTENER_DOCENTE_POR_ID } from '../../graphql/queries';
import { ACTUALIZAR_DOCENTE } from '../../graphql/mutations';


import Titulo from '../ui/Titulo';
import Button from '../ui/Boton';

interface DocenteInput {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

const ActualizarDocente: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [docente, setDocente] = useState<DocenteInput>({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
  });

  const { data, loading, error } = useQuery(OBTENER_DOCENTE_POR_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  const [actualizarDocente, { loading: updating }] = useMutation(ACTUALIZAR_DOCENTE);

  useEffect(() => {
    if (data?.obtenerDocentePorId) {
      const { nombre, apellido, correo, telefono } = data.obtenerDocentePorId;
      setDocente({ nombre, apellido, correo, telefono });
    }
  }, [data]);

  if (loading) return <p>Cargando docente...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocente({ ...docente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await actualizarDocente({
        variables: { id, docente }, // ⚡ variable correcta
      });

      navigate('/docentes');
    } catch (err) {
      console.error('Error al actualizar docente:', err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <Titulo texto="Actualizar Docente" nivel={2} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={docente.nombre}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              name="apellido"
              value={docente.apellido}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              name="correo"
              value={docente.correo}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={docente.telefono}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/docentes')}
              disabled={updating}
            >
              Cancelar
            </Button>

            <Button type="submit" variant="success" disabled={updating}>
              {updating ? 'Actualizando...' : 'Actualizar Docente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarDocente;
