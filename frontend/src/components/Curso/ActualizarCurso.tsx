import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client/react';



import Titulo from '../ui/Titulo';
import Button from '../ui/Boton';
import { ACTUALIZAR_CURSOS } from '../../graphql/mutations';
import { OBTENER_CURSOS_POR_ID } from '../../graphql/queries';

interface CursoInput {
  curso: string;
  credito: string; // 🔹 mantener como string
}

const ActualizarCurso: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [curso, setCurso] = useState<CursoInput>({
    curso: '',
    credito: '',
  });

  // Traer curso por ID
  const { data, loading, error } = useQuery(OBTENER_CURSOS_POR_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only',
  });

  const [actualizarCurso, { loading: updating }] = useMutation(ACTUALIZAR_CURSOS);

  useEffect(() => {
    if (data?.obtenerCursoPorId) {
      const { curso: nombreCurso, credito } = data.obtenerCursoPorId;
      setCurso({ curso: nombreCurso, credito });
    }
  }, [data]);

  if (loading) return <p>Cargando curso...</p>;
  if (error) return <p>Error al cargar curso: {error.message}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurso({
      ...curso,
      [name]: value, // 🔹 todo como string
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await actualizarCurso({
        variables: {
          id,
          curso, // 🔹 objeto { curso: string, credito: string }
        },
      });

      navigate('/cursos');
    } catch (err) {
      console.error('Error al actualizar curso:', err);
    }
  };

  const handleCancelar = () => navigate('/cursos');

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <Titulo texto="Actualizar Curso" nivel={2} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre del Curso</label>
            <input
              type="text"
              name="curso"
              value={curso.curso}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingrese nombre del curso"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Crédito</label>
            <input
              type="text"
              name="credito"
              value={curso.credito}
              onChange={handleChange}
              className="form-control"
              placeholder="Ingrese número de créditos"
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
              {updating ? 'Actualizando...' : 'Actualizar Curso'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarCurso;
