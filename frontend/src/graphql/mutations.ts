import { gql } from '@apollo/client';

export const CREAR_ALUMNO = gql`
  mutation CrearAlumno($alumno: AlumnoInput!) {
    crearAlumno(alumno: $alumno) {
      id
      nombre
      apellido
      email
      telefono
    }
  }
`;

export const ACTUALIZAR_ALUMNO = gql`
  mutation ActualizarAlumno($id: ID!, $alumno: AlumnoInput!) {
    actualizarAlumno(id: $id, alumno: $alumno) {
      id
      nombre
      apellido
      email
      telefono
    }
  }
`;

export const ELIMINAR_ALUMNO = gql`
  mutation EliminarAlumno($id: ID!) {
    eliminarAlumno(id: $id)
  }
`;
