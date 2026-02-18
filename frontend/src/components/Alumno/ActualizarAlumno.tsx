import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client/react';

import { OBTENER_ALUMNO_POR_ID } from '../../graphql/queries';
import { ACTUALIZAR_ALUMNO } from '../../graphql/mutations';

import Titulo from '../ui/Titulo';
import Button from '../ui/Boton';

interface AlumnoInput {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

const ActualizarAlumno: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [alumno, setAlumno] = useState<AlumnoInput>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  });

  const { data, loading, error } = useQuery(OBTENER_ALUMNO_POR_ID, {
    variables: { id },
    skip: !id,
    fetchPolicy: 'network-only', 
  });

  const [actualizarAlumno, { loading: updating }] = useMutation(ACTUALIZAR_ALUMNO);

 
  useEffect(() => {
    if (data?.obtenerAlumnoPorId) {
      const { nombre, apellido, email, telefono } = data.obtenerAlumnoPorId;
      setAlumno({ nombre, apellido, email, telefono });
    }
  }, [data]);

  if (loading) return <p>Cargando alumno...</p>;
  if (error) return <p>Error al cargar alumno: {error.message}</p>;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlumno({ ...alumno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await actualizarAlumno({
        variables: { id, alumno }, 
      });

      navigate('/alumnos'); 

    } catch (err) {
      console.error('Error al actualizar alumno:', err);
    }
  };

  const handleCancelar = () => navigate('/alumnos');

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <Titulo texto="Actualizar Alumno" nivel={2} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={alumno.nombre}
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
              value={alumno.apellido}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={alumno.email}
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
              value={alumno.telefono}
              onChange={handleChange}
              className="form-control"
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
              {updating ? 'Actualizando...' : 'Actualizar Alumno'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarAlumno;
