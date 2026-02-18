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

export const CREAR_DOCENTE = gql`
  mutation CrearDocente($docente: DocenteInput!) {
    crearDocente(docente: $docente) {
      id
      nombre
      apellido
      correo
      telefono
    }
  }
`;

export const CREAR_AULA = gql`
  mutation CrearAula($aula: AulaInput!) {
    crearAula(aula: $aula) {
      id
      aula
      aforo
    }
  }
`;
export const CREAR_CURSOS = gql`
  mutation CrearCurso($curso: CursoInput!) {
    crearCurso(curso: $curso) {
      id
      curso
      credito
    }
  }
`;
export const CREAR_NOTAS = gql`
  mutation CrearNota($nota: NotaInput!) {
    crearNota(nota: $nota) {
    practicas
    parcial
    id
    examenFinal
    aula
    alumno
    curso
    docente
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
export const ACTUALIZAR_DOCENTE = gql`
  mutation ActualizarDocente($id: ID!, $docente: DocenteInput!) {
    actualizarDocente(id: $id, docente: $docente) {
      id
      nombre
      apellido
      correo
      telefono
    }
  }
`;

export const ACTUALIZAR_AULA = gql`
  mutation ActualizarAula($id: ID!, $aula: AulaInput!) {
    actualizarAula(id: $id, aula: $aula) {
      id
      aula
      aforo
    }
  }
`;
export const ACTUALIZAR_CURSOS = gql`
  mutation ActualizarCurso($id: ID!, $curso: CursoInput!) {
    actualizarCurso(id: $id, curso: $curso) {
      id
      curso
      credito
    }
  }
`;

export const ELIMINAR_ALUMNO = gql`
  mutation EliminarAlumno($id: ID!) {
    eliminarAlumno(id: $id)
  }
`;


export const ELIMINAR_DOCENTE = gql`
  mutation EliminarDocente($id: ID!) {
    eliminarDocente(id: $id)
  }
`;
export const ELIMINAR_AULA = gql`
  mutation EliminarAula($id: ID!) {
    eliminarAula(id: $id)
  }
`;
export const ELIMINAR_NOTA = gql`
  mutation EliminarNota($id: ID!) {
    eliminarNota(id: $id)
  }
`;
export const ELIMINAR_CURSO = gql`
  mutation EliminarCurso($id: ID!) {
    eliminarCurso(id: $id)
  }
`;