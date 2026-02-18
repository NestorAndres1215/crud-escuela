import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client/react';

import { ACTUALIZAR_AULA } from '../../graphql/mutations';
import { OBTENER_AULAS_POR_ID } from '../../graphql/queries';

import Titulo from '../ui/Titulo';
import Button from '../ui/Boton';

interface AulaInput {
  aula: string;
  aforo: string; // 🔹 string, no number
}

const ActualizarAula: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [aula, setAula] = useState<AulaInput>({
    aula: '',
    aforo: '',
  });

  // Traer aula por ID
  const { data, loading, error } = useQuery(OBTENER_AULAS_POR_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  const [actualizarAula, { loading: updating }] = useMutation(ACTUALIZAR_AULA);

  useEffect(() => {
    if (data?.obtenerAulaPorId) {
      const { aula: nombreAula, aforo } = data.obtenerAulaPorId;
      setAula({ aula: nombreAula, aforo });
    }
  }, [data]);

  if (loading) return <p>Cargando aula...</p>;
  if (error) return <p>Error al cargar aula: {error.message}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAula({
      ...aula,
      [name]: value, // 🔹 todo como string
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await actualizarAula({
        variables: {
          id,
          aula, // 🔹 enviar objeto { aula: string, aforo: string }
        },
      });

      navigate('/aulas');
    } catch (err) {
      console.error('Error al actualizar aula:', err);
    }
  };

  const handleCancelar = () => navigate('/aulas');

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <Titulo texto="Actualizar Aula" nivel={2} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Aula</label>
            <input
              type="text"
              name="aula"
              value={aula.aula}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingrese nombre del aula"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Aforo</label>
            <input
              type="text" // 🔹 string, aunque sea numérico visualmente
              name="aforo"
              value={aula.aforo}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingrese aforo máximo"
              required
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button
              variant="secondary"
              type="button"
              onClick={handleCancelar}
              disabled={updating}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancelar
            </Button>

            <Button
              type="submit"
              variant="success"
              disabled={updating}
            >
              <i className="bi bi-check-circle-fill me-2"></i>
              {updating ? 'Actualizando...' : 'Actualizar Aula'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarAula;
