import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useNavigate } from 'react-router-dom';

import { OBTENER_ALUMNOS, OBTENER_CURSOS, OBTENER_DOCENTES, OBTENER_AULAS } from '../../graphql/queries';
import { CREAR_NOTAS } from '../../graphql/mutations';

import type { Nota, Alumno, Curso, Docente, Aula } from '../../types';
import Titulo from '../ui/Titulo';
import Button from '../ui/Boton';

interface NotaForm {
  alumno: string;
  curso: string;
  docente: string;
  aula: string;
  parcial: number;
  practicas: number;
}

const FormularioNota: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<NotaForm>({
    alumno: '',
    curso: '',
    docente: '',
    aula: '',
    parcial: 0,
    practicas: 0,
  });

  // Queries para cargar los selects
  const { data: dataAlumnos, loading: loadingAlumnos } = useQuery<{ obtenerAlumnos: Alumno[] }>(OBTENER_ALUMNOS);
  const { data: dataCursos, loading: loadingCursos } = useQuery<{ obtenerCurso: Curso[] }>(OBTENER_CURSOS);
  const { data: dataDocentes, loading: loadingDocentes } = useQuery<{ obtenerDocentes: Docente[] }>(OBTENER_DOCENTES);
  const { data: dataAulas, loading: loadingAulas } = useQuery<{ obtenerAula: Aula[] }>(OBTENER_AULAS);

  const [crearNota, { loading: loadingCrear }] = useMutation<{ crearNota: Nota }, { nota: NotaForm }>(CREAR_NOTAS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: ['parcial', 'practicas'].includes(name) ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
console.log(form)
    try {
      await crearNota({ variables: { nota: form } });

      setForm({
        alumno: '',
        curso: '',
        docente: '',
        aula: '',
        parcial: 0,
        practicas: 0,
      });

      navigate('/notas');
    } catch (error) {
      console.error('Error creando nota:', error);
    }
  };

  const handleCancelar = () => navigate('/notas');

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <Titulo texto="Registro de Nota" nivel={1} />

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Alumno */}
            <div className="col-md-3 mb-3">
              <label className="form-label">Alumno</label>
              <select
                name="alumno"
                value={form.alumno}
                onChange={handleChange}
                className="form-select"
                required
                disabled={loadingAlumnos}
              >
                <option value="">{loadingAlumnos ? 'Cargando alumnos...' : 'Seleccione un alumno'}</option>
                {(dataAlumnos?.obtenerAlumnos || []).map(a => (
                  <option key={a.id} value={`${a.nombre}`}>
                    {a.nombre} {a.apellido}
                  </option>
                ))}
              </select>
            </div>

            {/* Curso */}
            <div className="col-md-3 mb-3">
              <label className="form-label">Curso</label>
              <select
                name="curso"
                value={form.curso}
                onChange={handleChange}
                className="form-select"
                required
                disabled={loadingCursos}
              >
                <option value="">{loadingCursos ? 'Cargando cursos...' : 'Seleccione un curso'}</option>
                {(dataCursos?.obtenerCurso || []).map(c => (
                  <option key={c.id} value={c.curso}>
                    {c.curso}
                  </option>
                ))}
              </select>
            </div>

            {/* Docente */}
            <div className="col-md-3 mb-3">
              <label className="form-label">Docente</label>
              <select
                name="docente"
                value={form.docente}
                onChange={handleChange}
                className="form-select"
                required
                disabled={loadingDocentes}
              >
                <option value="">{loadingDocentes ? 'Cargando docentes...' : 'Seleccione un docente'}</option>
                {(dataDocentes?.obtenerDocentes || []).map(d => (
                  <option key={d.id} value={`${d.nombre}`}>
                    {d.nombre} {d.apellido}
                  </option>
                ))}
              </select>
            </div>

            {/* Aula */}
            <div className="col-md-3 mb-3">
              <label className="form-label">Aula</label>
              <select
                name="aula"
                value={form.aula}
                onChange={handleChange}
                className="form-select"
                required
                disabled={loadingAulas}
              >
                <option value="">{loadingAulas ? 'Cargando aulas...' : 'Seleccione un aula'}</option>
                {(dataAulas?.obtenerAula || []).map(a => (
                  <option key={a.id} value={a.aula}>
                    {a.aula}
                  </option>
                ))}
              </select>
            </div>

            {/* Parcial */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Parcial</label>
              <input
                type="number"
                name="parcial"
                value={form.parcial}
                onChange={handleChange}
                className="form-control"
                min={0}
                max={20}
                required
              />
            </div>

            {/* Prácticas */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Prácticas</label>
              <input
                type="number"
                name="practicas"
                value={form.practicas}
                onChange={handleChange}
                className="form-control"
                min={0}
                max={20}
                required
              />
            </div>
          </div>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" type="button" onClick={handleCancelar} disabled={loadingCrear}>
              Cancelar
            </Button>
            <Button variant="success" type="submit" disabled={loadingCrear}>
              {loadingCrear ? 'Creando...' : 'Crear Nota'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioNota;
