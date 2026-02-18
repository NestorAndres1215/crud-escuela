import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 🚀 para navegación
import type { Alumno } from '../../types';
import { CREAR_ALUMNO } from '../../graphql/mutations';
import { useMutation } from '@apollo/client/react';
import Titulo from '../ui/Titulo';

const FormularioAlumno: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Alumno, 'id'>>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  });

  const [crearAlumno, { loading }] = useMutation<
    { crearAlumno: Alumno },
    { alumno: Omit<Alumno, 'id'> }
  >(CREAR_ALUMNO);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando alumno:', form);

    try {
      await crearAlumno({ variables: { alumno: form } });

      setForm({
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
      });

      navigate('/alumnos');

    } catch (error) {
      console.error('Error creando alumno:', error);
    }
  };

  const handleCancelar = () => {
    navigate('/alumnos');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <Titulo texto="Registro de Alumnos" nivel={1} />


        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                placeholder="Ingrese nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                name="apellido"
                className="form-control"
                placeholder="Ingrese apellido"
                value={form.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="correo@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                name="telefono"
                className="form-control"
                placeholder="Ingrese teléfono"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              type="button"
              onClick={handleCancelar}
              className="btn btn-outline-secondary"
              disabled={loading}
            >
              <i className="bi bi-arrow-left-circle me-2"></i>
              Cancelar
            </button>

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              <i className="bi bi-check-circle-fill me-2"></i>
              {loading ? 'Creando...' : 'Crear Alumno'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioAlumno;
