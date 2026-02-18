
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Curso } from '../../types';

import { useMutation } from '@apollo/client/react';
import Titulo from '../ui/Titulo';
import { CREAR_CURSOS } from '../../graphql/mutations';

const FormularioCurso: React.FC = () => {
  const navigate = useNavigate();

  // Estado inicial
  const [form, setForm] = useState<Omit<Curso, 'id'>>({
    curso: '',
    credito: '',
  });

  const [crearCurso, { loading }] = useMutation<
    { crearCurso: Curso },
    { curso: Omit<Curso, 'id'> }
  >(CREAR_CURSOS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Enviando curso:', form);

    try {
      await crearCurso({ variables: { curso: form } });

      // Limpiar formulario
      setForm({
        curso: '',
        credito: '',
      });

      navigate('/cursos');
    } catch (error) {
      console.error('Error creando curso:', error);
    }
  };

  const handleCancelar = () => {
    navigate('/cursos');
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <Titulo texto="Registro de Cursos" nivel={1} />

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Curso</label>
              <input
                type="text"
                name="curso"
                className="form-control"
                placeholder="Ingrese nombre del curso"
                value={form.curso}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Crédito</label>
              <input
                type="text"
                name="credito"
                className="form-control"
                placeholder="Ingrese número de créditos"
                value={form.credito}
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
              {loading ? 'Creando...' : 'Crear Curso'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCurso;
