import { gql } from '@apollo/client';

export const OBTENER_ALUMNOS = gql`
  query ObtenerAlumnos {
    obtenerAlumnos {
      id
      nombre
      apellido
      email
      telefono
    }
  }
`;

export const OBTENER_ALUMNO_POR_ID = gql`
  query ObtenerAlumnoPorId($id: ID!) {
    obtenerAlumnoPorId(id: $id) {
      id
      nombre
      apellido
      email
      telefono
    }
  }
`;

export const OBTENER_DOCENTE_POR_ID = gql`
  query obtenerDocentePorId($id: ID!) {
    obtenerDocentePorId(id: $id) {
      id
      nombre
      apellido
      correo
      telefono
    }
  }
`;

export const OBTENER_DOCENTES = gql`
  query ObtenerDocentes {
    obtenerDocentes {
      id
      nombre
      apellido
      correo
      telefono
    }
  }
`;

export const OBTENER_AULAS = gql`
  query ObtenerAula {
    obtenerAula {
      id
      aula
      aforo
    }
  }
`;

export const OBTENER_AULAS_POR_ID = gql`
  query obtenerAulaPorId($id: ID!) {
    obtenerAulaPorId(id: $id) {
      id
      aula
      aforo
    }
  }
`;


export const OBTENER_CURSOS = gql`
  query ObtenerCurso {
    obtenerCurso {
      id
      curso
      credito
    }
  }
`;

export const OBTENER_CURSOS_POR_ID = gql`
  query ObtenerCursoPorId($id: ID!) {
    obtenerCursoPorId(id: $id) {
  id
      curso
      credito
    }
  }
`;



export const OBTENER_NOTAS = gql`
  query ObtenerNotas {
      obtenerNotas {
    practicas
    parcial
    id
    examenFinal
    docente
    curso
    aula
    alumno
  }
  }
`;
