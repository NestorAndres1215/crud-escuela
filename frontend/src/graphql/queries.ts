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

export const OBTENER_CURSOS = gql`
  query ObtenerCurso {
    obtenerCurso {
      id
      curso
    }
  }
`;

export const OBTENER_NOTAS = gql`
  query ObtenerNotas {
    obtenerNotas {
      id
      alumno
      curso
      docente
      nota
    }
  }
`;
