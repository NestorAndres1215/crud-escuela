import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client/react';

import { CREAR_DOCENTE } from '../../graphql/mutations';
import type { Docente } from '../../types';

import Titulo from '../ui/Titulo';
import Button from '../ui/Boton';

const FormularioDocente: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<Omit<Docente, 'id'>>({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
  });

  const [crearDocente, { loading }] = useMutation<
    { crearDocente: Docente },
    { docente: Omit<Docente, 'id'> }
  >(CREAR_DOCENTE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await crearDocente({ variables: { docente: form } });
      setForm({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
      });
      navigate('/docentes');
    } catch (err) {
      console.error('Error creando alumno:', err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <Titulo texto="Registrar Docente" nivel={2} />

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
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
              value={form.apellido}
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
              value={form.correo}
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
              value={form.telefono}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/docentes')}
              disabled={loading}
            >
              Cancelar
            </Button>

            <Button type="submit" variant="success" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Docente'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioDocente;
