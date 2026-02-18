export interface Alumno {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export interface Docente {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export interface Aula {
  id: string;
  aula: string;
  aforo: string;
}

export interface Curso {
  id: string;
  curso: string;
}

export interface Nota {
  id: string;
  alumno: string;
  curso: string;
  docente: string;
  nota: number;
}
