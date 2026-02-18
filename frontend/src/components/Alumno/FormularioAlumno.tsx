import React, { useState } from 'react';
import type { Alumno } from '../../types';
import { CREAR_ALUMNO } from '../../graphql/mutations';
import { useMutation } from '@apollo/client/react';

const FormularioAlumno: React.FC = () => {
  const [form, setForm] = useState<Omit<Alumno, 'id'>>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  });

  const [crearAlumno] = useMutation<
    { crearAlumno: Alumno },
    { alumno: Omit<Alumno, 'id'> }
  >(CREAR_ALUMNO);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await crearAlumno({ variables: { alumno: form } });
      console.log('Alumno creado:', data?.crearAlumno);
      setForm({ nombre: '', apellido: '', email: '', telefono: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} />
      <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
      <button type="submit">Crear Alumno</button>
    </form>
  );
};

export default FormularioAlumno;
